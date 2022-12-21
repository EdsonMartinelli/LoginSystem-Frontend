import {
  loginRequestProps,
  loginResponseProps,
} from "./routes/user/LoginProps";
import { revalidateTokenResponseProps } from "./routes/user/RevalidateTokenProps";
import {
  signUpRequestProps,
  signUpResponseProps,
} from "./routes/user/SignUpProps";
import {
  validateEmailRequestProps,
  validateEmailResponseProps,
} from "./routes/user/ValidateEmailProps";

export interface IUserHttpClient {
  signUp: (data: signUpRequestProps) => Promise<signUpResponseProps>;
  login: (data: loginRequestProps) => Promise<loginResponseProps>;
  revalidateToken: () => Promise<revalidateTokenResponseProps>;
  validateEmail: ({
    id,
    emailToken,
  }: validateEmailRequestProps) => Promise<validateEmailResponseProps>;
}
