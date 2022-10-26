import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormButtonProps extends ButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  children: ReactNode;
}
export function FormButton({
  isDisabled,
  isLoading,
  children,
  ...props
}: FormButtonProps) {
  return (
    <Button
      {...props}
      bgColor="messenger.500"
      color="gray.50"
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}
