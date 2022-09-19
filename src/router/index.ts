import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CharactersView from "../views/CharactersView.vue";
import CharacterDetails from "../views/CharacterDetails.vue";
import FavoriteCharacters from "../views/FavoriteCharacters.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "characters",
    component: CharactersView,
    props: (route) => ({ page: route?.query?.page || 1 }),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
