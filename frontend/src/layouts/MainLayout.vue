<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-class">
      <q-toolbar class="bg-white text-secondary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm text-secondary"
          @click="toggleDrawer"
        />

        <q-space />
          <q-tabs class="tabs-class" align="left" indicator-color="transparent">
          <q-route-tab
            v-for="link in essentialLinks"
            :key="link.title"
            :to="link.link"
            no-caps
            :label="link.title"
            active-class="text-primary"
            exact
          />
          
        </q-tabs>

      </q-toolbar>
            <div class="stroke-menu"></div>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      class="text-secondary"
    >
    <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//@ts-ignore
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: "What's cooking?",
    icon: 'home',
    link: '/cooking'
  },
  {
    title: 'Friends',
    icon: 'home',
    link: '/friends'
  },
  {
    title: 'Add product',
    icon: 'home',
    link: '/add-product'
  },
  {
    title: 'Users',
    icon: 'home',
    link: '/users'
  },
  {
    title: 'Account',
    icon: 'home',
    link: '/account'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const drawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      drawerOpen,
      toggleDrawer () {
        drawerOpen.value = !drawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss">
.header-class {
  font-family: "Roboto";
  font-weight: 700;
}

.stroke-menu {
  background-color: $secondary;
  width: 100%;
  height: 2.5px;
}

@media only screen and (max-width: 900px) {
  .tabs-class {
    display: none;
  }
}
</style>