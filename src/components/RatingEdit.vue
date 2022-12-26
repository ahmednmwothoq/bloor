<template>
    <div class="rating">
      <ul class="list">
        <li :key="star" v-for="star in maxStars" :class="{ 'active': star <= stars }" @click="rate(star)" class="star">
          <!-- <icon scale="2" :name="star <= stars ? 'star' : 'star-o'"/> -->
          <i :class="star <= stars ? 'fas fa-star' : 'fas fa-star'"></i>
        </li>
      </ul>
      <span v-if="hasCounter">{{ stars }} of {{ maxStars }}</span>
    </div>
</template>

  <script>
    export default {
      props: {
        graded: {
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
        }
      },
      data() {
        return {
          stars: this.graded
        }
      },
      mounted() {
        this.sendRate()
      },
      emits: ["rateEdit"],
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
            this.$emit('rateEdit', this.stars)
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
  }
  .rating span {
    color: #fff;
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
</style>
