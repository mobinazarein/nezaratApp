<template>
    <ion-row>
        <ion-col size="6" size-md="12" class="ion-align-items-center ion-justify-content-center">
            <ion-img :src="loginIcon" alt="Login Image"></ion-img>
            <ion-card style="width: 450px;">
                iosjfi
            </ion-card>
        </ion-col>
    </ion-row>
</template>

<script setup>
import loginIcon from '@/assets/LoginImage.png'
</script>

<style scoped>
ion-row,
ion-col {
    display: flex;
}

ion-img {
    max-width: 100%;
    height: auto;
}
</style>