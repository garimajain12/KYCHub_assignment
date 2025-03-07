import axios from "axios";

export const getProductsDataService = () => {
  return axios
    .get("https://dummyjson.com/products")
    .then((res) => ({
      data: res.data,
      status: res.status,
      isSuccess: true,
    }))
    .catch((error) => {
      return {
        data: [],
        status: error.response?.status,
        isSuccess: false,
      };
});
};
