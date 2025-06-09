<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar color="light">
        <ion-title>مدیریت جامع</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content class="ion-padding">
      <div style="display: flex;align-items: center;justify-content: space-between;">
        <div class="user-info">
          <div class="role">سامانه جامع حفاری</div>
          <img src="../assets/logo.png" />
        </div>
        <div class="filter-tabs">
          <ion-segment value="all" @ionChange="segmentChanged">
            <ion-segment-button value="all">
              <ion-label>همه (334)</ion-label>
            </ion-segment-button>
            <ion-segment-button value="cartable">
              <ion-label>کارتابل (134)</ion-label>
            </ion-segment-button>
            <ion-segment-button value="supervised">
              <ion-label>نظارت شده (134)</ion-label>
            </ion-segment-button>
            <ion-segment-button value="unsupervised">
              <ion-label>نظارت نشده (134)</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
        <div>
          <div style="display: flex;align-items: center;justify-content: center;">
            <p>مدیر ارشد</p>
            <div></div>
          </div>
        </div>
      </div>
      <!-- تب فیلترها -->


      <!-- سرچ -->
      <div class="filter-bar">
        <ion-searchbar v-model="searchQuery" placeholder="جستجو..."></ion-searchbar>
      </div>

      <!-- جدول -->
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

          <!-- صفحه بندی -->
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonCheckbox, IonSearchbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedSegment = ref('all');

const items = ref(Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  number: Math.floor(1000 + Math.random() * 9000),
  name: `کاربر ${i + 1}`,
  code: `کد${i + 1}`,
  selected: false,
})))

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

const segmentChanged = (e) => {
  selectedSegment.value = e.detail.value;
  // اینجا اگه خواستی فیلتر بر اساس تب تغییر بدی بنویس
}
</script>

<style scoped>
/* اطلاعات کاربر */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.role {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.badge {
  background-color: #b8860b;
  color: white;
  border-radius: 50%;
  padding: 6px 10px;
  font-size: 12px;
}

/* تب فیلترها */
.filter-tabs {
  margin-bottom: 16px;
  width: 442px;
}

ion-segment {
  background: #f7f6f4;
  border-radius: 999px;
  padding: 4px;
}

ion-segment-button {
  --background: transparent;
  --color-checked: #333;
  --border-radius: 999px;
  --background-checked: white;
  --indicator-color: transparent;
  --border-color-checked: #b8860b;
  --border-style-checked: solid;
  --border-width-checked: 1px;
}

/* جدول */
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

/* سرچ */
.filter-bar {
  margin-bottom: 16px;
}

/* صفحه بندی */
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
