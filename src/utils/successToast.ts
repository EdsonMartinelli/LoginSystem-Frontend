import { UseToastOptions } from "@chakra-ui/toast";

export function successToast(message: string) {
  const successToastOptions: UseToastOptions = {
    title: "Success",
    description: message,
    status: "success",
    duration: 9000,
    isClosable: true,
  };

  return successToastOptions;
}
