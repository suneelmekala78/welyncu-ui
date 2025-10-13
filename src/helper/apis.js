import axios from "axios";
import { logout } from "../redux/userSlice";
import { toast } from "react-toastify";

const { REACT_APP_API_URL } = process.env;

export const API = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: "json",
  withCredentials: true, // Include cookies in requests
});

export const apiRequest = async ({ url, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data || {},
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: "fail", message: err.message };
  }
};

//===========================================================================================

export const logoutUser = async () => {
  try {
    await apiRequest({
      url: "/auth/logout",
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async (dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri || "/posts",
      method: "GET",
      data: data || {},
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const likePost = async ({ uri }) => {
//   try {
//     const res = await apiRequest({
//       url: uri,
//       method: "POST",
//     });

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deletePost = async (id, dispatch) => {
  try {
    const res = await apiRequest({
      url: "/posts/delete/" + id,
      method: "DELETE",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedinUser = async (dispatch) => {
  try {
    const uri = "/user/get-current-user";
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }
    
    return res?.user;
  } catch (error) {
    const err = error?.response?.data;
    console.log(error);
    return { status: "fail", message: err.message };
  }
};

export const getUsers = async (dispatch) => {
  try {
    const uri = "/user/users/";
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }
    
    return res?.users;
  } catch (error) {
    const err = error?.response?.data;
    console.log(error);
    return { status: "fail", message: err.message };
  }
};

export const getUserInfo = async (id, dispatch) => {
  try {
    const uri = id === undefined ? "/user/get-user/" : "/user/get-user/" + id;
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }

    return res?.user;
  } catch (error) {
    const err = error.response.data;
    console.log(error);
    return { status: "fail", message: err.message };
  }
};

export const getConversations = async (id, dispatch) => {
  try {
    const uri = id === undefined ? "/conversation/" : "/conversation/" + id;
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (id, dispatch) => {
  try {
    const uri = id === undefined ? "/message/" : "/message/" + id;
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (data, dispatch) => {
  try {
    const uri = "/message/create";
    const res = await apiRequest({
      url: uri,
      data,
      method: "POST",
    });

    if (
      res?.message === "No token provided!" ||
      res?.message === "Invalid or Expired Token"
    ) {
      dispatch(logout());
      logoutUser();
      toast.info("User Session Expired. Login Again");
      window.location.replace("/login");
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const sendConnectionRequest = async (id) => {
//   try {
//     const res = await apiRequest({
//       url: "/users/friend-request",
//       method: "POST",
//       data: { requestTo: id },
//     });

//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const viewUserProfile = async (id) => {
//   try {
//     const res = await apiRequest({
//       url: "/users/profile-view",
//       method: "POST",
//       data: { id },
//     });

//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };
