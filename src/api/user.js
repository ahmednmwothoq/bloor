import $axios from "../store/axios-instance";
  async function getUser() {
    try {
      return await $axios.get(`user`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function updateUser(payload) {
    try {
      return await $axios.post(`update-user`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userNotfications() {
    try {
      return await $axios.get(`Notfications`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function userAddExperiments(payload) {
    try {
      return await $axios.post(`experiments`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userGetAllExperiments() {
    try {
      return await $axios.get(`experiments`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }


  async function userGetSingleExperiments(payload) {
    try {
      return await $axios.get(`edit/experiments/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function userAddCommentToExper(id,payload) {
    try {
      return await $axios.post(`add/comment/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userAddCommentToReview(id,payload) {
    try {
      return await $axios.post(`add/comment-review/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function ShowAllRepleyCommentInEx(payload) {
    try {
      return await $axios.get(`all/comment/replies/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function ShowAllRepleyCommentInReview(payload) {
    try {
      return await $axios.get(`all/review/comment/replies/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function addRepleyInComment(id,payload) {
    try {
      return await $axios.post(`/add/reply/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function addRepleyInCommentReview(id,payload) {
    try {
      return await $axios.post(`/add/reply-review/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function updateCommentInExper(id,payload) {
    try {
      return await $axios.post(`update/comment/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function updateCommentInReview(id,payload) {
    try {
      return await $axios.post(`update/comment-review/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  
  async function deleteCommentInExper(id) {
    try {
      return await $axios.delete(`delete/comment/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function deleteCommentInReview(id) {
    try {
      return await $axios.delete(`delete/comment-review/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function deleteReplayCommentInExper(id) {
    try {
      return await $axios.delete(`delete/reply/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function deleteReplayCommentInReview(id) {
    try {
      return await $axios.delete(`delete/reply-review/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function updateReplayCommentInExper(id,payload) {
    try {
      return await $axios.post(`/update/reply/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function updateReplayCommentInReview(id,payload) {
    try {
      return await $axios.post(`update/reply-review/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function userLikeExperiment(id) {
    try {
      return await $axios.get(`like/experiment/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userFollowAnotherUser(id) {
    try {
      return await $axios.get(`follow/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function userRequstOfferDemand(id,payload) {
    try {
      return await $axios.post(`demand_offer/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userAllChats() {
    try {
      return await $axios.get(`all_chats?type=user`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  

  async function userAllChatMessages(id) {
    try {
      return await $axios.get(`AllChatMessages/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function userSendMessageInChat(id,payload) {
    try {
      return await $axios.post(`send_message/${id}`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function userAddReviewAndRate(id,payload) {
    try {
      return await $axios.post(`add-rating/${id}`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  } 
  
  async function userShowReviewAndRate(id) {
    try {
      return await $axios.get(`showProductReviews/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  


  const user = {
    getUser,
    updateUser,
    userNotfications,

    userAddExperiments,
    userGetAllExperiments,
    userGetSingleExperiments,

    userAddCommentToExper,
    userAddCommentToReview,

    ShowAllRepleyCommentInEx,
    ShowAllRepleyCommentInReview,

    addRepleyInComment,
    addRepleyInCommentReview,

    updateCommentInExper,
    updateCommentInReview,

    deleteCommentInExper,
    deleteCommentInReview,

    deleteReplayCommentInExper,
    deleteReplayCommentInReview,

    updateReplayCommentInExper,
    updateReplayCommentInReview,

    userLikeExperiment,
    userFollowAnotherUser,
    
    userRequstOfferDemand,
    
    userAllChats,
    userAllChatMessages,
    userSendMessageInChat,

    userAddReviewAndRate,
    userShowReviewAndRate,
    
  };
  export default user;