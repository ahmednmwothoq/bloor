import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import auth from '../middleware/auth';
import log from '../middleware/log';
import guest from '../middleware/guest';

import Home from '../views/Home.vue'
import AboutUs from '../views/user/aboutUs.vue'
import Classification from '../views/user/classification.vue'
import ContactUs from '../views/user/contactUs.vue'
import FAQs from '../views/user/faqs.vue'
import OnlineComplaint from '../views/user/onlineComplaint.vue'



/**  
 * User
*/
// auth
import userLogin from '../views/user/auth/login.vue'
import userSignUp from '../views/user/auth/signUp.vue'
import userVerifyEmail from '../views/user/auth/verifyEmail.vue'
import userForgetPass from '../views/user/auth/forgotPassword.vue'
import userVerifyCode from '../views/user/auth/verifyRestPass.vue'
import userResetPassword from '../views/user/auth/resetPassword.vue'


// profile
import Profile from '../views/user/profile/profileDetails.vue'
import EditProfile from '../views/user/profile/editProfile.vue'
import ProfileReview from '../views/user/profile/profileReview.vue'
import ProfileChat from '../views/user/profile/profileChat.vue'
import ProfileExperiment from '../views/user/profile/profileExperiment.vue'

import ExperienceDetails from '../views/user/experience/experienceDetails.vue'
import ReviewDetails from '../views/user/review/reviewDetails.vue'


import SearchProduct from '../views/user/searchProduct.vue'
import SearchOffers from '../views/user/searchOffers.vue'
import SearchExperience from '../views/user/searchExperience.vue'


import allOfferUser from '../views/user/allOffer.vue'
import OfferDetailsUser from '../views/user/offers/offerDetails.vue'

import addReview from '../views/user/review/add.vue'
import showReview from '../views/user/review/show.vue'


/**  
 * Supplier
*/
// auth
import supplierLogin from '../views/supplier/auth/login.vue'
import supplierVerifyEmail from '../views/supplier/auth/verifyEmail.vue'
import supplierSignUp from '../views/supplier/auth/signUp.vue'
import supplierForgetPass from '../views/supplier/auth/forgotPassword.vue'
import supplierVerifyCode from '../views/supplier/auth/verifyRestPass.vue'
import supplierResetPassword from '../views/supplier/auth/resetPassword.vue'


