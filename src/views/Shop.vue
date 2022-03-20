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
                    <button
                      type="button"
                      @click="adddata(index)"
                      class="btn btn-sm btn-outline-info"
                    >
                      BUY
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
import { doc, setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
export default {
  data() {
    return {
      show: false,
      productList: [],
      dataproduct: [],
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
        this.productList.push(doc.data());
      });
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
    sumsum() {
      let x = 0;
      for (let index = 0; index < this.carts.length; index++) {
        x += this.carts[index].qty;
      }
      return x;
    },

    adddata(i) {
      // Add a new document in collection "cities"
      if (this.dataproduct.product.length == 0) {
        const user = auth.currentUser;
        setDoc(doc(db, "datacart", user.uid), {
          product: [
            {
              idproduct: this.productList[i].id,
              product: this.productList[i],
              count: 1,
            },
          ],
        });
      } else {
        let x = true;
        for (let j = 0; j < this.dataproduct.product.length; j++) {
          if (this.dataproduct.product[j].idproduct == this.productList[i].id) {
            this.dataproduct.product[j].count++;

            x = false;
          }
        }
        if (x) {
          this.dataproduct.product.push({
            idproduct: this.productList[i].id,
            product: this.productList[i],
            count: 1,
          });
        }

        const user = auth.currentUser;
        setDoc(doc(db, "datacart", user.uid), {
          product: this.dataproduct.product,
        });
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
