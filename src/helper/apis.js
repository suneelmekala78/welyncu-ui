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

const isAuthFailure = (message) => {
  return (
    message === "No token provided!" ||
    message === "Invalid or Expired Token" ||
    message === "Invalid or expired token!"
  );
};

const handleSessionExpired = (dispatch) => {
  if (dispatch) {
    dispatch(logout());
  }
  logoutUser();
  toast.info("User Session Expired. Login Again");
  window.location.replace("/login");
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

export const likePostApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/posts/like/${id}`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commentPostApi = async (id, text) => {
  try {
    const res = await apiRequest({
      url: `/posts/comment/${id}`,
      method: "POST",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createPollApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/posts/create-poll",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const votePollApi = async (postId, optionIndex) => {
  try {
    const res = await apiRequest({
      url: `/posts/vote/${postId}`,
      method: "POST",
      data: { optionIndex },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPostApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/posts/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsApi = async (userId) => {
  try {
    const res = await apiRequest({
      url: `/posts/user/${userId}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

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

export const editPostApi = async (id, caption) => {
  try {
    const res = await apiRequest({
      url: `/posts/edit/${id}`,
      method: "PUT",
      data: { caption },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editCommentApi = async (postId, commentId, text) => {
  try {
    const res = await apiRequest({
      url: `/posts/comment/${postId}/${commentId}`,
      method: "PUT",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentApi = async (postId, commentId) => {
  try {
    const res = await apiRequest({
      url: `/posts/comment/${postId}/${commentId}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const reportPostApi = async (id, reason) => {
  try {
    const res = await apiRequest({
      url: `/posts/report/${id}`,
      method: "POST",
      data: { reason },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const reportCommentApi = async (postId, commentId) => {
  try {
    const res = await apiRequest({
      url: `/posts/report/${postId}/${commentId}`,
      method: "POST",
    });
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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);
    
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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);
    
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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);

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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createConversation = async (data, dispatch) => {
  try {
    const res = await apiRequest({
      url: "/conversation/create",
      data,
      method: "POST",
    });

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);

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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);

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

    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);

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

// ====== Notifications ======

export const getNotifications = async (dispatch) => {
  try {
    const res = await apiRequest({
      url: "/notification",
      method: "GET",
    });
    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const markNotificationRead = async (id) => {
  try {
    const res = await apiRequest({
      url: `/notification/read/${id}`,
      method: "PUT",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const markAllNotificationsRead = async () => {
  try {
    const res = await apiRequest({
      url: "/notification/read-all",
      method: "PUT",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotificationApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/notification/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Stories ======

export const getStoryFeed = async (dispatch) => {
  try {
    const res = await apiRequest({
      url: "/story/feed",
      method: "GET",
    });
    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createStory = async (formData) => {
  try {
    const res = await API.post("/story/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Error creating story" };
  }
};

export const viewStoryApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/story/view/${id}`,
      method: "PUT",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStoryApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/story/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likeStoryApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/story/like/${id}`,
      method: "PUT",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const replyStoryApi = async (id, text) => {
  try {
    const res = await apiRequest({
      url: `/story/reply/${id}`,
      method: "POST",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryViewersApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/story/viewers/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const votePollStoryApi = async (id, optionIndex) => {
  try {
    const res = await apiRequest({
      url: `/story/poll-vote/${id}`,
      method: "POST",
      data: { optionIndex },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Messages Enhanced ======

export const sendMessageWithMedia = async (formData, dispatch) => {
  try {
    const res = await API.post("/message/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (isAuthFailure(res?.data?.message)) handleSessionExpired(dispatch);
    return res?.data;
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Error sending message" };
  }
};

export const editMessageApi = async (id, text) => {
  try {
    const res = await apiRequest({
      url: `/message/edit/${id}`,
      method: "PUT",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessageApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/message/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessageForMeApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/message/for-me/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const reactToMessageApi = async (id, emoji) => {
  try {
    const res = await apiRequest({
      url: `/message/react/${id}`,
      method: "PUT",
      data: { emoji },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Connections ======

export const getConnectionsList = async (dispatch) => {
  try {
    const res = await apiRequest({
      url: "/user/connections",
      method: "GET",
    });
    if (isAuthFailure(res?.message)) handleSessionExpired(dispatch);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Games ======

export const createGameApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/create",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const acceptGameApi = async (gameId) => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/accept",
      method: "POST",
      data: { gameId },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const rejectGameApi = async (gameId) => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/reject",
      method: "POST",
      data: { gameId },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getGameApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/tictactoe/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyGamesApi = async () => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/my-games",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPendingInvitationsApi = async () => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/pending",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const finishGameApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/tictactoe/finish",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Jobs ======

export const getJobsApi = async (query = "") => {
  try {
    const res = await apiRequest({
      url: `/jobs${query ? `?${query}` : ""}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getJobApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/jobs/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyJobsApi = async () => {
  try {
    const res = await apiRequest({
      url: "/jobs/my-jobs",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createJobApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/jobs",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJobApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/jobs/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const applyToJobApi = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/jobs/${id}/apply`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getJobApplicationsApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/jobs/${id}/applications`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateApplicationStatusApi = async (jobId, appId, status) => {
  try {
    const res = await apiRequest({
      url: `/jobs/${jobId}/applications/${appId}`,
      method: "PUT",
      data: { status },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Resumes ======

export const getMyResumesApi = async () => {
  try {
    const res = await apiRequest({
      url: "/resumes",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getResumeApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/resumes/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createResumeApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/resumes",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateResumeApi = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/resumes/${id}`,
      method: "PUT",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteResumeApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/resumes/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ====== Company Pages ======

export const getMyPagesApi = async () => {
  try {
    const res = await apiRequest({
      url: "/pages/my-pages",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingPagesApi = async () => {
  try {
    const res = await apiRequest({
      url: "/pages/following",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPagesApi = async (userId) => {
  try {
    const res = await apiRequest({
      url: `/pages/user/${userId}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPageApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pages/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPageByLinkApi = async (link) => {
  try {
    const res = await apiRequest({
      url: `/pages/link/${link}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePageApi = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/pages/${id}`,
      method: "PUT",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePageApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pages/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const followPageApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pages/${id}/follow`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ============================= STARTUPS =============================

export const getStartupsApi = async (query = "") => {
  try {
    const res = await apiRequest({
      url: `/startups${query ? `?${query}` : ""}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStartupApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/startups/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyStartupsApi = async () => {
  try {
    const res = await apiRequest({
      url: "/startups/my-startups",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createStartupApi = async (data) => {
  try {
    const res = await API.post("/startups/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
    return { status: "fail", message: error?.response?.data?.message || error.message };
  }
};

export const updateStartupApi = async (id, data) => {
  try {
    const res = await API.put(`/startups/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
    return { status: "fail", message: error?.response?.data?.message || error.message };
  }
};

export const deleteStartupApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/startups/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const upvoteStartupApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/startups/${id}/upvote`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commentOnStartupApi = async (id, text) => {
  try {
    const res = await apiRequest({
      url: `/startups/${id}/comment`,
      method: "POST",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const followStartupApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/startups/${id}/follow`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ============================= PITCHES =============================

export const getPitchesApi = async (query = "") => {
  try {
    const res = await apiRequest({
      url: `/pitches${query ? `?${query}` : ""}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPitchApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pitches/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyPitchesApi = async () => {
  try {
    const res = await apiRequest({
      url: "/pitches/my-pitches",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createPitchApi = async (data) => {
  try {
    const res = await API.post("/pitches/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
    return { status: "fail", message: error?.response?.data?.message || error.message };
  }
};

export const deletePitchApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pitches/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likePitchApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/pitches/${id}/like`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const commentOnPitchApi = async (id, text) => {
  try {
    const res = await apiRequest({
      url: `/pitches/${id}/comment`,
      method: "POST",
      data: { text },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ============================= MENTORSHIPS =============================

export const getMentorsApi = async (query = "") => {
  try {
    const res = await apiRequest({
      url: `/mentorships${query ? `?${query}` : ""}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMentorshipApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/mentorships/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyMentorshipsApi = async () => {
  try {
    const res = await apiRequest({
      url: "/mentorships/my-mentorships",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createMentorshipApi = async (data) => {
  try {
    const res = await apiRequest({
      url: "/mentorships/create",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateMentorshipApi = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/mentorships/${id}`,
      method: "PUT",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMentorshipApi = async (id) => {
  try {
    const res = await apiRequest({
      url: `/mentorships/${id}`,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestMentorshipApi = async (id, message) => {
  try {
    const res = await apiRequest({
      url: `/mentorships/${id}/request`,
      method: "POST",
      data: { message },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const respondMentorshipRequestApi = async (id, requestId, status) => {
  try {
    const res = await apiRequest({
      url: `/mentorships/${id}/request/${requestId}`,
      method: "PUT",
      data: { status },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
