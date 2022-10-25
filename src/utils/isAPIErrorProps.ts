import { APIErrorProps } from "../interfaces/API/errors/APIErrorProps";

export function isAPIErrorProps(error: any): error is APIErrorProps {
  return (
    typeof (error as APIErrorProps).message === "string" &&
    typeof (error as APIErrorProps).status === "number"
  );
}
