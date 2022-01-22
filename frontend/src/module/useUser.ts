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

export interface Group {
  name: string;
}

interface stateInterface {
  user: User | null;
  friends: User[];
  groups: Group[];
}

const state = reactive<stateInterface>({
  user: null,
  friends: [],
  groups: [],
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
    if (!username || !password) {
      sendToast({ type: "negative", message: "Fill all fields" });
    }

    const response = await post("user/login/", {
      username,
      password,
    });

    if (response.status === 200) {
      setJWT(response.data.access_token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      state.user = response.data.user;
      return true;
    } else {
      sendToast({ message: response.data.error as string });
      return false;
    }
  };

  const getFriends = () => {};

  const logout = () => {
    state.user = null;
    state.friends = [];
    localStorage.removeItem("username");
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("user");
  };

  const getData = async () => {
    const token = getJWT();
    if (token) {
      const response = await get("user/getById/");
      if (response.status === 200) {
        console.log(response.data);

        state.user = response.data.user;
        state.groups = response.data.groups;
        return true;
      } else {
        return false;
      }
    }
  };

  const searchUsers = async (query: string) => {
    try {
      const response = await post("/user/findAll", { query });
      if (response.status === 200) {
        return response.data.filter((u: User) => state?.user?.id !== u.id);
      }
    } catch (error) {
      return false;
    }
  };

  const createGroup = async (name: string) => {
    try {
      const response = await post("group/", { name });
      if (response.status === 200) {
        state.groups.push(response.data.group);
        sendToast({ message: response.data.message, type: "positive" });
      }
    } catch (error) {}
  };

  const addFriend = async (groupId: number, users: number) => {
    try {
      const response = await post("group/" + groupId, { users: [users] });

      if (response.status === 200) {
        state.friends.push(response.data.users);
      }
    } catch (error) {}
  };

  const getUsersFromGroup = async (name: string) => {
    try {
      const response = await get("group/" + name);
      if (response.status === 200) {
        console.log(response.data);

        return response.data.group.users;
      }
    } catch (error) {}
  };

  const getClaimed = async () => {
    try {
      const response = await get("product/claimed/");
      if (response.status === 200) {
        console.log(response.data);

        return response.data;
      }
    } catch (error) {}
  };

  return {
    state,
    register,
    login,
    getData,
    logout,
    searchUsers,
    createGroup,
    addFriend,
    getUsersFromGroup,
    getClaimed,
  };
};
