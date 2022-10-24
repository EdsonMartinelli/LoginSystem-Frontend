import { UseToastOptions } from "@chakra-ui/toast";

export function errorToast(message: string) {
  const errorToastOptions: UseToastOptions = {
    title: "Error",
    description: message,
    status: "error",
    duration: 9000,
    isClosable: true,
  };

  return errorToastOptions;
}
