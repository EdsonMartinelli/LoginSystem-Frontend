import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputButtonProps {
  click: () => void;
  children: ReactNode;
}

export function InputButton({ click, children }: InputButtonProps) {
  return (
    <Button h="1.75rem" size="sm" onClick={click} padding="0px" tabIndex={-1}>
      {children}
    </Button>
  );
}
