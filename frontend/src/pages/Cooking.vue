<template>
  <q-page class="column items-center">
    <!-- <img alt="Quasar logo" src="leek2.png" style="height: 200px" /> -->

    <q-card
      class="category-class text-white text-center"
      round
      flat
      bordered
      style="background: #6ab654"
    >
      <q-card-section>
        <div class="text-h6">LACTATE</div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="food-cards">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">LAPTE</div>
            <div class="text-subtitle2">Expiration date: 25/01/2022</div>
          </div>

          <div class="col-auto">
            <q-btn color="$secondary" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Remove product</q-item-section>
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
        {{ lorem }}
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat>CLAIM</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageCooking",
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
});
</script>

<style lang="scss" scoped>
.category-class {
  margin-top: 80px;
  width: 100%;
  max-width: 400px;
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
</style>
