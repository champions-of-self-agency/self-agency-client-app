import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        meta: {
            requiresAuth: true,
        },
        component: Home
    },
    {
        path: "/chat",
        name: "Chat",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Chat.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/analytics",
        name: "Analytics",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Analytics.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/scene-two",
        name: "SceneTwo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/SceneTwo.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/auth/Login.vue"),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/auth/Register.vue"),
        meta: {
            requiresGuest: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            // Redirect to the Login Page
            next("/login");
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isLoggedIn) {
            // Redirect to the Login Page
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;