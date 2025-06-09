<template>
    <ion-content class="login-page">
        <div class="login-container">
            <div class="image-section">
                <ion-img :src="loginImage" class="login-image" />
            </div>
            <div class="form-section">
                <ion-card class="login-card">
                    <ion-card-header>
                        <img src="@/assets/logo.png" class="logo" />
                        <h2>Geonik</h2>
                        <p>در حال ورود...</p>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-input label="نام کاربری" label-placement="floating" fill="outline"></ion-input>
                        <ion-input label="کلمه عبور" label-placement="floating" fill="outline"
                            type="password"></ion-input>
                        <ion-button expand="block" class="login-button">ورود به سامانه</ion-button>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </ion-content>
</template>

<script setup>
import loginImage from '@/assets/LoginImage.png'
</script>

<style scoped>
.login-page {
    --background: #f4f5f8;
    height: 100%;
}

.login-container {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.image-section {
    flex: 1;
}

.login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background-color: white;
}

.login-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* موبایل: عکس بالا و فرم روی اون */
@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
        position: relative;
    }

    .image-section {
        height: 300px;
    }

    .form-section {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 0 16px;
        background: transparent;
        z-index: 2;
    }

    .login-card {
        margin-top: -50px;
        background: white;
    }
}

.logo {
    max-width: 80px;
    margin: 0 auto;
    display: block;
}
</style>