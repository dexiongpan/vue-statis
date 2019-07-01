import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Table from '@/views/nav1/Table.vue'
import ContentCount from '@/views/nav1/ContentCount.vue'
import Test from '@/views/nav1/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    // { path: '/main', component: Main },
    {
      path: '/',
      name: '统计管理',
      iconCls: 'el-icon-message',
      component: Home,
      children: [
        { path: '/main', component: Main, name: '主页',hidden:true },
        { path: '/table', component: Table, name: '工作量统计' },
        { path: '/content', component: ContentCount, name: '内容统计' },
        { path: '/test', component: Test, name: '测试界面' }
    ]
    }
  ]
})
