import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user?.id}</h1>
      <h1>{user?.username}</h1>
      <h1>{user?.email}</h1>
    </div>
  );
}
