<template>
  <q-page class="column items-center">
    <div class="" v-for="product in products">
      <q-card
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
                      <q-item-section
                        v-if="userState?.user?.id == product.userId"
                        >Remove product</q-item-section
                      >
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
  </q-page>
</template>

<script lang="ts">
import { useUser } from "src/module/useUser";
import { defineComponent, onMounted, ref } from "vue";
import { Product, useProducts } from "src/module/useProducts";

export default defineComponent({
  name: "PageClaimedProducts",
  setup() {
    const { getClaimed } = useUser();
    const products = ref<Product[]>([]);
    onMounted(async () => {
      products.value = await getClaimed();
    });
    const { state: userState } = useUser();
    const { state: productState, claimProduct, unclaimProduct } = useProducts();

    const onClaimProduct = async (productId: number) => {
      if (userState.user) {
        await claimProduct(productId, userState.user.id);
      }
    };

    const onUnclaimProduct = async (productId: number) => {
      await unclaimProduct(productId);
      products.value = products.value.filter(p => p.id !== productId)
    };

    return {
      userState,
      productState,
      onClaimProduct,
      onUnclaimProduct,
      products
    };
  },
});
</script>

<style lang="scss" scoped>
.food-cards {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}
</style>
