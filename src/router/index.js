import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import DashboardView from '../views/DashboardView.vue';
import ProductView from '../views/ProductView.vue';
import ProductionPlanList from '../views/ProductionPlanList.vue';
import ProductionPlanCreate from '../views/ProductionPlanCreate.vue';
import ProductionApproval from '../views/ProductionApproval.vue';
import ProductionOrders from '../views/ProductionOrders.vue';
import ProductionReport from '../views/ProductionReport.vue';
import ProductionLogs from '../views/ProductionLogs.vue';
import Inventory from '../views/Inventory.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView },

  {
    path: '/',
    component: DefaultLayout, // layout untuk semua halaman login selain login
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'products', name: 'products', component: ProductView, meta: { roles: ['Manager', 'Staff_PPIC'] } },
      { path: 'rencana-produksi', name: 'rencana-produksi', component: ProductionPlanList, meta: { roles: ['Staff_PPIC'] } },
      { path: 'ajukan-produksi', name: 'ajukan-produksi', component: ProductionPlanCreate, meta: { roles: ['Staff_PPIC'] } },
      { path: 'persetujuan-produksi', name: 'persetujuan-produksi', component: ProductionApproval, meta: { roles: ['Manager'] } },
      { path: 'order-produksi', name: 'order-produksi', component: ProductionOrders, meta: { roles: ['Staff_Produksi'] } },
      { path: 'laporan-produksi', name: 'laporan-produksi', component: ProductionReport, meta: { roles: ['Manager', 'Staff_PPIC'] } },
      { path: 'log-produksi', name: 'log-produksi', component: ProductionLogs, meta: { roles: ['Manager', 'Staff_PPIC', 'Staff_Produksi'] } },
      { path: 'inventaris', name: 'inventaris', component: Inventory, meta: { roles: ['Manager', 'Staff_PPIC'] } },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard autentikasi dan role
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    alert('Akses ditolak. Anda tidak memiliki izin untuk halaman ini.');
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
