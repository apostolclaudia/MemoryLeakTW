<template>
  <q-page class="column items-center">
    <q-card
      class="form-title-class text-white text-center"
      round
      flat
      bordered
      style="background: #6ab654"
    >
      <q-card-section>
        <div class="text-h6">ADD PRODUCT</div>
      </q-card-section>
    </q-card>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      style="margin-top: 30px"
    >
      <q-input
        outlined
        v-model="name"
        label="Product name *"
        lazy-rules
        class="fw"
        :rules="[(val) => (val && val.length > 0) || 'Please type a name']"
      />

      <q-checkbox
        size="md"
        keep-color
        v-model="cbAvailable"
        label="Available?"
        class="fw"
        color="primary"
      />

      <q-input
        outlined
        v-model="date"
        label="Expiration date *"
        mask="date"
        class="fw"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat class="fw"/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        outlined
        v-model="quantity"
        label="Quantity *"
        lazy-rules
        class="fw"
        :rules="[(val) => (val && val.length > 0) || 'Please type a quantity']"
      />

      <q-select
        outlined
        v-model="category"
        :options="options"
        label="Category"
        class="fw"
        :rules="[
          (val) => (val && val.length > 0) || 'Please select a category',
        ]"
      />

        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml fw"
        />
        <q-btn label="Submit" type="submit" color="primary" class="fw"/>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { categories } from "src/module/useCategories";
import { useProducts } from "src/module/useProducts";
import { ref } from "vue";
import { defineComponent } from "vue";
import { date } from "quasar";

export default defineComponent({
  name: "PageAddProduct",
  setup() {
    const $q = useQuasar();

    const name = ref("");
    const cbAvailable = ref(false);
    const date = ref("");
    const quantity = ref("");
    const options = categories
    const category = ref(options[0]);

    const { addProduct } = useProducts();

    const onSubmit = async () => {
      await addProduct(
        name.value,
        options.indexOf(category.value) + 1,
        quantity.value,
        date.value,
        cbAvailable.value
      );
    };

    return {
      name,
      cbAvailable,
      date,
      quantity,
      category,
      options,
      onSubmit,
      onReset() {
        name.value = "";
        cbAvailable.value = false;
        date.value = "";
        quantity.value = "";
        category.value = "";
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.form-title-class {
  margin-top: 40px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}
.fw {
  width: 100%;
}
</style>
