import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  // 重定向的路由规则
  { path: "/", redirect: "/login" },
  // 登录的路由规则
  { path: "/login", component: Login },
  { path: "/home", component: Home },
];

const router = new VueRouter({
  routes,
});
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  // 如果没有被 return，证明用户想访问有权限的页面
  const tokenStr = window.sessionStorage.getItem("token");
  // 没有 token，强制跳转到登录页
  if (!tokenStr) return next("/login");
  // 有token，直接放行
  next();
});
export default router;