import SupplierHome from '../views/supplier/homeSupplier.vue'
import SupplierOffers from '../views/supplier/offers.vue'
import SupplierProducts from '../views/supplier/products.vue'
import SupplierChats from '../views/supplier/chats.vue'
import SupplierComplaints from '../views/supplier/complaints.vue'
import SupplierAbout from '../views/supplier/about.vue'
import SupplierFAQS from '../views/supplier/faqs.vue'
import SupplierContactUs from '../views/supplier/contactUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', name: 'Home', component: Home, meta: { title: 'Home' , middleware: false } },
    
    /**  
     * User
    */
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home', middleware: log } },
    { path: '/about-us', name: 'AboutUs', component: AboutUs, meta: { title: 'About Us' , middleware: log  } },
    { path: '/classification', name: 'Classification', component: Classification, meta: { title: 'Classification' , middleware: log  } },
    { path: '/contact-us', name: 'ContactUs', component: ContactUs, meta: { title: 'Contact Us' , middleware: log  } },
    { path: '/faqs', name: 'FAQs', component: FAQs, meta: { title: 'FAQs' , middleware: log  } },
    { path: '/online-complaint', name: 'OnlineComplaint', component: OnlineComplaint, meta: { title: 'Online Complaint' , middleware: log  } },
    // auth
    { path: '/user-login', name: 'userLogin', component: userLogin, meta: { title: 'Login' , middleware: guest } },
    { path: '/user-signup', name: 'userSignUp', component: userSignUp, meta: { title: 'Sign Up' , middleware: guest  } },
    { path: '/user-verify-email', name: 'userVerifyEmail', component: userVerifyEmail, meta: { title: 'Verify Email' , middleware: guest  } },
    { path: '/user-forget-pass', name: 'userForgetPass', component: userForgetPass, meta: { title: 'Forget Password' , middleware: guest  } },
    { path: '/user-verify-code', name: 'userVerifyCode', component: userVerifyCode, meta: { title: 'Verify Code' , middleware: guest  } },
    { path: '/user-reset-password', name: 'userResetPassword', component: userResetPassword, meta: { title: 'Reset Password' , middleware: guest  } },
    // profile
    { path: '/user-profile', name: 'ProfileDetails', component: Profile, meta: { title: 'Profile Details' , middleware: auth } },
    { path: '/user-edit-profile', name: 'EditProfileDetails', component: EditProfile, meta: { title: 'Edit Profile' , middleware: auth } },
    { path: '/user-review', name: 'ProfileReview', component: ProfileReview, meta: { title: 'Profile Review' , middleware: auth } },
    { path: '/user-chat', name: 'ProfileChat', component: ProfileChat, meta: { title: 'Profile Chat' , middleware: auth } },
    { path: '/user-experiment', name: 'ProfileExperiment', component: ProfileExperiment, meta: { title: 'Profile Experiment' , middleware: auth } },
    // Experience
    { path: '/experiment/:id', name: 'ExperienceDetails', component: ExperienceDetails, meta: { title: 'Experience Details' , middleware: auth } },
    // Review
    { path: '/review/:id', name: 'ReviewDetails', component: ReviewDetails, meta: { title: 'Review Details' , middleware: log } },
    { path: '/add-review/:id', name: 'addReview', component: addReview, meta: { title: 'add Review' , middleware: auth } },
    { path: '/show-review/:id', name: 'showReview', component: showReview, meta: { title: 'show Review' , middleware: log } },
    // Search
    { path: '/search/products', name: 'SearchProduct', component: SearchProduct, meta: { title: 'Search Products' , middleware: log } },
    { path: '/search/offers', name: 'SearchOffers', component: SearchOffers, meta: { title: 'Search Offers' , middleware: log } },
    { path: '/search/experiences', name: 'SearchExperience', component: SearchExperience, meta: { title: 'Search Experience' , middleware: log } },

    // Offer
    { path: '/allOffer', name: 'allOfferUser', component: allOfferUser, meta: { title: 'All Offers' , middleware: log  } },
    { path: '/offer/:id', name: 'OfferDetailsUser', component: OfferDetailsUser, meta: { title: 'Offer Details' , middleware: log  } },


     /**  
     * Supplier
    */

     { path: '/supplier', name: 'SupplierHome', component: SupplierHome, meta: { title: 'Home' , middleware: auth } },

   // auth
      { path: '/supplier-login', name: 'supplierLogin', component: supplierLogin, meta: { title: 'Login' , middleware: guest   } },
      { path: '/supplier-signup', name: 'supplierSignUp', component: supplierSignUp, meta: { title: 'Sign Up' , middleware: guest   } },
      { path: '/supplier-verify-email', name: 'supplierVerifyEmail', component: supplierVerifyEmail, meta: { title: 'Verify Email' , middleware: guest   } },
      { path: '/supplier-forget-pass', name: 'supplierForgetPass', component: supplierForgetPass, meta: { title: 'Forget Password' , middleware: guest   } },
      { path: '/supplier-verify-code', name: 'supplierVerifyCode', component: supplierVerifyCode, meta: { title: 'Verify Code' , middleware: guest   } },
      { path: '/supplier-reset-password', name: 'supplierResetPassword', component: supplierResetPassword, meta: { title: 'Reset Password' , middleware: guest   } },
  
      // offers
      { path: '/supplier/offers', name: 'SupplierOffers', component: SupplierOffers, meta: { title: 'Supplier Offers' , middleware: auth } },
      { path: '/supplier/products', name: 'SupplierProducts', component: SupplierProducts, meta: { title: 'Supplier Products' , middleware: auth } },
      { path: '/supplier/chats', name: 'SupplierChats', component: SupplierChats, meta: { title: 'Supplier Chats' , middleware: auth } },
      
      { path: '/supplier/complaints', name: 'SupplierComplaints', component: SupplierComplaints, meta: { title: 'Supplier Complaints' , middleware: auth } },
      
      { path: '/supplier/about-us', name: 'SupplierAbout', component: SupplierAbout, meta: { title: 'Supplier About Us' , middleware: auth } },
      { path: '/supplier/faqs', name: 'SupplierFAQS', component: SupplierFAQS, meta: { title: 'Supplier FAQS' , middleware: auth } },
      { path: '/supplier/contact-us', name: 'SupplierContactUs', component: SupplierContactUs, meta: { title: 'Supplier Contact Us' , middleware: auth } },
    
  ]
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});




export default router
