<template>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand">Various random boxes</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/">
              <a class="nav-link active" aria-current="page" href="#"
                >Home</a
              ></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about">
              <a class="nav-link active" aria-current="About" href="#"
                >About</a
              ></router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/Shop">
              <a class="nav-link active" aria-current="About" href="#"
                >Shop</a
              ></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/cart">
              <a class="nav-link active" aria-current="About" href="#"
                >cart</a
              ></router-link
            >
          </li>
          <li class="nav-item" v-if="uid == '3t55seqXLtbPtB45qtx2xDQJ5CG2'">
            <router-link to="/admin">
              <a class="nav-link active" aria-current="About" href="#"
                >Admin</a
              ></router-link
            >
          </li>

          <li class="nav-item" v-if="login">
            <router-link to="/Sign-In">
              <a class="nav-link active" aria-current="About" href="#"
                >Sign-In</a
              ></router-link
            >
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link active" @click="signOut()" href="#">Logout</a>
          </li>
        </ul>
      </div>
      <!--/.nav-collapse -->
    </div>
  </nav>

  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/Sign-In">Sign-In</router-link>|
    <router-link to="/Shop">Shop</router-link>|
    <button @click="$store.dispatch('logout')">Logout</button>
  </div> -->
  <!-- "3t55seqXLtbPtB45qtx2xDQJ5CG2" -->
  <router-view />
</template>
<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { auth } from "./plugins/firebaseinit";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default {
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
  mounted() {
    this.chackLogin();
  },
  data() {
    return {
      uid: "",
      login: true,
    };
  },
  methods: {
    signOut() {
      //   const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.replace("/Sign-In");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    chackLogin() {
      // const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;

          this.uid = uid;
          console.log(this.uid);
          this.login = false;
          this.readData();
        } else {
          this.login = true;
        }
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700,800");
@import url("https://fonts.googleapis.com/css?family=Lobster");
html {
  font-size: 62.5%;
}

h1 {
  margin-bottom: 0.5em;
  font-size: 3.6rem;
  color: black;
}
p {
  margin-bottom: 0.5em;
  font-size: 1.6rem;
  line-height: 1.6;
}

.overlay::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.header-area {
  position: relative;
  height: 100vh;
  background: #5bc0de;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repear;
  background-size: cover;
}
.banner {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;

  text-align: center;
  z-index: 1;
}
.banner h1 {
  font-weight: 800;
}
.banner p {
  font-weight: 700;
}
.navbar {
  left: 0;
  top: 0;
  padding: 0;
  width: 100%;
  transition: background 0.6s ease-in;
  z-index: 99999;
}
.navbar .navbar-brand {
  font-family: "Lobster", cursive;
  font-size: 2.5rem;
}
.navbar .navbar-toggler {
  position: relative;
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  outline: none;
}
.navbar .navbar-toggler .menu-icon-bar {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 2px;
  background-color: #fff;
  opacity: 0;
  -webkit-transform: translateY(-1px);
  -ms-transform: translateY(-1px);
  transform: translateY(-1px);
  transition: all 0.3s ease-in;
}
.navbar .navbar-toggler .menu-icon-bar:first-child {
  opacity: 1;
  -webkit-transform: translateY(-1px) rotate(45deg);
  -ms-sform: translateY(-1px) rotate(45deg);
  transform: translateY(-1px) rotate(45deg);
}
.navbar .navbar-toggler .menu-icon-bar:last-child {
  opacity: 1;
  -webkit-transform: translateY(-1px) rotate(135deg);
  -ms-sform: translateY(-1px) rotate(135deg);
  transform: translateY(-1px) rotate(135deg);
}
.navbar .navbar-toggler.collapsed .menu-icon-bar {
  opacity: 1;
}
.navbar .navbar-toggler.collapsed .menu-icon-bar:first-child {
  -webkit-transform: translateY(-7px) rotate(0);
  -ms-sform: translateY(-7px) rotate(0);
  transform: translateY(-7px) rotate(0);
}
.navbar .navbar-toggler.collapsed .menu-icon-bar:last-child {
  -webkit-transform: translateY(5px) rotate(0);
  -ms-sform: translateY(5px) rotate(0);
  transform: translateY(5px) rotate(0);
}
.navbar-dark .navbar-nav .nav-link {
  position: relative;

  font-size: 1.6rem;
}
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #fff;
}
.navbar .dropdown-menu {
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
}
.navbar .dropdown-menu .dropdown-item {
  position: relative;
  padding: 10px 20px;

  font-size: 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.2s ease-in;
}
.navbar .dropdown-menu .dropdown-item:last-child {
  border-bottom: none;
}
.navbar .dropdown-menu .dropdown-item:hover {
  background: transparent;
  color: #c0ca33;
}
.navbar .dropdown-menu .dropdown-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 5px;
  background-color: #c0ca33;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.navbar .dropdown-menu .dropdown-item:hover::before {
  opacity: 1;
}
.navbar.fixed-top {
  position: fixed;
  -webkit-animation: navbar-animation 0.6s;
  animation: navbar-animation 0.6s;
  background-color: rgba(0, 0, 0, 0.9);
}
.navbar.fixed-top.navbar-dark .navbar-nav .nav-link.active {
  color: #c0ca33;
}
.navbar.fixed-top.navbar-dark .navbar-nav .nav-link::after {
  background-color: #c0ca33;
}
.content {
  padding: 120px 0;
}
@media screen and (max-width: 768px) {
  .navbar-brand {
    margin-left: 20px;
  }
  .navbar-nav {
    padding: 0 20px;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .navbar.fixed-top .navbar-nav {
    background: transparent;
  }
}
@media screen and (min-width: 767px) {
  .banner {
    padding: 0 150px;
  }
  .banner h1 {
    font-size: 5rem;
  }
  .banner p {
    font-size: 2rem;
  }
  .navbar-dark .navbar-nav .nav-link {
    padding: 23px 15px;
  }
  .navbar-dark .navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    bottom: 15px;
    left: 30%;
    right: 30%;
    height: 1px;
    background-color: #fff;
    -webkit-transform: scaleX(0);
    -ms-transform: scaleX(0);
    transform: scaleX(0);
    transition: transform 0.1s ease-in;
  }
  .navbar-dark .navbar-nav .nav-link:hover::after {
    -webkit-transform: scaleX(1);
    -ms-transform: scaleX(1);
    transform: scaleX(1);
  }
  .dropdown-menu {
    min-width: 200px;
    -webkit-animation: dropdown-animation 0.3s;
    animation: dropdown-animation 0.3s;
    -webkit-transform-origin: top;
    -ms-transform-origin: top;
    transform-origin: top;
  }
}
@-webkit-keyframes navbar-animation {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes navbar-animation {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
@-webkit-keyframes dropdown-animation {
  0% {
    -webkit-transform: scaleY(0);
    -ms-transform: scaleY(0);
    transform: scaleY(0);
  }
  75% {
    -webkit-transform: scaleY(1.1);
    -ms-transform: scaleY(1.1);
    transform: scaleY(1.1);
  }
  100% {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@keyframes dropdown-animation {
  0% {
    -webkit-transform: scaleY(0);
    -ms-transform: scaleY(0);
    transform: scaleY(0);
  }
  75% {
    -webkit-transform: scaleY(1.1);
    -ms-transform: scaleY(1.1);
    transform: scaleY(1.1);
  }
  100% {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
  }
}
</style>
