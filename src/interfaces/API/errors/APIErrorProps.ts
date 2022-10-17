import { APIResponseProps } from "../APIResponseProps";

export interface APIErrorProps extends APIResponseProps {
  message: string;
}
