<template>
    <ion-content class="login-page">
        <div class="login-wrapper">
            <div class="image-box">
                <ion-img :src="loginImage" class="login-image" />
            </div>

            <ion-card class="login-card">
                <ion-card-header class="text-center">
                    <img src="@/assets/logo.png" class="logo" />
                    <h2>Geonik</h2>
                    <p>در حال ورود...</p>
                </ion-card-header>

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

.logo {
    max-width: 80px;
    margin: 0 auto 12px;
    display: block;
}
</style>