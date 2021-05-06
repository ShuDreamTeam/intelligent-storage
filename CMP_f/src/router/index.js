import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to)
}

import home from '@/pages/home'
//欢迎界面
import welcome from '@/components/welcome'
//查询界面
import mianBoard from '@/components/mianBoard'
//仓库界面
import mianBoard2 from "@/components/mianBoard2";
//货架重量
import mianBoardWeight from "@/components/mianBoardWeight";
//货架承载直径
import mianBoardDiameter from "@/components/mianBoardDiameter";
//货架信息
import mianBoardShelf from "@/components/mianBoardShelf";
//货架工具入库
import mianBoardInput from "../components/mianBoardInput";
//穿梭车
import shuttleCar from "../components/shuttleCar";
// 移载车
import transferCar from "../components/transferCar";

Vue.use(Router);

export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'home',
		  component: home,
			children:[
				{path: 'welcome',name: 'welcome',component: welcome},
				{path: 'mianBoard',name: 'mianBoard',component: mianBoard},
				{path: 'mianBoard2',name: 'mianBoard2',component: mianBoard2},
				{path: 'mianBoardWeight',name: 'mianBoardWeight',component: mianBoardWeight},
				{path: 'mianBoardDiameter',name: 'mianBoardDiameter',component: mianBoardDiameter},
				{path: 'mianBoardShelf',name: 'mianBoardShelf',component: mianBoardShelf},
				{path: 'mianBoardInput',name: 'mianBoardInput',component: mianBoardInput},
				{path: 'shuttleCar',name: 'shuttleCar',component: shuttleCar},
				{path: 'transferCar',name: 'transferCar',component: transferCar},
			]
		},
		{
			path:'*',
			name:'unkown',
			component:home
		}
  ],
  linkActiveClass: 'is-active',
})
