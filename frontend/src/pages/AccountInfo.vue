<template>
  <q-page>
    <div class="row items-center">
      <div class="col col-label">
        Username:
      </div>
      <div class="col">
        <q-input outlined v-model="text" class="width-input"/>
      </div>
    </div>
    <div class="row items-center">
      <div class="col col-label">
        Email:
      </div>
      <div class="col">
        <q-input outlined v-model="text" class="width-input"/>
      </div>
    </div>
    <div class="row items-center">
      <div class="col col-label">
        First Name:
      </div>
      <div class="col">
        <q-input outlined v-model="text" class="width-input"/>
      </div>
    </div>
    <div class="row items-center">
      <div class="col col-label">
        Last Name:
      </div>
      <div class="col">
        <q-input outlined v-model="text" class="width-input"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue'

export default defineComponent({
  name: "PageAccountInfo",
  setup () {

    const username = ref('username')
    const cbAvailable = ref(false)
    const date = ref(null)
    const quantity = ref(null)
    const category = ref(null)

    return {
      text: ref('@username'),
      dense: ref(false)
    }
  }
});
</script>

<style lang="scss" scoped>
.col-label{
    text-align: right;
}
.width-input{
    width: 5em;
}
</style>