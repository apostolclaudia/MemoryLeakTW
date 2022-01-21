import { setJWT } from "./useJWT";
import { sendToast } from "./useToast";
import { post } from "./useAxios";
import { reactive } from "vue";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface stateInterface {
  user: User | null;
}

const state = reactive<stateInterface>({
  user: null,
});

export const useUser = () => {
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    if (!username || !email || !password) {
      sendToast({ message: "Invalid values", type: "negative" });
    }

    const response = await post("user/register/", {
      username,
      email,
      password,
    });

    if (response.status !== 201) {
      sendToast({ type: "negative", message: response.data.error });
      return;
    }

    if (response.status === 201) {
      return true;
    }

    return false;
  };

  const login = async (username: string, password: string) => {
    if(!username || !password) {
      sendToast({type: 'negative', message: 'Fill all fields'})
    }

    const response = await post("user/login/", {
      username,
      password,
    });

    if(response.status === 200) {
      setJWT(response.data.access_token)
      state.user = response.data.user;
      return true
    } else {
      sendToast({message: response.data.error as string})
      return false;
    }
  }

  return { state, register, login };
};
