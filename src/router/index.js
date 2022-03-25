import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Articles from "../views/Articles.vue";
import Project from "../views/Project.vue";

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
        aside: Articles,
      },
    },
    {
      path: "/projects/:name",
      name: "projects",
      components: {
        default: HomeView,
        aside: Project,
      },
    },
  ],
});

export default router;
