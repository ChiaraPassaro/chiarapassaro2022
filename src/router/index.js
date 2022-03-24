import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Aside from "../views/Aside.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: HomeView,
      },
    },
    {
      path: "/articles/:type",
      name: "articles",
      components: {
        default: HomeView,
        aside: Aside,
      },
    },
  ],
});

export default router;
