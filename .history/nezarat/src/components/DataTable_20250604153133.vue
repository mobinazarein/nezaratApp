<template>
  <!-- Desktop Table View -->
  <div class="table-container desktop-view">
    <div class="filter-bar">
      <img src="../assets/magnify.png" />
      <ion-searchbar v-model="searchQuery" placeholder="جستجو..."
        style="width: 229px; height: 40px; --background: #F8F6F7; --border-radius: 20px; direction: rtl;--border:1px solid red">
      </ion-searchbar>
    </div>
    <table class="custom-table">
      <!-- Table content as before -->
      <thead style="background-color: #F6F8FA; border: 1px solid #EAF1F2; ">
        <tr style="">
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
        <tr v-for="item in sortedItems" :key="item.id" style="height: 30px;">
          <td v-for="(col, index) in columns" :key="index"
            style="background-color: #FFFFFF; border: 1px solid #0000001A;width: 207px;height: 32px !important;text-wrap: nowrap;">
            <template v-if="col.value === 'operation'">
              <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
                <img src="../assets/map.svg" />
              </ion-button>
              <ion-button fill="clear" size="small" color="primary" @click="showDialog(item)">
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
                <img v-else src="../assets/sort-default.png " style="width: 20px; height: 20px; margin-left: 4px;" />
              </div>
            </template>
            <template v-else>
              {{ item[col.value] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Mobile Card View -->
  <div class="mobile-view">
    <div class="card-container">
      <div class="card" v-for="item in sortedItems" :key="item.id">
        <div class="title-row">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-date">اتمام 23 فروردین 1403</div>
        </div>

        <div class="subsidiary-row">
          <span class="subsidiary-label">تابعه:</span>
          <span class="subsidiary-value">{{ item.subsidiary }}</span>
        </div>

        <div class="details-row">
          <div class="detail-item">
            <span class="detail-label">حفاری:</span>
            <span class="detail-value">{{ item.drillingNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">ارگان:</span>
            <span class="detail-value">{{ item.organization }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-value">{{ item.count }}</span>
            <span class="detail-label">کنترل انجام شد</span>
          </div>
        </div>
        <div class="actions-row">
          <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
            <img src="../assets/map.svg" />
          </ion-button>
          <ion-button fill="clear" size="small" color="primary" @click="showDialog(item)">
            <img src="../assets/Notebook.png" />
          </ion-button>
          <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
            <img src="../assets/arrow.png" />
          </ion-button>
          <ion-button fill="clear" size="small" color="primary" @click="editItem(item)">
            <img src="../assets/Clipboard.svg" />
          </ion-button>
        </div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <ion-button size="small" fill="clear" @click="prevPage" :disabled="currentPage === 1"
      style="--color: #A2845E; font-size: 14px;">
      <ion-icon :icon="chevronBackOutline" style="font-size: 16px;"></ion-icon>
      قبلی
    </ion-button>

    <div class="page-info">
      صفحه {{ currentPage }} از {{ totalPages }}
    </div>

    <ion-button size="small" fill="clear" @click="nextPage" :disabled="currentPage === totalPages"
      style="--color: #A2845E; font-size: 14px;">
      بعدی
      <ion-icon :icon="chevronForwardOutline" style="font-size: 16px;"></ion-icon>
    </ion-button>
  </div>
  <ion-modal :is-open="dialogOpen" @didDismiss="dialogOpen = false" css-class="custom-dialog"
    :backdrop-dismissible="true" style="border-radius:12px !important">
    <div style="direction:rtl !important;padding:10px;padding-top:30px;">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <img src="../assets/close.svg" @click="dialogOpen = false" style="cursor: pointer;" />
        <div style="display:flex">
          <ion-button fill="clear" class="btn" @click="uploadPictureDialog = true">آپلود تصاویر</ion-button>
          <ion-button fill="clear" class="btn" @click="dialogOpen = false">ذخیره</ion-button>
        </div>
      </div>
      <div style="width:686px;height:1px;background-color:#F0F0F0;margin:10px;margin-left:auto;margin-right:auto"></div>
      <div class="dialog-content">
        <div class="desktop-radio dialogBtn">
          <p>وضعیت ایمنی</p>
        </div>
        <div class="mobile-view main">
          <div class=" dialogBtn">
            <p>وضعیت ایمنی</p>
          </div>
          <div style="display: flex;align-items: center;">
            <p style="font-size: 14px;margin-left: 3px;">ثبت گزارش نظارتی</p>
            <img src="../assets/arrowLeft.svg" />
          </div>
        </div>
        <div v-for="item in dialogItems" :key="item.value">
          <p>{{ item.question }}</p>
          <ion-radio-group>
            <div class="desktop-radio">
              <ion-row>
                <ion-col size="auto">
                  <div class="radio-option">
                    <ion-radio value="yes"></ion-radio>
                    <ion-label>بله</ion-label>
                  </div>
                </ion-col>
                <ion-col size="auto">
                  <div class="radio-option">
                    <ion-radio value="no"></ion-radio>
                    <ion-label>خیر</ion-label>
                  </div>
                </ion-col>
                <ion-col size="auto">
                  <div class="radio-option">
                    <ion-radio value="noUsefull"></ion-radio>
                    <ion-label>کاربردی ندارد</ion-label>
                  </div>
                </ion-col>
                <ion-col size="auto">
                  <div class="radio-option">
                    <ion-radio value="desc"></ion-radio>
                    <ion-label>درج توضیحات</ion-label>
                  </div>
                </ion-col>
              </ion-row>
            </div>

            <!-- mobile -->
            <div class="mobile-radio">
              <div class="radio-option-wrapper">
                <div class="radio-option">
                  <ion-radio value="yes"></ion-radio>
                  <ion-label>بله</ion-label>
                </div>
                <div class="divider"></div>
              </div>
              <div class="radio-option-wrapper">
                <div class="radio-option">
                  <ion-radio value="no"></ion-radio>
                  <ion-label>خیر</ion-label>
                </div>
                <div class="divider"></div>
              </div>
              <div class="radio-option-wrapper">
                <div class="radio-option">
                  <ion-radio value="noUsefull"></ion-radio>
                  <ion-label>کاربردی ندارد</ion-label>
                </div>
                <div class="divider"></div>
              </div>
              <div class="radio-option-wrapper">
                <div class="radio-option">
                  <ion-radio value="desc"></ion-radio>
                  <ion-label>درج توضیحات</ion-label>
                </div>
                <p v-if='item.text' style="color:#C00F0C;text-wrap: nowrap;font-size: 14px;">{{ item.text }}</p>
                <div class="divider"></div>
              </div>
            </div>
          </ion-radio-group>
          <div style="width:100%;height:1px;background-color:#DBDBE4;margin:5px 0"></div>
        </div>
      </div>
    </div>
  </ion-modal>
  <ion-modal :is-open="uploadPictureDialog" @didDismiss="uploadPictureDialog = false" css-class="custom-dialog"
    :backdrop-dismissible="true" style="border-radius:12px !important">
    <div class="desktop-view container">
      <div
        style="display: flex;align-items: center;justify-content: space-between;direction: rtl;margin: 10px;border-bottom: 1px solid #DBDBE4;padding-bottom: 30px;">
        <img src="../assets/close.svg" @click="closeAllDialogs" style="cursor: pointer;" />
        <img src="../assets/arrowLeft.svg" @click="uploadPictureDialog = false" style="cursor: pointer;" />
      </div>
      <p style="direction: rtl;margin-right: 10px;">بارگذاری تصویر حفاری</p>
    </div>
    <div class="mobile-view ">
      <div
        style="display: flex; align-items: center; justify-content: start; direction: rtl; margin: 10px; border-bottom: 1px solid #DBDBE4; padding: 10px 0;">
        <img src="../assets/arrowRight.svg" @click="uploadPictureDialog = false"
          style="cursor: pointer; margin-left: 1px;" />
        <div style="display: flex; flex-direction: column; margin-right: 10px; line-height: 1.2;">
          <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1B2559;">بارگذاری تصویر حفاری</p>
          <p style="margin: 0; font-size: 14px; color: #9E9E9E;">با کلیک تصویر مد نظر را انتخاب نمایید</p>
        </div>
      </div>
    </div>
    <div style="padding: 20px; text-align: center; direction: rtl;">
      <div @click="triggerFileInput"
        style="cursor: pointer; margin: 0 auto; max-width: 500px; height: 200px; border: 2px dashed #A2845E; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;bottom: 50%;">
        <template v-if="!selectedImage">
          <img src="../assets/upload.png" style="width: 60px; height: 60px; margin-bottom: 15px;" />
          <p style="color: #A2845E; font-size: 16px; font-weight: bold; margin: 5px 0;">
            <span style="color: #1B2559;">تصوير</span> حفاري
          </p>
          <p style="color: #9E9E9E; font-size: 14px; margin: 5px 0;">جهت انتخاب كليك كبيد</p>
          <p style="color: #C01515; font-size: 14px; margin: 5px 0;">حداكرة مكايات: 1MB</p>
        </template>
        <div v-else
          style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; padding: 10px;">
          <img :src="selectedImage"
            style="max-width: 100%; max-height: 100%; border-radius: 8px; object-fit: contain;" />
        </div>
      </div>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
      <p style="color: #C00F0C; font-size: 12px; margin-top: 10px;" v-if="fileSizeError">
        حجم فایل بیش از حد مجاز است (حداکثر 5MB)
      </p>
      <ion-button @click="submitImage"
        style="margin-top: 30px; --background: #A2845E; --border-radius: 90px; width: 120px;display: flex;align-items: end;"
        :disabled="!selectedImage || fileSizeError">
        ذخیره
      </ion-button>
    </div>
  </ion-modal>
</template>
<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonContent, IonCard, IonCardContent, IonButton, IonCheckbox, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/vue';
const dialogItems = [
  { question: 'تابلو مشخصات پروژه نصب بوده است؟', text: 'حفاری مشاهده شده در حال حفر میباشد تا زمان پایان نتیجه اعلام میگردد' },
  { question: 'تابلو مشخصات پروژه نصب بوده است؟' },
]
const columns = [
  { title: 'عملیات', value: 'operation' },
  { title: 'عنوان', value: 'title' },
  { title: 'تعداد', value: 'count' },
  { title: 'نام تابعه', value: 'subsidiary', width: "230px" },
  { title: 'ارگان', value: 'organization' },
  { title: 'شماره حفاری', value: 'drillingNumber', sortable: true },
];

const Items = ref([
  {
    id: 1,
    title: '346828',
    count: 5,
    subsidiary: 'مديريت بهره برداري آب و فاضلاب منطقه 2',
    organization: 'آب و فاضلاب',
    drillingNumber: '12345',
  },
  {
    id: 2,
    title: 'مجموعه ورزشی 17شهریور شمالی 1',
    count: 10,
    subsidiary: 'تابعه ۲',
    organization: 'ارگان Y',
    drillingNumber: '67890',
  },
]);
const uploadPictureDialog = ref(false);
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
const closeAllDialogs = () => {
  uploadPictureDialog.value = false;
  dialogOpen.value = false
};
const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};
const dialogOpen = ref(false);
const editItem = (item) => {
  console.log('ویرایش آیتم:', item);
};
const showDialog = (item) => {
  dialogOpen.value = true
};
// const uploadPictureDialog = defineProps({
//   isOpen: Boolean
// });

const emit = defineEmits(['update:isOpen', 'upload']);

const fileInput = ref(null);
const selectedImage = ref(null);
const fileSizeError = ref(false);
const uploadedFile = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    fileSizeError.value = true;
    selectedImage.value = null;
    uploadedFile.value = null;
    return;
  }

  fileSizeError.value = false;
  uploadedFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const submitImage = () => {
  if (uploadedFile.value && !fileSizeError.value) {
    emit('upload', uploadedFile.value);
    closeDialog();
  }
};

const closeDialog = () => {
  emit('update:isOpen', false);
  selectedImage.value = null;
  fileSizeError.value = false;
  uploadedFile.value = null;
};
</script>
<style scoped>
.main {
  display: none;
}

.container {
  display: flex;
  flex-direction: column !important;
}

.dialogBtn {
  width: 95px !important;
  height: 32px !important;
  background-color: #A2845E33 !important;
  color: #A2845E !important;
  font-size: 11px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 38px !important
}

.mobile-radio {
  display: none !important;
}

.horizontal-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  text-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100px;
  height: 40px;
  border-radius: 90px;
  padding: 10px 16px;
  font-size: 14px;
  background-color: #A2845E
}

.mobile-view {
  display: none;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  /* border-bottom: 1px solid #f0f0f0; */
}

.card-row:last-child {
  border-bottom: none;
}

.card-label {
  font-weight: bold;
  font-weight: 700;
  color: #1B2559;
  flex: 1;
}

.card-value {
  flex: 2;
  text-align: left;
}

.card-item {
  color: #656D82;
  font-size: 12px
}

.mobile-view {
  display: none
}

@media (max-width: 900px) {
  .main {
    box-shadow: 5px 5px 30px #00000026 !important;
    width: 350px;
    height: 54px;
    border-radius: 47px;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 10px;
  }

  .radio-option-wrapper {
    padding: 5px;
    border-bottom: 1px solid #DBDBE480;
  }

  .desktop-radio {
    display: none !important;
  }

  .mobile-radio {
    display: block !important;
  }

  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .filter-bar {
    justify-content: center;
  }

  .pagination {
    flex-direction: column;
    gap: 16px;
  }
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


.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  direction: rtl;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.card-date {
  background-color: #FDECEE;
  color: #EF4056;
  font-size: 12px;
  border-radius: 30px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
}

.subsidiary-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.subsidiary-label {
  color: #666;
  margin-left: 4px;
}

.subsidiary-value {
  font-weight: 500;
}

.details-row {
  display: flex;
  justify-content: start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  color: #666;
  margin: 0 4px;
  font-size: 14px;
}

.detail-value {
  font-weight: 500;
  font-size: 14px;
}

.actions-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}
</style>