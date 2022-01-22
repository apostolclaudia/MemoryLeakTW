import { sendToast } from "./useToast";
import { get, post, remove } from "./useAxios";
import { reactive } from "vue";

interface Product {
  id: number;
  name: string;
  isAvailable: boolean;
  expirationDate: Date | null;
  quantity: string;
  claimedBy: number | null;
  categoryId: number;
  userId: number;
}

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
    quantity: string,
    expirationDate: string,
    isAvailable: Boolean,
  ) => {
    try {
      const response = await post("/product/", { name, categoryId, quantity, expirationDate, isAvailable });
      if (response.status === 200) {
        sendToast({ message: response.data.message, type: "positive" });
        state.products.push(response.data.product);
      } else {
        sendToast({ message: response.data.error });
      }
    } catch (error) {}
  };

  const loadProducts = async (username: string) => {
    try {
      const response = await get(`product/all/${username}`);
      if (response.status === 200) {
        state.products = response.data;
        return true;
      } else {
        sendToast({ message: response.data.error });
      }
    } catch (error) {
      return false
    }
  };

  const claimProduct = async (productId: number, userId: number) => {
    try {
      const response = await post(`/product/claim/${productId}`)
      if(response.status === 200) {
        sendToast({ message: response.data.message, type: 'positive' });
        state.products.map(p => {
          if(p.id === productId) {
            p.claimedBy = userId
          }
        })
        return true;
      }
    } catch (error) {
      return false
    }
  }

  const unclaimProduct = async (productId: number) => {
    try {
      const response = await remove(`/product/claim/${productId}`)
      if(response.status === 200) {
        sendToast({ message: response.data.message, type: 'positive' });
        state.products.map(p => {
          if(p.id === productId) {
            p.claimedBy = null
          }
        })
        return true;
      }
    } catch (error) {
      return false
    }
  }

  const removeProduct = async (productId: number) =>{
    try{
      const response = await remove(`/product/${productId}`)
      if (response.status === 200) {
        sendToast({ message: response.data.message, type: 'positive' });
        state.products = state.products.filter(p => p.id != productId);
        return true;
      } else {
        sendToast({ type: "negative", message: response.data.error });
      }
    }catch (error) {
      return false
    }
  }

  return { state, getProductsForUser, addProduct, loadProducts, claimProduct, unclaimProduct, removeProduct};
};
