import {
  createRouter,
  createWebHistory
} from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
// import ManufakturView from '../views/ManufakturView.vue';
import ProductView from '../views/ProductView.vue';
import ProductionPlanList from '../views/ProductionPlanList.vue';
import ProductionPlanCreate from '../views/ProductionPlanCreate.vue';
import ProductionApproval from '../views/ProductionApproval.vue';
import ProductionOrders from '../views/ProductionOrders.vue';
import ProductionReport from '../views/ProductionReport.vue';
import ProductionLogs from '../views/ProductionLogs.vue';
import Inventory from '../views/Inventory.vue';


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: '/login', // kalau akses kosong diarahkan ke /login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView,
      meta: {
        requiresAuth: true,
        roles: ['Manager', 'Staff_PPIC']
      } // Perbaiki nama peran
    },
    {
      path: '/rencana-produksi',
      name: 'rencana-produksi',
      component: ProductionPlanList,
      meta: {
        requiresAuth: true,
        roles: ['Staff_PPIC']
      } // Perbaiki nama peran
    },
    {
      path: '/ajukan-produksi',
      name: 'ajukan-produksi',
      component: ProductionPlanCreate,
      meta: {
        requiresAuth: true,
        roles: ['Staff_PPIC']
      } // Perbaiki nama peran
    },
    {
      path: '/persetujuan-produksi',
      name: 'persetujuan-produksi',
      component: ProductionApproval,
      meta: {
        requiresAuth: true,
        roles: ['Manager']
      },
    },
    {
      path: '/order-produksi',
      name: 'order-produksi',
      component: ProductionOrders,
      meta: {
        requiresAuth: true,
        roles: ['Staff_Produksi']
      },
    },
    {
      path: '/laporan-produksi',
      name: 'laporan-produksi',
      component: ProductionReport,
      meta: {
        requiresAuth: true,
        roles: ['Manager', 'Staff_PPIC']
      },
    },
    {
      path: '/log-produksi',
      name: 'log-produksi',
      component: ProductionLogs,
      meta: {
        requiresAuth: true,
        roles: ['Manager', 'Staff_PPIC', 'Staff_Produksi']
      },
    },
    {
      path: '/inventaris',
      name: 'inventaris',
      component: Inventory,
      meta: {
        requiresAuth: true,
        roles: ['Manager', 'Staff_PPIC']
      },
    },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth && !token) {
    next({
      name: 'login'
    });
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    alert('Akses ditolak. Anda tidak memiliki izin untuk halaman ini.');
    next({
      name: 'dashboard'
    });
  } else {
    next();
  }
});

export default router;