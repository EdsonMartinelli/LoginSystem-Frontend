import { createContext, ReactNode, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import jwt_decode from "jwt-decode";

interface User {
  id: string;
  username: string;
  email: string;
}

interface loginProps {
  email: string;
  password: string;
}

export interface authContextProps {
  user?: User;
  userLogin: (login: loginProps) => Promise<void>;
  userLogout: () => void;
  userValidate: () => Promise<void>;
}

const initialValue = {};
const defaultValue = initialValue as authContextProps;
export const AuthContext = createContext<authContextProps>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const axiosInstance = useAxios();

  async function userLogin({ email, password }: loginProps) {
    const response = await axiosInstance.user.login({ email, password });

    if (response.status >= 400)
      throw new Error("Email or password is incorrect.");

    localStorage.setItem("token_login_system", response.data.token);
    const decoded = jwt_decode(response.data.token);
    const userDecode = decoded as User;
    setUser({
      id: userDecode.id,
      username: userDecode.username,
      email: userDecode.email,
    });
  }

  function userLogout() {
    localStorage.removeItem("token_login_system");
    setUser(undefined);
  }

  async function userValidate() {
    const token = localStorage.getItem("token_login_system");

    if (token == null) {
      userLogout();
      throw new Error("There is no token!");
    }

    const response = await axiosInstance.user.revalidateToken();

    if (response.status >= 400) {
      userLogout();
      throw new Error("Token is expired or invalid!");
    }

    localStorage.setItem("token_login_system", response.data.token);
    const decoded = jwt_decode(response.data.token);
    const userDecode = decoded as User;
    setUser({
      id: userDecode.id,
      username: userDecode.username,
      email: userDecode.email,
    });
  }

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout, userValidate }}>
      {children}
    </AuthContext.Provider>
  );
}
