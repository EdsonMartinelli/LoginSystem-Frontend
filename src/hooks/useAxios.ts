import axios from "axios";

interface signUpProps {
  username: string;
  email: string;
  password: string;
}

interface loginProps {
  email: string;
  password: string;
}

interface validateEmailProps {
  id: string;
  code: string;
}

export function useAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  // global instance config
  instance.defaults.headers = {
    common: {},
    head: {},
    get: {},
    post: {},
    put: {},
    delete: {},
    patch: {},
  };

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token_login_system");

    request.headers = {
      Autentication: `Bearer: ${token ?? ""}`,
    };
    return request;
  });

  instance.interceptors.response.use((response) => {
    console.log(response);
    return response;
  });

  const apiRequestRoutes = {
    user: {
      signUp: async (data: signUpProps) => {
        return await instance.post("/signup", data);
      },
      login: async (data: loginProps) => {
        return await instance.post("/login", data);
      },
      revalidateToken: async () => {
        return await instance.post("/revalidateToken");
      },
      validateEmail: async ({ id, code }: validateEmailProps) => {
        return await instance.patch(`/validateemail/${id}`, code);
      },
    },
  };

  return apiRequestRoutes;
}
