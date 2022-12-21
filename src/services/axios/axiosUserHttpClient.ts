import { IUserHttpClient } from "../../interfaces/http/IUserHttpClient";
import {
  loginRequestProps,
  loginResponseProps,
} from "../../interfaces/http/routes/user/LoginProps";
import { revalidateTokenResponseProps } from "../../interfaces/http/routes/user/RevalidateTokenProps";
import {
  signUpRequestProps,
  signUpResponseProps,
} from "../../interfaces/http/routes/user/SignUpProps";
import {
  validateEmailRequestProps,
  validateEmailResponseProps,
} from "../../interfaces/http/routes/user/ValidateEmailProps";
import { instance } from "./axiosConfig";

const axiosUserHttpClient: IUserHttpClient = {
  signUp: async (data: signUpRequestProps): Promise<signUpResponseProps> => {
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
};

export { axiosUserHttpClient };
