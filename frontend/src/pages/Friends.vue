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
      <div class="fit row inline justify-end items-top">
        <q-input
          filled
          hint="Search new friends"
          v-model="test"
          style="width: 400px"
        />
        <div class="col-12 offset-1 col-md-4">
          <q-btn
            type="submit"
            :loading="submitting"
            label="SEARCH"
            class="q-mt-mb"
            color="green"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
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
          style="width: 130px
          height: 100px"
          behavior="menu"
        />
        <q-btn class="btn-add-friend" color="green" label="Add friend" />
      </div>
    </div>

    <q-btn
      class="btn-friends"
      outline
      color="secondary"
      label="VEGETARIENI"
      to="/group/vegetarieni"
    >
    </q-btn>
    <q-page-container>
      <router-view />
    </q-page-container>
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
  margin-top: 25px;
}

.search-class {
  margin-top: 50px;
  width: 65%;
  background: white;
}

.select-friends-group {
  margin-top: 25px;
}

.btn-add-friend {
  margin-top: 25px;
}

.card-class {
  margin-top: 25px;
  width: 90%;
  height: 200px;
  padding: 10px;
  max-width: 300px;
  border-color: $secondary;
  border-width: 3px;
}
</style>
