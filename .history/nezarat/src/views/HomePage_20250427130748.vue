<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="showOnMobile mobileDiv d-flex align-center justify-space-between">
        <div style="display: flex; align-items: center; gap: 8px;" class="showOnMobile">
          <div
            style="width: 40px; height: 40px; background-color: #A2845E; text-align: center; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            م‌ا
          </div>
          <div style="display: flex; flex-direction: column;" class="showOnMobile">
            <p style="font-size: 15px; font-weight: 500; margin: 0;" class="showOnMobile">مدیر ارشد</p>
            <p style="font-size: 12px; color: #767E8A; margin: 0;" class="showOnMobile">admin</p>
          </div>
        </div>
        <div class="phone showOnMobile">
          <p class="showOnMobile">09130537010</p>
          <img src="../assets/chevron-left.png" style="margin-right: 10px;" class="showOnMobile" />
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;" class="hideOnMobile">
        <div style="display: flex; align-items: center; gap: 8px;" class="hideOnMobile">
          <img src="../assets/chevron-left.png" style="margin-right: 10px;" class="hideOnMobile" />
          <div style="display: flex; flex-direction: column;" class="hideOnMobile">
            <p style="font-size: 15px; font-weight: 500; margin: 0;" class="hideOnMobile">مدیر ارشد</p>
            <p style="font-size: 12px; color: #767E8A; margin: 0;" class="hideOnMobile">admin</p>
          </div>
          <div
            style="width: 40px; height: 40px; background-color: #A2845E; text-align: center; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            م‌ا
          </div>
        </div>
        <div class="filter-tabs hideOnMobile">
          <ion-segment value="all" @ionChange="segmentChanged" style="background-color: #FFFFFF;" class="hideOnMobile">
            <ion-segment-button value="all" class="hideOnMobile">
              <div style="display: flex;align-items: center;" class="hideOnMobile">
                <ion-label style="margin-left: 3px;" class="hideOnMobile">همه </ion-label>
                <ion-label class="hideOnMobile"
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="cartable" class="hideOnMobile">
              <div style="display: flex;align-items: center;" class="hideOnMobile">
                <ion-label style="margin-left: 3px;" class="hideOnMobile">کارتابل</ion-label>
                <ion-label class="hideOnMobile"
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-left: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="supervised" class="hideOnMobile">
              <div style="display: flex;align-items: center;" class="hideOnMobile">
                <ion-label style="margin-left: 3px;" class="hideOnMobile">نظارت شده</ion-label>
                <ion-label class="hideOnMobile"
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="unsupervised" class="hideOnMobile">
              <div style="display: flex;align-items: center;" class="hideOnMobile">
                <ion-label style="margin-left: 3px;" class="hideOnMobile">نظارت نشده</ion-label>
                <ion-label class="hideOnMobile"
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;margin-left: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
          </ion-segment>
        </div>
        <div class="user-info">
          <div class="role">سامانه جامع حفاری</div>
          <img src="../assets/logo.png" />
        </div>
      </div>
      <ion-card style="background-color: #F8F6F7; padding: 24px;">
        <ion-card-content>
          <DataTable />
        </ion-card-content>
      </ion-card>
      <div class="mobile-header showOnMobile">
        <div class="search-icon">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <div class="title">
          <ion-icon name="document-text-outline"></ion-icon>
          مدیریت کارتابل
        </div>
      </div>

      <div class="page-content">
        <slot />
      </div>
      <div class="mobile-footer showOnMobile">
        <div class="footer-item">
          <!-- <ion-icon :name="Pallet"></ion-icon> -->
          <img src="../assets/pallet.vue" />
          <span>کارتابل</span>
        </div>
        <div class="footer-item">
          <ion-icon :name="Pallet"></ion-icon>
          <span>نظارت شده</span>
        </div>
        <div class="footer-item">
          <ion-icon name="eye-off-outline"></ion-icon>
          <span>نظارت نشده</span>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>
<script setup>
import Pallet from '@/assets/pallet.vue';
import DataTable from '@/components/DataTable.vue';

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
    direction: rtl;
    width: 396px;
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
    margin-top: 80px;
    /* جا برای هدر */
    margin-bottom: 80px;
    /* جا برای فوتر */
  }

  .mobile-header {
    width: 90%;
    height: 55px;
    margin: 10px auto;
    border-radius: 47px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    direction: rtl;
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
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #333;
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
    color: #767E8A;
    font-size: 12px;
  }

  .footer-item ion-icon {
    font-size: 24px;
    margin-bottom: 4px;
  }
}
</style>
