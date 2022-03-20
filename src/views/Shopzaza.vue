<template>
  <div>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, index) in productList" :key="index">
            <div class="card shadow-sm bg-secondary">
              <img
                class="p-3"
                :src="item.image"
                style="width: 100%; height: 255px"
                alt=""
              />

              <div class="card-body">
                <p class="card-text text-white">
                  {{ item.title }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-info">
                      BUY
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-info">
                      Edit
                    </button>
                  </div>
                  <h5 class="text-white">{{ item.price }} $</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../plugins/firebaseinit";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      product1: "",
      detail: "display: none",
      table: "display: none",

      show: false,
      productList: [],
    };
  },
  mounted() {
    this.checklogin();
    this.readdata();
  },
  methods: {
    async readdata() {
      const querySnapshot = await getDocs(collection(db, "product"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.productList.push(doc.data());
      });
    },
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
    sumsum() {
      let x = 0;
      for (let index = 0; index < this.carts.length; index++) {
        x += this.carts[index].qty;
      }
      return x;
    },
    showpro: function (index) {
      switch (index) {
        case 0:
          this.product1 = "";
          this.detail = "display: none";
          this.table = "display: none";
          break;
        case 1:
          this.product1 = "display: none";
          this.detail = "";
          this.table = "display: none";
          break;
        case 2:
          this.product1 = "display: none";
          this.detail = "display: none";
          this.table = "";
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.qty-minus {
  cursor: pointer;
  margin-right: 20px;
}
.qty-plus {
  cursor: pointer;
  margin-right: 20px;
}
</style>
