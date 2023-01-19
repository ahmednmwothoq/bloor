<template>
    <link rel="stylesheet" href="/assets/css/user/not_found.css">

    <div class="container">
        <div class="row  __body_con">
            <div class="col-md-6 align-self-center">
                <img style="width: 80%;" src="/assets/images/logo/logo_blue.png" alt="Logo Bloor">
            </div>
            <div class="col-md-6 align-self-center">
                <h1>404</h1>
                <h2>UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist.
                How you got here is a mystery. But you can click the button below
                to go back to the homepage.
                </p>
                <button @click="this.$router.push('/')" class="btn green">HOME</button>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.__body_con{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
}
.hamburger-menu {
  position: absolute;
  top: 0;
  left: 0;
  padding: 35px;
  z-index: 2;

  & button {
    position: relative;
    width: 30px;
    height: 22px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

    & span {
      position: absolute;
      height: 3px;
      background: #000;
      width: 100%;
      left: 0px;
      top: 0px;
      transition: 0.1s ease-in;
      &:nth-child(2) {
        top: 9px;
      }
      &:nth-child(3) {
        top: 18px;
      }
    }
  }
  & [data-state="open"] {
    & span {
      &:first-child {
        transform: rotate(45deg);
        top: 10px;
      }
      &:nth-child(2) {
        width: 0%;
        opacity:0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
        top: 10px;
      }
    }
  }
}
nav {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background: #0136EE;
  color: #0136EE;
  width: 300px;
  z-index: 1;
  padding-top: 80px;
  transform: translateX(-100%);
  transition: 0.24s cubic-bezier(.52,.01,.8,1);
  & li {
    transform: translateX(-5px);
    transition: 0.16s cubic-bezier(0.44, 0.09, 0.46, 0.84);
    opacity: 0;
  }
  & a {
    display: block;
    font-size: 1.75em;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    transition: 0.24s ease-in-out;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }
  &[data-state="open"] {
    transform: translateX(0%);
    & ul {
      @for $i from 1 through 4 {
        li:nth-child(#{$i}) {
          transition-delay: 0.16s * $i;
          transform: translateX(0px);
          opacity: 1;
        }
      }
    }
  }
}
.btn {
  z-index: 1;
  overflow: hidden;
  background: transparent;
  position: relative;
  padding: 8px 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  letter-spacing: 2px;
  transition: 0.2s ease;
  font-weight: bold;
  margin: 5px 0px;
  &.green {
    border: 4px solid #0136EE;
    color: #0136EE;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background: #0136EE;
      z-index: -1;
      transition: 0.2s ease;
    }
    &:hover {
      color: #fff;
      background: #0136EE;
      transition: 0.2s ease;
      &:before {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width:768px) {
  body {
    display:block;
  }
  .container {
    margin-top:70px;
    margin-bottom:70px;
  }
}
</style>