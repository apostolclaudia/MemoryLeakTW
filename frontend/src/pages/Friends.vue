<template>
  <q-page class="column items-center">
    <form @submit.prevent="onSearch" class="search-class">
      <div class="fit row inline justify-end items-top">
        <q-input
          filled
          hint="Search new friends"
          v-model="query"
          style="width: 400px"
        />
        <div class="col-12 offset-1 col-md-4">
          <q-btn
            type="submit"
            label="SEARCH"
            class="q-mt-mb"
            color="green"
            @click="onSearch"
          />
        </div>
      </div>
    </form>

    <div class="fit row inline justify-center items-top">
      <q-card flat bordered class="card-class text-center">
        <q-card-section
          v-for="user in users"
          :key="user.id"
          class="clickable"
          @click="selectUser(user.id)"
        >
          <b v-if="user.id == friendSelected">{{ user.username }}</b> <span v-else>{{ user.username }}</span></q-card-section
        >
      </q-card>
    </div>
    <q-select
      class="select-friends-group"
      outlined
      v-model="group"
      label="Category"
      :options="userState.groups"
      style="width: 130px; height: 100px"
      behavior="menu"
    />

    <q-btn class="btn-add-friend" color="green" label="Add friend" @click="onAddFriend" />

    <q-input
      class="input-group"
      outlined
      v-model="groupName"
      label="Group name"
      style="width: 130px; height: 100px"
    />
    <div class="col-12 offset-1 col-md-7">
      <q-btn
        class="btn-add-friend"
        color="green"
        label="Add group"
        @click="onAddGroup"
      />
    </div>

    <q-btn
      v-for="group in userState.groups"
      class="btn-friends"
      outline
      color="secdary"
      :label="group"
      :to="'/group/' + group"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<script lang="ts">
import { User, useUser } from "src/module/useUser";
import { defineComponent, ref, computed, onBeforeMount } from "vue";
export default defineComponent({
  setup() {
    const query = ref("");
    const groupName = ref("");
    const group = ref<number | null>(null);
    const { searchUsers, state: userState, createGroup, addFriend } = useUser();
    const users = ref<User[]>([]);
    const friendSelected = ref<number | null | undefined>(null);
    const onSearch = async () => {
      const response = await searchUsers(query.value);
      if (response) {
        users.value = response;
      }
    };

    const onAddGroup = async () => {
      await createGroup(groupName.value);
    };

    const onAddFriend = async () => {
      addFriend(group.value ?? 0, friendSelected.value ?? 0)
    }

    const selectUser = (id: number) => {
      friendSelected.value = users.value.find(u => u.id === id)?.id
    };

    return {
      query,
      groupName,
      onSearch,
      userState,
      group,
      users,
      onAddGroup,
      selectUser,
      onAddFriend,
      friendSelected
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-friends {
  margin-top: 20px;
}

.search-class {
  margin-top: 10px;
  width: 65%;
  background: white;
}

.select-friends-group {
  margin-top: 25px;
}

.btn-add-friend {
  margin-top: 25px;
}

.input-group {
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
