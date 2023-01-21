<template>
    <div class="rating">
      <div :class="size">
        <ul class="list">
          <li :key="star" v-for="star in maxStars" :class="{ 'active': star <= stars }" @click="rate(star)" class="star">
            <!-- <icon scale="2" :name="star <= stars ? 'star' : 'star-o'"/> -->
            <i :class="star <= stars ? 'fas fa-star' : 'fas fa-star'"></i>
          </li>
        </ul>
        <span :class="color" v-if="hasCounter">{{ stars }} / {{ maxStars }}</span>
      </div>
    </div>
</template>

  <script>
    export default {
      props: {
        grade: {
          type: Number,
          required: true
        },
        maxStars: {
          type: Number,
          default: 5
        },
        hasCounter: {
          type: Boolean,
          default: true
        },
        color: {
          type: String,
          default: 'whiteColor'
        },
        size: {
          type: String,
          default: 'fs-3'
        }

      },
      data() {
        return {
          stars: this.grade
        }
      },
      mounted() {
        this.sendRate()
      },
      emits: ["rate"],
      methods: {
        rate(star) {
          if (
            typeof star === 'number' &&
            star <= this.maxStars &&
            star >= 0
          )
            this.stars = this.stars === star ? star - 1 : star
            this.sendRate()
        },
        sendRate(){
            this.$emit('rate', this.stars)
        }
      }
    }
  </script>

<style scoped lang="scss">
  $active-color: #f3d23e;

  .rating {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 22px;
    color: #a7a8a8;
    display: flex;
  }
  .rating span {
    margin: auto 1.5vw;
    font-size: 1.5vw;
  }
  .list {
    margin: 0 0 5px 0;
    padding: 0;
    list-style-type: none;
    &:hover {
      .star {
        color: $active-color;
      }
    }
  }
  .star {
    display: inline-block;
    cursor: pointer;
    &:hover {
      &~.star {
        &:not(.active) {
          color: inherit;
        }
      }
    }
  }
  .active {
    color: $active-color;
  }


  /****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .rating {
    font-size: 28px;
    margin: 1vw 0;
  }
  .rating span {
    font-size: 15px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .rating {
    font-size: 28px;
    margin: 1vw 0;
  }
  .rating span {
    font-size: 15px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {}
</style>
