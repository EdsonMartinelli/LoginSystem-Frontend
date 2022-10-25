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
      if (error.response?.status === 0) {
        const responseNetworkError: APIErrorProps = {
          message: "Internal Server Error!",
          status: 500,
        };
        return await Promise.reject(responseNetworkError);
      }
      const responseError = (error.response?.data as APIResponse).data;
      const responseAPIError: APIErrorProps = {
        message: responseError?.message,
        status: error.response?.status ?? 500,
      };
      return await Promise.reject(responseAPIError);
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
        emailToken,
      }: validateEmailRequestProps): Promise<validateEmailResponseProps> => {
        return await instance.patch(`/validateemail/${id}`, { emailToken });
      },
    },
  };

  return APIRequestRoutes;
}
