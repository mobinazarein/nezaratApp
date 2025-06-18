<template>
  <ion-page>
    <ion-content>
      <!-- موبایل هدر -->
      <div class="showOnMobile mobileDiv d-flex align-center justify-space-between" style="margin-top:10px">
        <div style="display: flex; align-items: center; gap: 8px; margin:15px !important;" class="showOnMobile">
          <div
            style="width: 40px; height: 40px; background-color: #A2845E; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            م‌ا
          </div>
          <div style="display: flex; flex-direction: column;">
            <p style="font-size: 15px; font-weight: 500; margin: 0;">مدیر ارشد</p>
            <p style="font-size: 12px; color: #767E8A; margin: 0;">admin</p>
          </div>
        </div>
        <div class="phone showOnMobile">
          <p>09130537010</p>
          <img src="../assets/chevron-left.png" style="margin-right: 10px;" />
        </div>
      </div>

      <!-- دسکتاپ هدر -->
      <div style="display: flex; align-items: center; justify-content: space-between;" class="hideOnMobile">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="../assets/chevron-left.png" style="margin-right: 10px;" />
          <div style="display: flex; flex-direction: column;">
            <p style="font-size: 15px; font-weight: 500; margin: 0;">مدیر ارشد</p>
            <p style="font-size: 12px; color: #767E8A; margin: 0;">admin</p>
          </div>
          <div
            style="width: 40px; height: 40px; background-color: #A2845E; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            م‌ا
          </div>
        </div>

        <!-- تب‌ها -->
        <div class="filter-tabs hideOnMobile">
          <ion-segment :value="selectedTab" @ionChange="segmentChanged" style="background-color: #FFFFFF;">
            <ion-segment-button value="all">
              <div style="display: flex; align-items: center;">
                <ion-label style="margin-left: 3px;">همه</ion-label>
                <ion-label style="background-color: #A2845E66; color: #A2845E; width: 41px; height: 31px;
                                  display: flex; align-items: center; justify-content: center;
                                  border-radius: 40px; font-size: 14px; margin-right: 5px;">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="cartable">
              <div style="display: flex; align-items: center;">
                <ion-label style="margin-left: 3px;">کارتابل</ion-label>
                <ion-label style="background-color: #A2845E66; color: #A2845E; width: 41px; height: 31px;
                                  display: flex; align-items: center; justify-content: center;
                                  border-radius: 40px; font-size: 14px; margin-left: 5px;">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="supervised">
              <div style="display: flex; align-items: center;">
                <ion-label style="margin-left: 3px;">نظارت شده</ion-label>
                <ion-label style="background-color: #A2845E66; color: #A2845E; width: 41px; height: 31px;
                                  display: flex; align-items: center; justify-content: center;
                                  border-radius: 40px; font-size: 14px; margin-right: 5px;">334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="unsupervised">
              <div style="display: flex; align-items: center;">
                <ion-label style="margin-left: 3px;">نظارت نشده</ion-label>
                <ion-label style="background-color: #A2845E66; color: #A2845E; width: 41px; height: 31px;
                                  display: flex; align-items: center; justify-content: center;
                                  border-radius: 40px; font-size: 14px; margin: 0 5px;">334</ion-label>
              </div>
            </ion-segment-button>
          </ion-segment>
        </div>

        <div class="user-info">
          <div class="role">سامانه جامع حفاری</div>
          <img src="../assets/logo.png" />
        </div>
      </div>

      <ion-card style="background-color: #F8F6F7; padding: 24px;" class="hideOnMobile">
        <ion-card-content>
          <DataTable v-if="selectedTab === 'all'" :items="[...cartable, ...supervised, ...unsupervised]" />
          <DataTable v-else-if="selectedTab === 'cartable'" :items="cartable" />
          <DataTable v-else-if="selectedTab === 'supervised'" :items="supervised" />
          <DataTable v-else-if="selectedTab === 'unsupervised'" :items="unsupervised" />
        </ion-card-content>
      </ion-card>

      <div class="mobile-header showOnMobile">
        <div class="title">
          <img src="../assets/manage.svg" />
          مدیریت کارتابل
        </div>
        <div class="search-icon">
          <img src="../assets/magnify.png" />
        </div>
      </div>

      <div class="page-content showOnMobile">
        <DataTable v-if="selectedTab === 'all'" :items="[...cartable, ...supervised, ...unsupervised]" />
        <DataTable v-else-if="selectedTab === 'cartable'" :items="cartable" />
        <DataTable v-else-if="selectedTab === 'supervised'" :items="supervised" />
        <DataTable v-else-if="selectedTab === 'unsupervised'" :items="unsupervised" />
      </div>

      <div class="mobile-footer showOnMobile">
        <div class="footer-item">
          <img src="../assets/palette.svg" />
          <span>کارتابل</span>
        </div>
        <div class="footer-item">
          <img src="../assets/ClipboardCheck.svg" />
          <span>نظارت شده</span>
        </div>
        <div class="footer-item">
          <img src="../assets/NotificationLinesRemove.svg" />
          <span>نظارت نشده</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import DataTable from '@/components/DataTable.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const selectedTab = ref('all');

