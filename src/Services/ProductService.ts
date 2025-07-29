import axiosInstance from "./axios";
import { ProductDto } from "../Dto/ProductDto";

export const ProductService = 
{
  async getAll(): Promise<ProductDto[]> {
    const response = await axiosInstance.get("/product");
    return response.data;
  }
  
};
