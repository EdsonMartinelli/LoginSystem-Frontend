import { createContext, ReactNode, useState } from "react";
import jwt_decode from "jwt-decode";
import { APIServiceInstance } from "../services/APIService";
import { AssertAPIError } from "../utils/APIErrorPropsAssert";

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
  const APIService = APIServiceInstance();

  async function userLogin({ email, password }: loginProps) {
    try {
      const response = await APIService.user.login({ email, password });
      localStorage.setItem("token_login_system", response.token);
      console.log("entrou aqui");
      const decoded = jwt_decode(response.token);
      const userDecode = decoded as User;
      setUser({
        id: userDecode.id,
        username: userDecode.username,
        email: userDecode.email,
      });
    } catch (error: any) {
      const assertError = AssertAPIError(error);
      throw new Error(assertError.message, {
        cause: {
          status: assertError.status,
        },
      });
    }
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
    try {
      const response = await APIService.user.revalidateToken();
      localStorage.setItem("token_login_system", response.token);
      const decoded = jwt_decode(response.token);
      const userDecode = decoded as User;
      setUser({
        id: userDecode.id,
        username: userDecode.username,
        email: userDecode.email,
      });
    } catch (error: any) {
      userLogout();
      const assertError = AssertAPIError(error);
      throw new Error(assertError.message, {
        cause: {
          status: assertError.status,
        },
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout, userValidate }}>
      {children}
    </AuthContext.Provider>
  );
}
