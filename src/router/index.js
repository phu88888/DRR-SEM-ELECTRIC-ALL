import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'dashboard',
    //   component: () => import('@/views/dashboard/Dashboard.vue'),
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/detail/SEMDiagram.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/User.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/lighting-sub',
      name: 'lighting-sub',
      component: () => import('@/views/sublighting/SEMControlSub.vue'),
      meta: {
        // pageTitle: 'LightingSub',
        // requiresAuth: true,
        // breadcrumb: [
        //   {
        //     text: 'Lighting Sub',
        //     active: true,
        //   },
        // ],
      },
    },
    {
      path: '/cctv',
      name: 'cctv',
      component: () => import('@/views/cctv/CCTV.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/resultPCU',
      name: 'resultPCU',
      component: () => import('@/views/resultPCU/resultTable.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('@/views/location/Location.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/location-day',
      name: 'location-day',
      component: () => import('@/views/location/LocationDay.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Log',
      name: 'log',
      component: () => import('@/views/log/Log.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Diagram',
      name: 'diagram',
      component: () => import('@/views/detail/SEMDiagram.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/lighting-sub',
      name: 'lighting-sub',
      component: () => import('@/views/sublighting/SEMControlSub.vue'),
      meta: {},
    },
    {
      path: '/reportsemcontroldaily1p',
      name: 'reportsemcontroldaily1p',
      component: () => import('@/views/detail/ReportSem/ReportSemControlDay1P.vue'),
      meta: {},
    },
    {
      path: '/reportsemcontrol3month',
      name: 'reportsemcontrol3month',
      component: () => import('@/views/detail/ReportSem/ReportSemControlMonth.vue'),
      meta: {},
    },
    {
      path: '/reportsemcontrol3year',
      name: 'reportsemcontrol3year',
      component: () => import('@/views/detail/ReportSem/ReportSemControlYear.vue'),
      meta: {},
    },
    {
      path: '/reportrepair3day',
      name: 'reportrepair3day',
      component: () => import('@/views/detail/ReportSem/ReportRepairDay.vue'),
      meta: {},
    },
    {
      path: '/reportrepair3month',
      name: 'reportrepair3month',
      component: () => import('@/views/detail/ReportSem/ReportRepairMonth.vue'),
      meta: {},
    },
    {
      path: '/reportrepair3year',
      name: 'reportrepair3year',
      component: () => import('@/views/detail/ReportSem/ReportRepairYear.vue'),
      meta: {},
    },

    {
      path: '/TransactionLog',
      name: 'transactionlog',
      component: () => import('@/views/log/TransactionLog.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/semcontrol3p-problem',
      name: 'semcontrol3p-problem',
      component: () => import('@/views/detail/cardDB/SEMControl3Problem.vue'),
      meta: {
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        redirectIfLoggedIn: true,
        layout: 'full',
      },
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/report/ReportMain.vue'),
      meta: {
        // requiresAuth: true,
        // layout: 'full',
        hideFooter: true,
      },
      // ไฟล์ที่ไม่ได้ใช้แล้ว (เปลี่ยนชื่อเป็น .bak แล้ว):
      // Report.vue.bak
      // Report2.vue.bak
      // Report3.vue.bak
      // Report4.vue.bak
      // ReportStatisticCount.vue.bak
      // ReportStatisticCount3.vue.bak
      // ReportP1-LeafletMap.vue.bak
      // Location.vue.bak
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('userData')
    if (!user) {
      next({
        path: '/login',
      })
    // eslint-disable-next-line no-empty
    }
  } if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
    const user = localStorage.getItem('userData')
    if (user) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
  return next()
})
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
