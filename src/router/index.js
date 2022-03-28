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
      meta: { title: "Chiara Passaro" },
    },
    {
      path: "/articles/:type",
      name: "articles",
      components: {
        default: HomeView,
        aside: Articles,
      },
      meta: { title: "Chiara Passar - Articles" },
    },
    {
      path: "/projects/:name",
      name: "projects",
      components: {
        default: HomeView,
        aside: Project,
      },
      meta: { title: "Chiara Passaro - Projects" },
    },
  ],
});

export default router;
