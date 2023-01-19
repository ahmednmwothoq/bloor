
import $axios from "../store/axios-instance";
async function getOurMessages() {
    try {
        return await $axios.get(`OurMessage`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getAllOffers() {
    try {
        return await $axios.get(`all_offers`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getAllExperiments() {
    try {
        return await $axios.get(`all_experiments`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getAllProductstoReviews() {
    try {
        return await $axios.get(`AllProductstoReviews`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getAllFaqs() {
    try {
        return await $axios.get(`Faqs`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getPrivcyAndPolicy() {
    try {
        return await $axios.get(`PrivcyAndPolicy`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getTermsAndConditions() {
    try {
        return await $axios.get(`TermsAndConditions`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getAboutUs() {
    try {
        return await $axios.get(`AboutUs`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getOurVission() {
    try {
        return await $axios.get(`OurVission`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getDetailsOffer(id) {
    try {
        return await $axios.get(`suplier/edit/offer/${id}`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getSetting() {
    try {
        return await $axios.get(`AllSettings`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function sendContactUs(payload) {
    try {
        return await $axios.post(`contactus`,payload).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}


async function getAllSuppliers() {
    try {
        return await $axios.get(`get-suppliers`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getAllOffersSupplier(id) {
    try {
        return await $axios.get(`get-supplier/offers/${id}`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}

async function getShowProductReviewsQuestions(id) {
    try {
        return await $axios.get(`showProductReviewsQuestions/${id}`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getAllFollowsData() {
    try {
        return await $axios.get(`/AllFollowsData`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getShowAllReviews() {
    try {
        return await $axios.get(`showAllReviews`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}
async function getShowAllReviewsAll() {
    try {
        return await $axios.get(`showAllReviewsAll`).then((res) => {
            return res;
        });
    } catch (error) {
        return error
    }
}



  const general = {
    getOurMessages,
    getAllOffers,
    getAllExperiments,
    getAllProductstoReviews,
    getAllFaqs,
    getPrivcyAndPolicy,
    getTermsAndConditions,
    getAboutUs,
    getOurVission,

    getDetailsOffer,
    getSetting,
    sendContactUs,

    getAllSuppliers,
    getAllOffersSupplier,

    getShowProductReviewsQuestions,

    getAllFollowsData,
    getShowAllReviews,
    getShowAllReviewsAll,
    
  };
  export default general;