import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";

interface asideContentProps {
  buttonName: string;
  path: string;
  orientation: typeOrientationAuthAnimation;
}

export function AsideAuthContent({
  buttonName,
  path,
  orientation,
}: asideContentProps) {
  const navigate = useNavigate();

  function goTo() {
    navigate(path, { state: { orientation } });
  }

  return (
    <Box
      bg="messenger.500"
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <button
        style={{
          backgroundColor: "transparent",
          padding: "5px",
          color: "#f1f1f1",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        className="image-content-button"
        onClick={() => {
          goTo();
        }}
      >
        {buttonName}
      </button>
    </Box>
  );
}
