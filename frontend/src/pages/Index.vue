<template>
  <q-page class="column justify-center items-center">
    <img alt="LeekIt logo" src="leek2.png" style="width: 300px" />
    <q-card flat bordered class="card-class text-center" color="secondary">
      <!-- <div class="stroke-menu rotate-90"></div> -->
      <q-card-section>
        Why waste food when you can make something new out of it?
      </q-card-section>
    </q-card>
    <q-btn class="btn-main" outline color="secondary" label="What's cooking?" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>

<style lang="scss" scoped>
.btn-main {
  outline: solid;
  margin-top: 50px;
}

.card-class {
  stroke: $secondary;
  stroke-width: 5px;
  margin-top: 50px;
  width: 100%;
  max-width: 250px;
  border-color: $secondary;
  border-width: 3px;
}

// .stroke-menu {
//   background-color: $secondary;
//   width: 30%;
//   height: 2.5px;
//   margin-left: -150px;
// }
</style>
