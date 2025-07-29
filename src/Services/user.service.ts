import axiosInstance from "./axios"
import { UserDto } from "../Dto/UserDto";
const baseURL = '/User'
export const getAllUsers = async (): Promise<UserDto[]> => 
{
  const res = await axiosInstance.get("/User"); 
  return res.data;
};

export const getUserById = async (id: number): Promise<UserDto> => {
  const res = await axiosInstance.get(baseURL + `/${id}`);
  return res.data;
};

export const updateUser = async (id: number, user: Partial<UserDto>) => {
  const formData = new FormData();
  formData.append("Id", id.toString());
  formData.append("Name", user.name || "");
  formData.append("Email", user.email || "");

  return axiosInstance.put(baseURL +`/${id}`, formData);
};

export const deleteUser = async (id: number) => {
  return axiosInstance.delete(baseURL + `/${id}`);
};
export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post(baseURL + '/forgot-password', { Email: email });
  return response.data;
};