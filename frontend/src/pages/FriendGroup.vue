<template>
  <q-page class="column items-center"
    ><q-card
      class="category-class text-white text-center"
      round
      flat
      bordered
      style="background: #6ab654"
    >
      <q-card-section class="food-category-card">
        <div class="text-h6">VEGETARIENI</div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="food-cards">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-bold text-center">Username</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn flat size="sm">CHECK OUT FRIDGE</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.category-class {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  border-color: $secondary;
  border-width: 2.5px;
}

.food-cards {
  margin-top: 20px;
  width: 100%;
  max-width: 250px;
  border-color: $secondary;
  border-width: 2.5px;
}
</style>
