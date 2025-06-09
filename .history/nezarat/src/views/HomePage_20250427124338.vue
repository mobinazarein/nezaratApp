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
        <div class="filter-tabs">
          <ion-segment value="all" @ionChange="segmentChanged" style="background-color: #FFFFFF;">
            <ion-segment-button value="all">
              <div style="display: flex;align-items: center;">
                <ion-label style="margin-left: 3px;">همه </ion-label>
                <ion-label
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="cartable">
              <div style="display: flex;align-items: center;">
                <ion-label style="margin-left: 3px;">کارتابل</ion-label>
                <ion-label
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-left: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="supervised">
              <div style="display: flex;align-items: center;">
                <ion-label style="margin-left: 3px;">نظارت شده</ion-label>
                <ion-label
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
            <ion-segment-button value="unsupervised">
              <div style="display: flex;align-items: center;">
                <ion-label style="margin-left: 3px;">نظارت نشده</ion-label>
                <ion-label
                  style="background-color: #A2845E66;color: #A2845E;width: 41px;height: 31px;display: flex;align-items: center;justify-content: center;border-radius: 40px;font-size:   14px;margin-right: 5px;margin-left: 5px;">
                  334</ion-label>
              </div>
            </ion-segment-button>
          </ion-segment>
        </div>
        <!-- </div> -->
        <!-- </div> -->
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
    </ion-content>
  </ion-page>
</template>
<script setup>
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
  }

  .phone {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
