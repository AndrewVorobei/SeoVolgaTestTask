import { createRouter, createWebHashHistory } from "vue-router";
import ArticlesPage from "../components/ArticlesPage.vue";
import Article from "../components/Article.vue";
import ItemDetails from "../components/ItemDetails.vue";

const routes = [
  { path: "/", component: ArticlesPage, name: "mainPage" },
  { path: "/article/:ingredient", name: "article", component: Article },
  {
    path: "/meal/:id",
    name: "mealDetails",
    component: ItemDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
