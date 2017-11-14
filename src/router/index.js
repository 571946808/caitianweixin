import Vue from 'vue'
import Router from 'vue-router'
import MessageAuthentication from '@/components/MessageAuthentication'
import SetPassword from '@/components/SetPassword'
import RegisterInfo from '@/components/RegisterInfo'
import AnnualCheck from '@/components/AnnualCheck'
import AnnualCheckDetail from '@/components/AnnualCheckDetail'
import Questionnaire from '@/components/Questionnaire'
import QuestionnaireDetail from '@/components/QuestionnaireDetail'
import Login from '@/components/Login'
import Enter from '@/components/Enter'
import EnterDetail from '@/components/EnterDetail'
Vue.use(Router)
// 路由中status为是否验证，type为跳转类型

export default new Router({
  routes: [
    {
      path: '/Login/:type',    // 登录
      name: 'Login',
      component: Login
    },
    {
      path: '/MessageAuthentication/:type/:status',   // 信息认证，type为跳转的路由类型，status为是否经过验证
      name: 'Authentication',
      component: MessageAuthentication
    },
    {
      path: '/SetPassword/:type',   // 密码设置
      name: 'Password',
      component: SetPassword
    },
    {
      path: '/RegisterInfo',
      name: 'RegisterInfo',
      component: RegisterInfo
    },
    {
      path: '/AnnualCheck',   // 年度考核列表
      name: 'AnnualCheck',
      component: AnnualCheck
    },
    {
      path: '/AnnualCheckDetail/:id',   // 年度考核详情
      name: 'AnnualCheckDetail',
      component: AnnualCheckDetail
    },
    {
      path: '/Questionnaire',   // 调查问卷列表
      name: 'Questionnaire',
      component: Questionnaire
    },
    {
      path: '/QuestionnaireDetail/:id',   // 调查问卷详情
      name: 'QuestionnaireDetail',
      component: QuestionnaireDetail
    },
    {
      path: '/Enter',   // 活动报名列表
      name: 'Enter',
      component: Enter
    },
    {
      path: '/EnterDetail/:id',   // 活动报名详情
      name: 'EnterDetail',
      component: EnterDetail
    }
  ]
})
