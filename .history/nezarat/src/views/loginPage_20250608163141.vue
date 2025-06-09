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
                <div
                    style="background-color: #DBDBE4;height: 1px;width: 368px;margin-left: auto;margin-right: auto;text-align: center;">
                </div>
                <ion-card-content>
                    <ion-input label="نام کاربری" label-placement="floating" fill="outline"></ion-input>
                    <ion-input label="کلمه عبور" label-placement="floating" fill="outline" type="password"></ion-input>
                    <ion-button expand="block" class="login-button">ورود به سامانه</ion-button>
                </ion-card-content>
            </ion-card>
        </div>
    </ion-content>
</template>

<script setup>
import loginImage from '@/assets/LoginImage.png'
</script>

<style scoped>
.login-page {
    --background: white !important;
    height: 100%;
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