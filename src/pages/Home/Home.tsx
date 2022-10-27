import { Button, LightMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <LightMode>
        <Button
          colorScheme="messenger"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </Button>
      </LightMode>
    </div>
  );
}
