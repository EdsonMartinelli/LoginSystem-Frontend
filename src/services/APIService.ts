import axios, { AxiosError, AxiosResponse } from "axios";
import {
  loginRequestProps,
  loginResponseProps,
} from "../interfaces/API/cases/LoginProps";
import { revalidateTokenResponseProps } from "../interfaces/API/cases/RevalidateTokenProps";
import {
  signUpRequestProps,
  signUpResponseProps,
} from "../interfaces/API/cases/SignUpProps";
import {
  validateEmailRequestProps,
  validateEmailResponseProps,
} from "../interfaces/API/cases/ValidateEmailProps";
import { APIErrorProps } from "../interfaces/API/errors/APIErrorProps";

interface APIResponse {
  data: any;
}

export function APIServiceInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token_login_system");

    request.headers = {
      Authorization: `Bearer ${token ?? ""}`,
    };
    return request;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const responseData = (response.data as APIResponse).data;
      return responseData;
    },
    async (error: AxiosError) => {
      if (error.response?.data != null) {
        const responseError: APIErrorProps = (
          error.response.data as APIResponse
        ).data;
        return await Promise.reject(responseError);
      }
      const responseNetworkError: APIErrorProps = { message: error.message };
      return await Promise.reject(responseNetworkError);
    }
  );

  const APIRequestRoutes = {
    user: {
      signUp: async (
        data: signUpRequestProps
      ): Promise<signUpResponseProps> => {
        return await instance.post("/signup", data);
      },
      login: async (data: loginRequestProps): Promise<loginResponseProps> => {
        return await instance.post("/login", data);
      },
      revalidateToken: async (): Promise<revalidateTokenResponseProps> => {
        return await instance.post("/revalidateToken");
      },
      validateEmail: async ({
        id,
        code,
      }: validateEmailRequestProps): Promise<validateEmailResponseProps> => {
        return await instance.patch(`/validateemail/${id}`, code);
      },
    },
  };

  return APIRequestRoutes;
}
