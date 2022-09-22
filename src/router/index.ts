import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CharactersView from "../views/CharactersView.vue";
import CharacterDetails from "../views/CharacterDetails.vue";
import FavoriteCharacters from "../views/FavoriteCharacters.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "characters",
    component: CharactersView,
    props: (route) => ({ page: parseInt(`${route.query.page}`) || 1 }),
  },
  {
    path: "/character/:id",
    name: "CharacterDetails",
    props: true,
    component: CharacterDetails,
  },
  {
    path: "/favourites",
    name: "favourites",
    component: FavoriteCharacters,
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404",
    component: NotFound,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
