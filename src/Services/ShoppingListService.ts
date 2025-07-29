import axiosInstance from "./axios";
import {ShoppingListItemDto, ShoppingListDto} from "../Dto/ShoppingListDto"

const baseURL = "/ShoppingList";

export const ShoppingListService = {
  async saveShoppingList(dto: { title: string; items: ShoppingListItemDto[] }) {
    return axiosInstance.post(baseURL, dto);
  },

  getAll: async (): Promise<ShoppingListDto[]> => {
    const response = await axiosInstance.get(baseURL);
    return response.data;
  },

  getById: async (id: number): Promise<ShoppingListDto> => {
    const response = await axiosInstance.get(`${baseURL}/${id}`);
    return response.data;
  },

  update: async (id: number, dto: ShoppingListDto): Promise<ShoppingListDto> => {
    const response = await axiosInstance.put(`${baseURL}/${id}`, dto);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${baseURL}/${id}`);
  }
};
