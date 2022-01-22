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
        <div class="text-h6">SIGN UP</div>
      </q-card-section>
    </q-card>

    <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top: 30px">
      <q-input
        outlined
        v-model="username"
        label="Username *"
        lazy-rules
        style="width: 100%"
        :rules="[(val) => (val && val.length > 0) || 'Please type a name']"
      />

      <q-input
        outlined
        v-model="email"
        label="Email *"
        lazy-rules
        style="width: 100%"
        :rules="[
          (val) => (val && val.length > 0) || 'Please type a first name',
        ]"
      />

      <q-input
        outlined
        v-model="password"
        type="password"
        label="Password *"
        lazy-rules
        style="width: 100%"
        :rules="[(val) => (val && val.length > 0) || 'Please type a last name']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" style="width: 110%"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUser } from "src/module/useUser";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "PageAccountInfo",
  setup(props, {}, ) {
    const $q = useQuasar();
    const router = useRouter();

    const username = ref('');
    const email = ref('');
    const password = ref('');

    const {register} = useUser()

    const onSubmit = async () => {
      const result = await register(username.value, email.value, password.value)
      if(result) {
        router.push('/login')
      }
    }

    return {
      username,
      email,
      password,
      onSubmit,
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
</style>
