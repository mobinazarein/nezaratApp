import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/loginPage.vue";
import DataTable from "@/components/DataTable.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },

  {
  path: '/:id/print-format',
  name: 'PrintFormat',
  component: DataTable,
}

];
// router/index.js
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "ion-activated",
  linkExactActiveClass: "ion-activated",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});

export default router;