import { APIErrorProps } from "../interfaces/API/errors/APIErrorProps";

function isAPIErrorProps(error: any): error is APIErrorProps {
  return (
    typeof (error as APIErrorProps).message === "string" &&
    typeof (error as APIErrorProps).status === "number"
  );
}

export function AssertAPIError(error: any) {
  if (isAPIErrorProps(error)) {
    const errorAPI: APIErrorProps = {
      message: error.message,
      status: error.status,
    };
    return errorAPI;
  }

  const errorAny: APIErrorProps = {
    message: "Internal Error.",
    status: 500,
  };
  return errorAny;
}
