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
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string, phone: string, role: "customer" | "delivery") => { success: boolean; message: string };
  logout: () => void;
  registeredUsers: RegisteredUser[];
}

export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  joinDate: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default accounts for demo — includes all three roles
const defaultAccounts: RegisteredUser[] = [
  {
    name: "Admin User",
    email: "admin@saveurco.com",
    password: "admin123",
    phone: "1-800-SAVEUR",
    role: "admin",
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

const avatarMap: Record<UserRole, string> = {
  customer: "🛍️",
  delivery: "🚴",
  admin: "👑",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(defaultAccounts);

  // Auto-detect role from credentials — no role parameter needed
  const login = (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, message: "Please enter your email and password" };
    }

    // Search all registered accounts (includes admin, customer, delivery)
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
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

    return { success: false, message: "Invalid email or password" };
  };

  const signup = (
    name: string,
    email: string,
    password: string,
    phone: string,
    role: "customer" | "delivery"
  ) => {
    const exists = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
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
