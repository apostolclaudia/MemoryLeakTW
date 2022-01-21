<template>
  <q-page class="column items-center">
    <!-- <q-input
      class="search-class"
      v-model="search"
      filled
      type="search"
      hint="Search new friends"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input> -->

    <form @submit.prevent="simulateSubmit" class="search-class">
      <q-input filled hint="Search new friends" v-model="test" />
      <div class="row justify-end">
        <q-btn
          type="submit"
          :loading="submitting"
          label="SEARCH"
          class="q-mt-md"
          color="green"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </form>

    <div class="fit row inline justify-center items-top">
      <div class="col-12 offset-2 col-md-4">
        <q-card flat bordered class="card-class text-center">
          <q-card-section> @claudiaanic </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-select
          class="select-friends-group"
          outlined
          v-model="category"
          label="Category"
          :options="options"
          style="width: 200px"
          behavior="menu"
        />
      </div>
    </div>

    <q-btn class="btn-friends" outline color="secondary" label="VEGETARIENI" />
    <q-btn
      class="btn-friends"
      outline
      color="secondary"
      label="ZACUSCA LOVERS"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
  setup() {
    const test = defineComponent("");
    const submitting = defineComponent(false);
    const category = ref(null);

    function simulateSubmit() {
      submitting.value = true;
      setTimeout(() => {
        submitting.value = false;
      }, 3000);
    }
    return {
      test,
      submitting,
      simulateSubmit,
      category,
      options: ["Vegetarieni", "Zacusa lovers", "New group"],
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-friends {
  margin-top: 20px;
}

.search-class {
  margin-top: 50px;
  width: 65%;
  background: white;
}

.card-class {
  width: 90%;
  height: 200px;
  padding: 10px;
  max-width: 300px;
  border-color: $secondary;
  border-width: 3px;
}
</style>
