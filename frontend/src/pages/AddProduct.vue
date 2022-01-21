<template>
  <q-page class="column items-center">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        v-model="name"
        label="Product name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type a name']"
      />

      <q-checkbox size="md" keep-color v-model="cbAvailable" label="Available?" color="primary"/>

      <q-input outlined v-model="date" label="Expiration date *" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
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
        :rules="[
           val => val && val.length > 0 || 'Please type a quantity'
        ]"
      />

      <q-select outlined v-model="category" :options="options" label="Category" :rules="[
        val => val && val.length > 0 || 'Please select a category'
      ]"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageAddProduct",
  setup() {
    const $q = useQuasar();

    const name = ref(null)
    const cbAvailable = ref(false)
    const date = ref(null)
    const quantity = ref(null)
    const category = ref(null)

    return {
      name,
      cbAvailable,
      date,
      quantity,
      category,
      options: [
        'Lactate', 'Carne', 'Oleaginoase', 'Congelate'
      ],

      onSubmit () {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
      },

      onReset () {
        name.value = null
        cbAvailable.value = false
        date.value = null
        quantity.value = null
        category.value = null
      }
    }
  }
});
</script>
