import Vue from "vue";
import VueRouter from "vue-router";
import Rank from "components/rank/rank";
import Recommend from "components/recommend/recommend";
import Search from "components/search/search";
import Singer from "components/singer/singer";

Vue.use(VueRouter);

const routes = [
  { path: "/recommend", component: Recommend },
  { path: "/singer", component: Singer },
  { path: "/rank", component: Rank },
  { path: "/search", component: Search }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
