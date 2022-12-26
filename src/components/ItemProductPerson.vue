<template>
    <div>
        <a style="text-decoration: none;" href="pages/user/reviews.html">
            <!-- <img src="/assets/images/gallary/laborghini_huracan.jpg" alt="" class="slider__img"> -->
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="/assets/images/gallary/laborghini_huracan.jpg" alt="" class="slider__img">
                </div>
                <div class="carousel-item">
                <img src="/assets/images/gallary/laborghini_urus.jpg" alt="" class="slider__img">
                </div>
                <div class="carousel-item">
                <img src="/assets/images/gallary/car_yellow.png" alt="" class="slider__img">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>

            <h2 class="slider__title">2020 Laborghini Huracan</h2>
            <p class="slider__text">
                Lorim lipsumlorim lipsum lo rimlipsum lorim lipsum lorim lipsm, lorim lipsum lorim lorim loromlorimmm.
            </p>
        </a>
        <div class="slider__person">
            <div class="person__info">
                <img src="/assets/images/avatar/person1.jpg" alt="" class="info_img">
                <div class="info_name">
                    <span class="name">Emma Adam</span>
                    <span class="job">news editor</span>
                </div>
            </div>
            <div class="person__rate">
                <i class="fa fa-star yellow" aria-hidden="true"></i>
                <span>4.7</span>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
/* .slider__img {
    width: 100%;
    height: 11.72486vw;
    border-top-left-radius: 50px;
}
.slider__title {
    margin-top: 0.93799vw;
    font-size: 1.71965vw;
    font-weight: normal;
    color: #B1B1B1;
}
.slider__text {
    margin: 1.302762vw 0;
    font-size: 0.88588vw;
    font-weight: lighter;
    color: #B1B1B1;
    width: 90%;
} */
</style>