<template>
    <div>
        <a style="text-decoration: none;">
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
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.slider__img {
    width: 100%;
    height: 11.72486vw;
    border-top-left-radius: 50px;
}
.slider__title {
    margin-top: 0.93799vw;
    font-size: 1.71965vw;
    font-weight: normal;
    color: #6e6e6e;
}
.slider__text {
    margin: 1.302762vw 0;
    font-size: 0.88588vw;
    font-weight: lighter;
    color: #6e6e6e;
    width: 90%;
}
</style>