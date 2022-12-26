
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
    
  };
  export default general;