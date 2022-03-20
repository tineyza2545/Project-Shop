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
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <th class="h3" scope="row">{{ index + 1 }}</th>
          <td class="h3">
            <img :src="item.image" style="height: 35px" alt="" />
            {{ item.title }}
          </td>
          <td class="h3">{{ item.price }} $</td>

          <td class="h3">
            <Button class="btn btn-outline-danger" @click="editdata(index)"
              >Edit</Button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <h1 class="text-danger mt-5">Edit data</h1>
    <form @submit.prevent="summitdata()">
      <div class="container px-4">
        <div class="row gx-5">
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Name</label
            >
            <input
              type="text"
              class="form-control py-3"
              v-model="nameproduct"
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Price</label
            >
            <input
              type="number"
              class="form-control py-3"
              id="exampleInputEmail1"
              v-model="price"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Image Link</label
            >
            <input
              type="text"
              v-model="img"
              required
              class="form-control py-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <button
          class="btn btn-outline-success mt-3 py-3"
          style="font-size: larger"
          type="submit"
        >
          Summit Edit
        </button>
      </div>
    </form>
    <h1 class="text-danger mt-5">Add data</h1>
    <form @submit.prevent="adddata()">
      <div class="container px-4">
        <div class="row gx-5">
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Name</label
            >
            <input
              type="text"
              class="form-control py-3"
              v-model="nameproduct1"
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Price</label
            >
            <input
              type="number"
              class="form-control py-3"
              id="exampleInputEmail1"
              v-model="price1"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col">
            <label for="exampleInputEmail1 " class="form-label h3 text-black"
              >Image Link</label
            >
            <input
              type="text"
              v-model="img1"
              required
              class="form-control py-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <button
          class="btn btn-outline-success mt-3 py-3"
          style="font-size: larger"
          type="submit"
        >
          Summit Edit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../plugins/firebaseinit";
import { collection, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
export default {
  data() {
    return {
      productList: [],
      idproduct: [],
      nameproduct: "",
      price: "",
      img: "",
      nameproduct1: "",
      price1: "",
      img1: "",
      i: "",
    };
  },
  mounted() {
    this.readdata();
  },
  methods: {
    async readdata() {
      const querySnapshot = await getDocs(collection(db, "product"));
      querySnapshot.forEach((doc) => {
        this.productList.push(doc.data());
        this.idproduct.push(doc.id);
      });
    },
    editdata(i) {
      this.nameproduct = this.productList[i].title;
      this.price = this.productList[i].price;
      this.img = this.productList[i].image;
      this.i = i;
    },
    summitdata() {
      setDoc(doc(db, "product", this.idproduct[this.i]), {
        id: this.productList[this.i].id,
        image: this.img,
        price: this.price,
        title: this.nameproduct,
      });
      this.productList = [];
      this.img = "";
      this.price = "";
      this.nameproduct = "";
      this.readdata();
    },
    async adddata() {
      // Add a new document with a generated id.
      await addDoc(collection(db, "product"), {
        id: this.productList.length + 1,
        image: this.img1,
        price: this.price1,
        title: this.nameproduct1,
      });
      this.productList = [];
      this.img1 = "";
      this.price1 = "";
      this.nameproduct1 = "";
      this.readdata();
    },
  },
};
</script>

<style></style>
