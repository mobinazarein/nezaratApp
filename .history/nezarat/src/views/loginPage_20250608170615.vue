<template>
    <ion-content class="login-page">
        <div class="login-wrapper">
            <div class="image-box">
                <ion-img :src="loginImage" class="login-image" />
            </div>

            <ion-card class="login-card">
                <div class="header-box">
                    <img src="@/assets/logo.png" class="logo" />
                    <div style="display: flex;flex-direction: column;align-items: start;justify-content: start;">
                        <div class="geonik-title">
                            <h2>Geonik</h2>
                            <h1>SDI</h1>
                        </div>
                        <p class="subtext">پنل ممیزکاران</p>
                    </div>
                </div>
                <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
                    <div style="background-color: #DBDBE4;height: 1px;width: 368px;text-align: center !important;">
                    </div>
                </div>
                <!-- <ion-card-content> -->
                <ion-input label="نام کاربری" label-placement="floating" fill="outline"
                    style="--border-radius: 15px;margin-bottom: 15px;margin-top: 20px;">
                    <ion-icon slot="start" :icon="personOutline" aria-hidden="true"></ion-icon>
                    <!-- <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon> -->
                </ion-input>


                <!-- <div class="input-wrapper">
                        <ion-input label="کلمه عبور" label-placement="floating" fill="outline" type="password"
                            style="--border-radius: 15px">
                            <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon> 
                        </ion-input>
                    </div> -->
                <ion-input fill="outline" label-placement="stacked" label="کلمه عبور" style="--border-radius: 15px;">
                    <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
                    <ion-button fill="clear" slot="end" aria-label="Show/hide">
                        <ion-icon slot="icon-only" :icon="eye" aria-hidden="true"></ion-icon>
                    </ion-button>
                </ion-input>
                <ion-button expand="block" class="login-button">ورود به سامانه</ion-button>
                <!-- </ion-card-content> -->
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <p style="font-size: 12px !important;">کلمه عبور خودرا فراموش کرده اید؟</p>
                    <ion-item lines="none" class="custom-checkbox" style="direction: rtl;">
                        <ion-label style="font-size: 14px;white-space: nowrap !important;">مرا به خاطر بسپار</ion-label>
                        <ion-checkbox slot="start" v-model="checked"></ion-checkbox>
                    </ion-item>
                </div>

            </ion-card>
        </div>
    </ion-content>
</template>

<!-- <script setup>
import loginImage from '@/assets/LoginImage.png'
import { lockClosed } from 'ionicons/icons';

</script> -->
<script setup>
import loginImage from '@/assets/LoginImage.png'
import { IonButton, IonIcon, IonInput } from '@ionic/vue'
import { eye, lockClosed, personOutline } from 'ionicons/icons'
</script>

<style scoped>
.login-page {
    --background: white !important;
    height: 100%;
}

.custom-checkbox {
    --background: transparent !important;
    --inner-padding-end: 0;
    --inner-padding-start: 0;
    --padding-start: 0;
    --padding-end: 0;
    --min-height: unset;
    --highlight-color-focused: transparent;
    --ripple-color: transparent;
    margin-bottom: 8px;
    align-items: center;
}

.login-wrapper {
    display: flex;
    flex-direction: row;
    gap: 24px;
    padding: 24px;
    justify-content: center;
    align-items: stretch;
    height: 100%;
    box-sizing: border-box;
}

.image-box {
    width: 912px;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    flex-shrink: 0;
}

.login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
}

.login-card {
    flex: 1;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* متن و لوگو */
.header-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 113.86px;
    height: 113.86px;
    margin: 0;
}

.geonik-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
}

.geonik-title h2 {
    font-size: 50px;
    font-weight: 700;
    color: #36405C;
    margin: 0;
}

.geonik-title h1 {
    font-size: 10.93px;
    font-weight: 700;
    color: #36405C;
    margin-top: 24px;
}

.subtext {
    font-size: 13px;
    margin: 0;
    padding: 0;
    font-weight: 700;
    color: #36405C;
}



ion-input {
    direction: rtl;
    text-align: right;
}

/* موبایل */
@media (max-width: 912px) {
    .login-wrapper {
        flex-direction: column;
        padding: 16px;
        position: relative;
    }

    .image-box {
        width: 100%;
        height: 300px;
    }

    .login-card {
        position: absolute;
        bottom: 16px;
        left: 16px;
        right: 16px;
        margin: 0 auto;
        height: auto;
        z-index: 2;
        background: white;
    }
}
</style>