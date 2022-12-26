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
  
  async function supplierAddOffer(payload) {
    try {
      return await $axios.post(`suplier/offer`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierGetOffers() {
    try {
      return await $axios.get(`suplier/offers`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierGetOfferEdit(payload) {
    try {
      return await $axios.get(`suplier/edit/offer/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierOfferUpdate(id,payload) {
    try {
      return await $axios.post(`suplier/update/offer/${id}`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierOfferDelete(payload) {
    try {
      return await $axios.delete(`suplier/delete/offer/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierAddProductRev(payload) {
    try {
      return await $axios.post(`suplier/review-product`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierGetProducts() {
    try {
      return await $axios.get(`suplier/all-review-products`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function supplierEditProductRev(id,payload) {
    try {
      return await $axios.post(`suplier/update/review-product/${id}`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  
  async function supplierDeleteProductRev(id) {
    try {
      return await $axios.delete(`suplier/delete/review-product/${id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }



  async function supplierAllChats() {
    try {
      return await $axios.get(`all_chats?type=provider`).then((res) => {
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


  const supplier = {
    getUser,
    updateUser,
    userNotfications,

    supplierAddOffer,
    supplierGetOffers,
    supplierGetOfferEdit,
    supplierOfferUpdate,
    supplierOfferDelete,

    supplierAddProductRev,
    supplierEditProductRev,
    supplierDeleteProductRev,

    supplierGetProducts,
    userAllChatMessages,
    supplierAllChats,
    userSendMessageInChat,

    
  };
  export default supplier;