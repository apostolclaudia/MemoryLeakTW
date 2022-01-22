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
        <q-tab>
          <q-btn class="btn-exit" round color="primary" icon="fas fa-sign-out-alt" @click="onLogout()" />
        </q-tab>
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
            v-bind="link"
          />
          <div class="fit row inline justify-center items-center">
            <q-btn class="btn-exit" @click="onLogout()" round color="primary" icon="fas fa-sign-out-alt" />
          </div>
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
import EssentialLink from "components/EssentialLink.vue";

import { defineComponent, ref, onBeforeMount } from "vue";
import { useUser } from "src/module/useUser";
import { useRouter } from "vue-router";
import { getJWT } from "src/module/useJWT";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const { getData, state: userState, logout} = useUser();
    const router = useRouter();
    onBeforeMount(async () => {
      if (getJWT()) {
        const response = await getData();
        if (!response) {
          router.push("/login");
        }
      }
    });


    const usernameFromStorage = localStorage.getItem("username");
    const drawerOpen = ref(false);
    const linksList = [
      {
        title: "Home",
        icon: "home",
        link: "/",
      },
      {
        title: "What's cooking?",
        icon: "fas fa-seedling",
        link: `/cooking/${
          userState.user
            ? userState.user.username
            : usernameFromStorage
            ? usernameFromStorage
            : ""
        }`,
      },
      {
        title: "Friends",
        icon: "fas fa-handshake",
        link: "/friends",
      },
      {
        title: "Add product",
        icon: "fas fa-store",
        link: "/add-product",
      },
      {
        title: "Account",
        icon: "fas fa-user",
        link: "/account",
      },
    ];

    const onLogout = () => {
      logout();
      router.push('/login')
    }
    return {
      essentialLinks: linksList,
      drawerOpen,
      toggleDrawer() {
        drawerOpen.value = !drawerOpen.value;
      },
      onLogout
    };
  },
});
</script>

<style lang="scss">
.header-class {
  font-family: "Roboto";
  font-weight: 700;
}

.stroke-menu {
  background-color: $secondary;
  width: 100%;
  height: 3px;
}

@media only screen and (max-width: 900px) {
  .tabs-class {
    display: none;
  }
}
</style>
