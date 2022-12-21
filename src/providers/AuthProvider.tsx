import { createContext, ReactNode, useState } from "react";
import jwt_decode from "jwt-decode";
import { IUserHttpClient } from "../interfaces/http/IUserHttpClient";

interface User {
  id: string;
  username: string;
  email: string;
}

interface loginProps {
  email: string;
  password: string;
}

interface authProviderProps {
  userHttpClient: IUserHttpClient;
  children: ReactNode;
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

export function AuthProvider({ children, userHttpClient }: authProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function userLogin({ email, password }: loginProps) {
    const response = await userHttpClient.login({ email, password });
    localStorage.setItem("token_login_system", response.token);
    const decoded = jwt_decode(response.token);
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

    const response = await userHttpClient.revalidateToken();
    localStorage.setItem("token_login_system", response.token);
    const decoded = jwt_decode(response.token);
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
