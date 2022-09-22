import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface authGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: authGuardProps) {
  const { userValidate } = useAuth();
  const [canAccess, setCanAccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    /* (async () => {
      try {
        await userValidate()
        setCanAccess(true)
      } catch (error) {
        navigate('/')
      }
    })() */

    userValidate()
      .then(() => {
        setCanAccess(true);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return <div>{canAccess && children}</div>;
}
