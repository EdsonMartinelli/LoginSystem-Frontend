import { UseToastOptions } from "@chakra-ui/toast";

interface errorToastProps {
  message: string;
  status: number;
}
export function errorToast({ message, status }: errorToastProps) {
  const errorToastOptions: UseToastOptions = {
    title: `Error ${status}`,
    description: message,
    status: "error",
    duration: 9000,
    isClosable: true,
  };

  return errorToastOptions;
}
