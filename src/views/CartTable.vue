<template>
  <div class="container">
    <!-- <h1>{{ dataproduct.product[0].count }}</h1> -->
    <table class="table mt-5">
      <thead>
        <tr class="h3">
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Total Price</th>
          <th scope="col">Add/Rub</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in dataproduct.product" :key="index">
          <th class="h3" scope="row">{{ index + 1 }}</th>
          <td class="h3">
            <img :src="item.product.image" style="height: 35px" alt="" />
            {{ item.product.title }}
          </td>
          <td class="h3">{{ item.product.price }} $</td>
          <td class="h3">{{ item.count }}</td>
          <td class="h3">{{ item.count * item.product.price }}$</td>

          <td class="h3">
            <Button class="btn btn-outline-success" @click="Addcountdata(index)"
              >Add</Button
            >
            <Button class="btn btn-outline-info" @click="Rubcountdata(index)"
              >Rub</Button
            >
          </td>
          <td class="h3">
            <Button class="btn btn-outline-danger" @click="deletedata(index)"
              >Delete</Button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../plugins/firebaseinit";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
export default {
  mounted() {
    this.checklogin();
    this.readdata();
  },
  data() {
    return {
      dataproduct: [],
    };
  },
  methods: {
    async readdata() {
      const user = auth.currentUser;
      onSnapshot(doc(db, "datacart", user.uid), (doc) => {
        this.dataproduct = doc.data();
      });
    },
    checklogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          this.email = user.email;
          this.uid = user.uid;
        } else {
          this.$router.push("/Sign-In");
          alert("Pls Sing-In");
        }
      });
    },
    deletedata(i) {
      this.dataproduct.product.splice(i, 1);
      this.setdata();
    },
    Addcountdata(i) {
      this.dataproduct.product[i].count++;
      //   console.log(i);
      this.setdata();
    },
    Rubcountdata(i) {
      this.dataproduct.product[i].count--;
      if (this.dataproduct.product[i].count <= 0) {
        this.dataproduct.product.splice(i, 1);
      }
      this.setdata();
    },
    setdata() {
      const user = auth.currentUser;
      setDoc(doc(db, "datacart", user.uid), {
        product: this.dataproduct.product,
      });
    },
  },
};
</script>

<style></style>
