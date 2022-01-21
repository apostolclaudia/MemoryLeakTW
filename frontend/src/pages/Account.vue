<template>
  <q-page>
    <q-layout>
    <q-tabs
        v-model="tab"
        class="text-primary account-tabs-class"
      >
        <q-route-tab
          name="account-info"
          to="/account-info"
          icon="fas fa-user"
          label="Account Info"
          active-class="text-primary"
          exact
        />
        <q-route-tab
          name="claimed-products"
          to="/claimed-products"
          icon="fas fa-shopping-cart"
          label="Claimed products"
          active-class="text-primary"
          exact
        />
      </q-tabs>
    <q-page-container>
      <router-view />
    </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue';

export default defineComponent({
  name: "PageAccount",
  setup () {
    return {
      tab: ref('mails')
    }
  }
});
</script>

<style lang="scss" scoped>
.account-tabs-class {
  width: 100%;
  max-width: 500px;
}
</style>

