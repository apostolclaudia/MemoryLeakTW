<template>
  <q-page class="column items-center">
    <q-card
      class="fridge-category-class text-secondary text-center"
      round
      flat
      bordered
      style="background: #ffbdb5"
    >
      <q-card-section v-if="userState.user">
        <div class="text-h6">Fridge of {{ username }}</div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-h6">Loading...</div>
      </q-card-section>
    </q-card>

    <div class="" v-for="(category, index) in categories">
      <q-card
        class="category-class text-white text-center"
        round
        flat
        bordered
        style="background: #6ab654"
      >
        <q-card-section class="food-category-card">
          <div class="text-h6">{{ category }}</div>
        </q-card-section>
      </q-card>
      <div class="" v-for="product in productState.products">
        <q-card
          v-if="product.categoryId == index + 1"
          flat
          bordered
          class="food-cards"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ product.name }}</div>
                <div class="text-subtitle2">{{ product.expirationDate }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="$secondary" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section v-if="userState?.user?.id == product.userId">Remove product</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Share</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ product.quantity }}
          </q-card-section>

          <q-separator />

          <q-card-actions
            v-if="
              userState.user &&
              !product.claimedBy &&
              product.isAvailable &&
              product.userId !== userState.user.id
            "
          >
            <q-btn flat @click="onClaimProduct(product.id)">CLAIM</q-btn>
          </q-card-actions>
          <q-card-actions
            v-else-if="
              userState.user &&
              product.claimedBy &&
              product.claimedBy === userState.user.id
            "
          >
            <q-btn flat @click="onUnclaimProduct(product.id)">UNCLAIM</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useUser } from "src/module/useUser";
import { useProducts } from "src/module/useProducts";
import { categories } from "src/module/useCategories";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "PageCooking",
  setup() {
    const { state: userState } = useUser();
    const {
      state: productState,
      loadProducts,
      claimProduct,
      unclaimProduct,
    } = useProducts();
    const route = useRoute();
    const router = useRouter();
    const username = route.params.username;
    onBeforeMount(async () => {
      try {
        const response = await loadProducts("" + username);
        if (!response) {
          router.push({ name: "404" });
        }
      } catch (error) {}
    });

    const onClaimProduct = async (productId: number) => {
      if (userState.user) {
        await claimProduct(productId, userState.user.id);
      }
    };

    const onUnclaimProduct = async (productId: number) => {
      await unclaimProduct(productId);
    };

    return {
      userState,
      productState,
      categories,
      username,
      onClaimProduct,
      onUnclaimProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-class {
  margin-top: 20px;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}

.fridge-category-class {
  margin-top: 50px;
  width: 300px;
  border-color: $secondary;
  border-width: 2.5px;
}
.food-cards {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}

.fridge-card {
  margin-top: 60px;
}
</style>
