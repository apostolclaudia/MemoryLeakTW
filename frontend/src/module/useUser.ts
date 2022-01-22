import { getJWT, setJWT } from "./useJWT";
import { sendToast } from "./useToast";
import { get, post } from "./useAxios";
import { reactive } from "vue";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface stateInterface {
  user: User | null;
  friends: User[];
}

const state = reactive<stateInterface>({
  user: null,
  friends: []
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
      localStorage.setItem('username', response.data.user.username)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      state.user = response.data.user;
      return true
    } else {
      sendToast({message: response.data.error as string})
      return false;
    }
  }

  const getFriends = () => {

  }

  const getData = async () => {
    const token = getJWT();
    if(token) {
      const response = await get('user/getById/')
      if(response.status === 200) {
        state.user = response.data
        return true
      } else {
        return false;
      }
    }
  }

  return { state, register, login, getData };
};
