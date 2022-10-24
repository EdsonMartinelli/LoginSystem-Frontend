import { UseToastOptions } from "@chakra-ui/toast";

export function infoToast(message: string) {
  const infoToastOptions: UseToastOptions = {
    title: "Information",
    description: message,
    status: "info",
    duration: 9000,
    isClosable: true,
  };

  return infoToastOptions;
}
