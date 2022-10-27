import { Button, ButtonProps, LightMode } from "@chakra-ui/react";
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
    <LightMode>
      <Button
        {...props}
        colorScheme="messenger"
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        {children}
      </Button>
    </LightMode>
  );
}
