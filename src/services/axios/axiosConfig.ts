import axios, { AxiosError, AxiosResponse } from "axios";
import { APIErrorProps } from "../../interfaces/http/errors/APIErrorProps";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token_login_system");

  request.headers = {
    Authorization: `Bearer ${token ?? ""}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseData = (response.data as AxiosResponse).data;
    return responseData;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 0) {
      const responseNetworkError: APIErrorProps = {
        message: "Internal Server Error!",
        status: 500,
      };
      return await Promise.reject(responseNetworkError);
    }
    const responseError = (error.response?.data as AxiosResponse).data;
    const responseAPIError: APIErrorProps = {
      message: responseError?.message,
      status: error.response?.status ?? 500,
    };
    return await Promise.reject(responseAPIError);
  }
);

export { instance };
