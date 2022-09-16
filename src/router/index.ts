import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CharactersView from "../views/CharactersView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "characters",
    component: CharactersView,
  },
  {
    path: "/favourites",
    name: "favourites",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
