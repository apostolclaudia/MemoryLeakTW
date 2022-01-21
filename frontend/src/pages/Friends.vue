<template>
  <q-page class="column items-center">
    <q-input
      class="search-class"
      v-model="search"
      filled
      type="search"
      hint="Search new friends"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-card flat bordered class="card-class text-center" color="secondary">
      <!-- <div class="stroke-menu rotate-90"></div> -->
      <q-card-section> @claudiaanic </q-card-section>
    </q-card>

    <q-card
      class="category-class text-white text-center"
      round
      flat
      bordered
      style="background: #6ab654"
    >
      <q-card-section>
        <div class="text-h6">VEGETARIENI</div>
      </q-card-section>
    </q-card>
    <q-card
      class="category-class2 text-white text-center"
      round
      flat
      bordered
      style="background: #6ab654"
    >
      <q-card-section>
        <div class="text-h6">ZACUSCA LOVERS</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>

<style lang="scss" scoped>
.category-class {
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}

.category-class2 {
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}

.search-class {
  margin-top: 80px;
  width: 65%;
  background: white;
}

.card-class {
  stroke: $secondary;
  stroke-width: 5px;
  margin-top: 10px;
  width: 50%;
  max-width: 300px;
  border-color: $secondary;
  border-width: 3px;
}
</style>
