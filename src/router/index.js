import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Share from "../views/Share.vue";
import Problem from "../views/Problem.vue";
import MyProblem from "../views/MyProblem.vue";
import Circle from "../views/Circle.vue";
import Shop from "../views/Shop.vue";
import user from "../views/pages/user.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/share",
    name: "share",
    component: Share,
  },
  {
    path: "/problem",
    name: "problem",
    component: Problem,
  },
  {
    path: "/myProblem",
    name: "myProblem",
    component: MyProblem,
  },
  {
    path: "/circle",
    name: "circle",
    component: Circle,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
  {
    path: "/user/:id",
    name: "user",
    component: user,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
