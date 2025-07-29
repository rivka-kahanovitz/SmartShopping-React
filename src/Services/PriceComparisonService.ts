import axiosInstance from "./axios";
const baseURL = '/PriceComparison';
export class PriceComparisonService {
  static async findBestStore(data: {
    items: { barcode: string; quantity: number }[];}) 
    {

    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      baseURL + '/best-store',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
}
