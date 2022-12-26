<template>
    <link rel="stylesheet" href="/assets/css/user/profile_reviews.css">

    <profileNavVue />

    <!-- Navbar & Search Input -->
    <div class="nav__content">
        <div class="nav__list">
            <a href="profile_details.html" class="item">Details</a>
            <a href="profile_reviews.html" class="item active">Reviews</a>
            <a href="profile_chat.html" class="item">Chat</a>
        </div>
        <div class="nav__search">
            <img class="image" src="/assets/images/icon/mag2.png" alt="">
            <form action="" class="search_input">
                <input class="input" type="text" name="search" placeholder="Search......" > 
            </form>
        </div>
    </div>

    <main class="__content">
        
        <div class="reviews__details">
            <div class="item_review">
                <div class="review__up">
                    <div class="contan">
                        <img class="up__img" src="/assets/images/avatar/person1.jpg" alt="">
                        <div class="up__info">
                            <span class="name">Supplier Name</span>
                            <span class="follow">Follow</span>
                        </div>
                        <div class="up__rate">
                            <i class="fa fa-star yellow" aria-hidden="true"></i>
                            <span>4.7</span>
                        </div>
                    </div>
                    <div class="up__time">
                        <span>3 Hours ago</span>
                    </div>
                </div>
                <div class="review_mid">
                    <div class="mid__left">
                        <span class="car">Audi M Sport Dark</span>
                        <span class="edit">2020 - Edition</span>
                    </div>
                    <div class="mid__rigth">
                        <img src="/assets/images/gallary/laborghini_urus.jpg" alt="" class="image">
                    </div>
                </div>
                <div class="review__down">
                    <div class="down__comment">
                        <div class="comment_up">
                            <div class="left">
                                <span class="dot"></span>
                                <span class="text">Year Of Purchase</span>
                            </div>
                        </div>
                        <div class="comment_down">
                            <a href="" class="read no_underline">2020</a>
                        </div>
                    </div>
                    <div class="down__comment">
                        <div class="comment_up">
                            <div class="left">
                                <span class="dot"></span>
                                <span class="text">How Many Cylinders?</span>
                            </div>
                        </div>
                        <div class="comment_down">
                            <a href="" class="read">Read Answer</a>
                        </div>
                    </div>
                    <div class="down__comment custom_height">
                        <div class="comment_up">
                            <div class="left">
                                <span class="dot"></span>
                                <span class="text">Seat Comfort And Quality</span>
                            </div>
                            <div class="right">
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="down__comment">
                        <div class="comment_up">
                            <div class="left">
                                <span class="dot"></span>
                                <span class="text">Save Gas Oli</span>
                            </div>
                            <div class="right">
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="comment_mid">
                            <p class="text">How Much Time Does It Take To Get Spare Parts? Is It From The Agent?</p>
                        </div>
                        <div class="comment_down">
                            <a href="" class="read">Read Answer</a>
                        </div>
                    </div>
                    <div class="down__comment">
                        <div class="comment_up">
                            <div class="left">
                                <span class="dot"></span>
                                <span class="text">Save Gas Oli</span>
                            </div>
                            <div class="right">
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fas fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                                <i class="fal fa-star icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="comment_mid">
                            <p class="text">How Much Do You Spend In Riyals For The Full Gas Tank?</p>
                        </div>
                        <div class="comment_down">
                            <a href="" class="read">Read Answer</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </main>
    <FooterVue />
</template>

<script>
    import profileNavVue from '../../../components/profileNav.vue';
    import FooterVue from '../../../components/Footer.vue';
    export default {
        name: "ProfileReview",
        components:{
            profileNavVue,
            FooterVue
        }
    }
</script>

<style  scoped>

</style>