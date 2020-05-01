import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Share from "../views/Share.vue";
import Problem from "../views/Problem.vue";
import MyProblem from "../views/MyProblem.vue";
import Circle from "../views/Circle.vue";
import Shop from "../views/Shop.vue";
import user from "../views/pages/user.vue";
import question from "../views/pages/question.vue";
import article from "../views/pages/article.vue";
import test from "../views/pages/test.vue";

import houtai from "../views/houtai/houtai.vue";
import users from "../views/houtai/users.vue";
import subject from "../views/houtai/subject.vue";
import houtai_question from "../views/houtai/question.vue";
import shop from "../views/houtai/shop.vue";
import addQuestion from "../views/houtai/addQuestion.vue";
import editQuestion from "../views/houtai/editQuestion.vue";

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
  {
    path: "/question/:id",
    name: "question",
    component: question,
  },
  {
    path: "/article/:id",
    name: "article",
    component: article,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/houtai",
    name: "houtai",
    redirect: "/houtai/users",
    component: houtai,
    children: [
      {
        path: "users",
        name: "users",
        component: users,
      },
      {
        path: "subject",
        name: "subject",
        component: subject,
      },
      {
        path: "question",
        name: "houtai_question",
        component: houtai_question,
      },
      {
        path: "shop",
        name: "houtai_shop",
        component: shop,
      },
      {
        path: "addQuestion",
        name: "addQuestion",
        component: addQuestion,
      },
      {
        path: "editQuestion/:id",
        name: "editQuestion",
        component: editQuestion,
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
