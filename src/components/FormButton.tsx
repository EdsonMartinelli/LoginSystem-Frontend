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
      colorScheme="pink"
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}
