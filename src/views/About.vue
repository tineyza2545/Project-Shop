<template>
  <div class="about">
    <div class="card container">
      <div class="floating-text" data-text="Enter Data">Enter Data</div>
      <div class="card-body">
        <div>
          <h1>{{ email }}</h1>
          <h1>{{ uid }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";

export default {
  data() {
    return {
      email: "",
      uid: "",
    };
  },

  mounted() {
    this.checklogin();
  },
  methods: {
    checklogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          // ...แสดงผล user : email , uid ในหน้าจอ
          this.email = user.email;
          this.uid = user.uid;
        } else {
          // User is signed out
          // ...กรณีไม่ได้ login ให้เปลี่ยนไปหน้า login ก่อน
          this.$router.push("/Sign-In");
          alert("Pls Sing-In");
        }
      });
    },
  },
};
</script>

<style></style>
