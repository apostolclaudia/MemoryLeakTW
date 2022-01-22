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
        <div class="text-h6">UPDATE ACCOUNT INFO</div>
      </q-card-section>
    </q-card>

    <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top: 30px">

      <q-input
        outlined
        v-model="username"
        label="Username *"
        lazy-rules
        class="fw"
        :rules="[ val => val && val.length > 0 || 'Please type a name']"
      />

      <q-input
        outlined
        v-model="firstName"
        label="First Name *"
        lazy-rules
        class="fw"
        :rules="[
           val => val && val.length > 0 || 'Please type a first name'
        ]"
      />

      <q-input
        outlined
        v-model="lastName"
        label="Last Name *"
        lazy-rules
        class="fw"
        :rules="[
           val => val && val.length > 0 || 'Please type a last name'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" style="width: 110%"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue';
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageAccountInfo",
  setup() {
    const $q = useQuasar();

    const username = ref(null)
    const firstName = ref(null)
    const lastName = ref(null)


    return {
      username,
      firstName,
      lastName,
      onSubmit () {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
      }
    }
  }
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