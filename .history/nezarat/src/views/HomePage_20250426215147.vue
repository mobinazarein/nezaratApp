<template>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- هدر بالای صفحه -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="../assets/chevron-left.png" style="margin-right: 10px;" />
          <div style="display: flex; flex-direction: column;">
            <p style="font-size: 15px; font-weight: 500; margin: 0;">مدیر ارشد</p>
            <p style="font-size: 12px; color: #767E8A; margin: 0;">#767E8A</p>
          </div>
          <div
            style="width: 40px; height: 40px; background-color: #A2845E; text-align: center; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            م‌ا
          </div>
        </div>

        <div class="filter-tabs">
          <ion-segment value="all" @ionChange="segmentChanged" style="background-color: #FFFFFF;">
            <ion-segment-button value="all">
              <div style="display: flex; align-items: center;">
                <ion-label>همه</ion-label>
                <ion-label class="segment-badge">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="cartable">
              <div style="display: flex; align-items: center;">
                <ion-label>کارتابل</ion-label>
                <ion-label class="segment-badge">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="supervised">
              <div style="display: flex; align-items: center;">
                <ion-label>نظارت شده</ion-label>
                <ion-label class="segment-badge">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="unsupervised">
              <div style="display: flex; align-items: center;">
                <ion-label>نظارت نشده</ion-label>
                <ion-label class="segment-badge">334</ion-label>
              </div>
            </ion-segment-button>
          </ion-segment>
        </div>
        <!-- </div> -->

        <div class="user-info">
          <div class="role">سامانه جامع حفاری</div>
          <img src="../assets/logo.png" />
        </div>
      </div>

      <!-- باکس سرچ و جدول -->
      <ion-card style="background-color: #F8F6F7; padding: 24px;">
        <div class="filter-bar">
          <img src="../assets/magnify.png" />
          <ion-searchbar v-model="searchQuery" placeholder="جستجو..."
            style="width: 229px; height: 40px; --background: #F8F6F7; --border-radius: 20px; direction: rtl;">
          </ion-searchbar>
        </div>

        <ion-card-content>
          <!-- جدول دیتا -->
          <table class="custom-table">
            <thead style="background-color: #F6F8FA; border: 1px solid #EAF1F2; direction: rtl;">
              <tr style="direction: rtl;">
                <th v-for="(col, index) in columns" :key="index" style="border-left: 1px solid #EAF1F2;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                    {{ col.title }}
                    <template v-if="col.sortable">
                      <ion-icon
                        :icon="sortField === col.value ? (sortOrder === 'asc' ? 'arrow-up-outline' : 'arrow-down-outline') : 'swap-vertical-outline'"
                        @click="sortBy(col.value)" style="cursor: pointer;"></ion-icon>
                    </template>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in sortedItems" :key="item.id">
                <td v-for="(col, index) in columns" :key="index"
                  style="background-color: #FFFFFF; border: 1px solid #0000001A;width: 207px;">
                  <template v-if="col.value === 'operation'">
                    <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
                      <img src="../assets/map.svg" />
                    </ion-button>
                    <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
                      <img src="../assets/Notebook.png" />
                    </ion-button>
                    <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
                      <img src="../assets/arrow.png" />
                    </ion-button>
                    <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
                      <img src="../assets/Clipboard.svg" />
                    </ion-button>
                  </template>
                  <template v-if="col.value === 'drillingNumber'">
                    {{ item[col.value] }}
                    <img src="../assets/eye.png" style="cursor: pointer;" />
                  </template>
                  <template v-else-if="col.sortable">
                    <div @click="sortBy(col.value)" style="cursor: pointer; display: flex; align-items: center;">
                      <span>{{ col.title }}</span>
                      <img v-if="sortField === col.value"
                        :src="sortOrder === 'asc' ? '../assets/sort-default.png ' : '../assets/sort-default.png '"
                        style="width: 20px; height: 20px; margin-left: 4px;" />
                      <img v-else src="../assets/sort-default.png "
                        style="width: 20px; height: 20px; margin-left: 4px;" />
                    </div>
                  </template>

                  <template v-else>
                    {{ item[col.value] }}
                  </template>
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
import { IonPage, IonContent, IonCard, IonCardContent, IonButton, IonCheckbox, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/vue';

const columns = [
  { title: 'عملیات', value: 'operation' },
  { title: 'عنوان', value: 'title' },
  { title: 'تعداد', value: 'count' },
  { title: 'نام تابعه', value: 'subsidiary' },
  { title: 'ارگان', value: 'organization' },
  { title: 'شماره حفاری', value: 'drillingNumber', sortable: true },
];

const Items = ref([
  {
    id: 1,
    operation: 'ویرایش',
    title: 'حفاری A',
    count: 5,
    subsidiary: 'تابعه ۱',
    organization: 'ارگان X',
    drillingNumber: '12345',
  },
  {
    id: 2,
    operation: 'ویرایش',
    title: 'حفاری B',
    count: 10,
    subsidiary: 'تابعه ۲',
    organization: 'ارگان Y',
    drillingNumber: '67890',
  },
]);

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedSegment = ref('all');

const sortField = ref('');
const sortOrder = ref('asc');

const sortedItems = computed(() => {
  let filtered = Items.value.filter(i =>
    i.title.includes(searchQuery.value) || i.drillingNumber.includes(searchQuery.value)
  );

  if (sortField.value) {
    filtered.sort((a, b) => {
      let aValue = a[sortField.value];
      let bValue = b[sortField.value];

      // اگر ستون مورد نظر drillingNumber بود، به عدد تبدیل کنیم
      if (sortField.value === 'drillingNumber') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder.value === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  const start = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
});


const totalPages = computed(() => {
  return Math.ceil(Items.value.length / itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};

const editItem = (item) => {
  console.log('ویرایش آیتم:', item);
};

const segmentChanged = (e) => {
  selectedSegment.value = e.detail.value;
};
</script>

<style scoped>
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

.filter-tabs {
  margin-bottom: 16px;
  width: 500px;
  border: 1px solid #E3E8EF;
  border-radius: 110px;
  background-color: #FFFFFF;
  direction: rtl;
}

.segment-badge {
  background-color: #A2845E66;
  color: #A2845E;
  width: 41px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  font-size: 14px;
  margin-right: 5px;
}

.filter-bar {
  margin-bottom: 16px;
  display: flex;
  align-items: end;
  justify-content: end;
}

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
