import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import homePage from '../components/test_Sign.vue'
import Projects from '../components/my_project/MyProject.vue'
import Team from '../components/team/Team.vue'
import Users from '../components/userList.vue'
import { async } from '@firebase/util';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: homePage,
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/team',
    name: 'team',
    component: Team,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      
      reject)
  });
};

router.beforeEach(async(to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()){
      next();
    } else {
      alert("You don't have access");
      next("/")
    }

  } else {
    next();
  }
});

export default router
