import axios from "axios";
import { loginRequestProps } from "../interfaces/API/LoginProps";
import { signUpRequestProps } from "../interfaces/API/SignUpProps";
import { validateEmailRequestProps } from "../interfaces/API/ValidateEmailProps";


export function APIServiceInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token_login_system");

    request.headers = {
      Autentication: `Bearer: ${token ?? ""}`,
    };
    return request;
  });

  instance.interceptors.response.use((response) => {
    console.log(response);
    return response;
  });

  const APIRequestRoutes = {
    user: {
      signUp: async (data: signUpRequestProps) => {
        return await instance.post("/signup", data);
      },
      login: async (data: loginRequestProps) => {
        return await instance.post("/login", data);
      },
      revalidateToken: async () => {
        return await instance.post("/revalidateToken");
      },
      validateEmail: async ({ id, code }: validateEmailRequestProps) => {
        return await instance.patch(`/validateemail/${id}`, code);
      },
    },
  };

  return APIRequestRoutes;
}
