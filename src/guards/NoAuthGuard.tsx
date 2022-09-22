import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface noAuthGuardProps {
  children: ReactNode;
}

export function NoAuthGuard({ children }: noAuthGuardProps) {
  const { userValidate } = useAuth();
  const [canAccess, setCanAccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    /* (async () => {
      try {
        await userValidate()
        navigate('/profile')
      } catch (error) {
        setCanAccess(true)
      }
    })() */

    userValidate()
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        setCanAccess(true);
      });
  }, []);

  return <div>{canAccess && children}</div>;
}
