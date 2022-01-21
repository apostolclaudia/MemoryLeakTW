import { sendToast } from "./useToast";
import { get, post } from "./useAxios";
import { reactive } from "vue";

interface Product {}

interface StateInterface {
  products: Product[];
}

const state = reactive<StateInterface>({
  products: [],
});

export const useProducts = () => {
  const getProductsForUser = async (username: string) => {
    try {
      const response = await get(`product/${username}/`);
      if (response.status === 200) {
        state.products = response.data.products;
      } else {
        sendToast({ type: "negative", message: response.data.error });
      }
    } catch (error) {}
  };

  const addProduct = async (
    name: string,
    categoryId: number,
    quantity: string
  ) => {
    try {
      const response = await post("/product/", { name, categoryId, quantity });
      if (response.status === 200) {
        sendToast({ message: response.data.message, type: "positive" });
        state.products.push(response.data.product)
      } else {
        sendToast({ message: response.data.error });
      }
    } catch (error) {}
  };
  return { state, getProductsForUser, addProduct };
};
