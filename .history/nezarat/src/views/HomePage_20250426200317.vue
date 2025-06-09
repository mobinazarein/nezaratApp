<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>مدیریت جامع</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="filter-bar">
        <ion-searchbar v-model="searchQuery" placeholder="جستجو..."></ion-searchbar>
        <!-- فیلترهای دیگه اینجا میتونن اضافه بشن -->
      </div>

      <ion-card>
        <ion-card-content>
          <table class="custom-table">
            <thead>
              <tr>
                <th><ion-checkbox @ionChange="toggleAll"></ion-checkbox></th>
                <th>شماره</th>
                <th>نام</th>
                <th>کد</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td><ion-checkbox v-model="item.selected"></ion-checkbox></td>
                <td>{{ item.number }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.code }}</td>
                <td>
                  <ion-button fill="clear" size="small" color="primary">ویرایش</ion-button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <ion-button size="small" @click="prevPage" :disabled="currentPage === 1">قبلی</ion-button>
            صفحه {{ currentPage }} از {{ totalPages }}
            <ion-button size="small" @click="nextPage" :disabled="currentPage === totalPages">بعدی</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonCheckbox, IonSearchbar } from '@ionic/vue';

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const items = ref(Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  number: Math.floor(1000 + Math.random() * 9000),
  name: `کاربر ${i + 1}`,
  code: `کد${i + 1}`,
  selected: false,
}));

const filteredItems = computed(() => {
  const filtered = items.value.filter(i => i.name.includes(searchQuery.value));
  const start = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
})

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage);
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

const toggleAll = (e) => {
  const checked = e.detail.checked;
  filteredItems.value.forEach(item => item.selected = checked);
}
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.filter-bar {
  margin-bottom: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
}

ion-card {
  border-radius: 16px;
}
</style>
