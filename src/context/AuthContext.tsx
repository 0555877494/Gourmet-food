import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "delivery" | "admin";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  joinDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string, phone: string, role: "customer" | "delivery") => { success: boolean; message: string };
  logout: () => void;
  registeredUsers: RegisteredUser[];
}

export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "delivery";
  joinDate: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default accounts for demo
const defaultAccounts: RegisteredUser[] = [
  {
    name: "Admin User",
    email: "admin@saveurco.com",
    password: "admin123",
    phone: "1-800-SAVEUR",
    role: "delivery", // placeholder, admin handled separately
    joinDate: "2024-01-01",
  },
  {
    name: "Eleanor Whitfield",
    email: "customer@saveurco.com",
    password: "customer123",
    phone: "+1-555-0101",
    role: "customer",
    joinDate: "2025-03-12",
  },
  {
    name: "Marco Delivery",
    email: "delivery@saveurco.com",
    password: "delivery123",
    phone: "+1-555-0202",
    role: "delivery",
    joinDate: "2025-06-15",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(defaultAccounts);

  const login = (email: string, password: string, role: UserRole) => {
    // Admin login
    if (role === "admin") {
      if (email === "admin@saveurco.com" && password === "admin123") {
        setUser({
          id: 0,
          name: "Admin User",
          email: "admin@saveurco.com",
          role: "admin",
          avatar: "👑",
          joinDate: "2024-01-01",
        });
        return { success: true, message: "Welcome back, Admin!" };
      }
      // Also accept any credentials for admin demo
      if (email && password) {
        setUser({
          id: 0,
          name: email.split("@")[0].replace(/\b\w/g, (l) => l.toUpperCase()),
          email,
          role: "admin",
          avatar: "👑",
          joinDate: new Date().toISOString().split("T")[0],
        });
        return { success: true, message: "Welcome, Admin!" };
      }
      return { success: false, message: "Invalid admin credentials" };
    }

    // Customer / Delivery login
    const found = registeredUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (found) {
      const avatarMap: Record<string, string> = {
        customer: "🛍️",
        delivery: "🚴",
      };
      setUser({
        id: registeredUsers.indexOf(found) + 1,
        name: found.name,
        email: found.email,
        role: found.role,
        phone: found.phone,
        avatar: avatarMap[found.role],
        joinDate: found.joinDate,
      });
      return { success: true, message: `Welcome back, ${found.name}!` };
    }

    return { success: false, message: "Invalid email, password, or role selection" };
  };

  const signup = (
    name: string,
    email: string,
    password: string,
    phone: string,
    role: "customer" | "delivery"
  ) => {
    const exists = registeredUsers.find((u) => u.email === email);
    if (exists) {
      return { success: false, message: "An account with this email already exists" };
    }

    const newUser: RegisteredUser = {
      name,
      email,
      password,
      phone,
      role,
      joinDate: new Date().toISOString().split("T")[0],
    };

    setRegisteredUsers((prev) => [...prev, newUser]);

    const avatarMap: Record<string, string> = {
      customer: "🛍️",
      delivery: "🚴",
    };

    setUser({
      id: registeredUsers.length + 1,
      name,
      email,
      role,
      phone,
      avatar: avatarMap[role],
      joinDate: newUser.joinDate,
    });

    return { success: true, message: `Account created! Welcome, ${name}!` };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        registeredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