const cartable = ref([]);
const supervised = ref([]);
const unsupervised = ref([]);

const getCartable = async (page = 1) => {
  try {
    const res = await axios.post(`https://dig.mashhad.ir/dig/main/app/lastDarkhastNew/0/0?page=${page}`);
    if (res.data.success) {
      cartable.value = res.data.data;
    }
  } catch {
    cartable.value = [];
  }
};

const getSupervised = async (page = 1) => {
  try {
    const res = await axios.post(`https://dig.mashhad.ir/dig/main/app/lastDarkhastNew/1?page=${page}`);
    if (res.data.success) {
      supervised.value = res.data.data;
    }
  } catch {
    supervised.value = [];
  }
};

const getUnsupervised = async (page = 1) => {
  try {
    const res = await axios.post(`https://dig.mashhad.ir/dig/main/app/lastDarkhastNew/0/1?page=${page}`);
    if (res.data.success) {
      unsupervised.value = res.data.data;
    }
  } catch {
    unsupervised.value = [];
  }
};

const getAll = async () => {
  await getCartable();
  await getSupervised();
  await getUnsupervised();
};

const segmentChanged = (event) => {
  selectedTab.value = event.detail.value;
};

onMounted(() => {
  getAll();
});
</script>

<style scoped>
.card-container {
  position: relative;
  z-index: 10000; 
}
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
  margin-top: 10px;
  margin-bottom: 16px;
  width: 550px;
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

.table-container {
  height: 500px;
  overflow: hidden;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.custom-table thead {
  flex-shrink: 0;
  height: 40px;
}

.custom-table tbody {
  flex-grow: 1;
  overflow-y: auto;
}

.custom-table tr {
  height: 30px !important;
  display: flex;
}

.custom-table th,
.custom-table td {
  flex: 1;
  border: 1px solid #0000001A;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 40px !important;
  /* box-sizing: border-box; */
}

.custom-table tbody tr:nth-child(odd) td {
  background-color: #FFFFFF;
}

.custom-table tbody tr:nth-child(even) td {
  background-color: #F6F8FA;
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

ion-segment {
  background: #f7f6f4;
  border-radius: 999px;
  padding: 4px;
}

ion-segment-button {
  --background: transparent;
  --color-checked:
    #A2854E;
  --border-radius: 999px;
  --background-checked:
    #F8F6F7;
  --indicator-color: transparent;
  --border-color-checked: #b8860b;
  --border-style-checked: solid;
  --border-width-checked: 1px;
}

.showOnMobile {
  display: none;
}

@media(max-width:900px) {
  .hideOnMobile {
    display: none !important;
  }

  .showOnMobile {
    display: block;
  }

  .mobileDiv {
  z-index: 10 !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 15px;
    direction: rtl;
    width: 373px;
    height: 62px;
    border-radius: 47px;
    box-shadow: 10px 10px 32px #00000026;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
  }

  .phone {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: #767E8A;
  }

  .page-content {
    margin-top: 150px;
    margin-bottom: 80px;
  }

  .mobile-header {
    position: fixed;
    top: 12%;
    z-index: 1000;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    /* margin: 10px auto; */
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    direction: rtl;
    box-shadow: 10px 10px 30px #00000026;
  }

  .mobile-header .search-icon {
    background: #A2845E;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .mobile-header .title {
    font-weight: bold;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #1B2559;
  }

  .mobile-footer {
    direction: rtl;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    border: 1px solid #E1E3E3;
    box-shadow: 10px 10px 30px #00000040;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: white;
    height: 70px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #656D82;
    font-size: 12px;
  }

  .footer-item:hover,
  .footer-item:active,
  .footer-item:focus {
    color: #A2845E
  }

  .footer-item img {
    font-size: 24px;
    margin-bottom: 4px;
  }
}
</style>
