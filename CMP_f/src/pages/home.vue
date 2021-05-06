<!--此处为1级页面-->
<template>
	<el-container>
		<el-header>
			<div class="header">
				<div class="headerLeft" @click="onGoHome()"> 
					<h1>CMP管理平台</h1>
				</div>
				<!-- 中英文切换 -->
				<!-- <div class="langBox">
					<el-dropdown size="small" trigger="click">
						<span class="el-dropdown-link">
							{{$t('lang')}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="onChangeLang('zh')">中文</el-dropdown-item>
							<el-dropdown-item @click.native="onChangeLang('en')">English</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div> -->
			</div>    
		</el-header>
		<el-container class="container">
			<el-aside width="auto"  class='homeContent'>
				<el-scrollbar style="height: 100%;">
					<div class="homeLeft" ref="homeLeft">
						<el-menu
							unique-opened
							:default-active="defaultActive"
							class="el-menu-vertical-demo"
							@open="handleOpen"
							@close="handleClose"
							background-color="#ffffff"
							text-color="#8aa4af"
							active-text-color="#ff6c60">
							<ul>
								<li v-for="(item,k1,index) in authConfig" class="menu_one">
									<router-link :to="item.url" v-if="item.url" :key="index">
										<el-menu-item  :index="index.toString()"  @click="onSaveIndex(index,item['ctrName'],'',item['id'])">
											<i style="display: none;">{{index.toString()}}</i>
											<i :class="item['iconFont']"></i>
											<span slot="title">{{item["ctrName"]}}</span>
										</el-menu-item>
									</router-link>
									<el-submenu :index="index.toString()" :key="index" v-else>
										<template slot="title"  :index="index">
											<i :class="item['iconFont']" ></i>
											<span>{{item["ctrName"]}}</span>
										</template>
										<el-menu-item-group v-for="(v2,k2,index2) in item.action" :key="index2">
											<router-link :to="k2">
												<el-menu-item :index="index+'-'+index2" @click="onSaveIndex(index+'-'+index2,item['ctrName'],v2)">
												{{v2}}
												</el-menu-item>
											</router-link>
										</el-menu-item-group>
									</el-submenu>
								</li>
							</ul>
						</el-menu>
					</div>
					
				</el-scrollbar>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {authconfig} from "../config/authConfig";
	export default {
		name: 'home',
		data () {
			return {
				authConfig:authconfig,
				defaultActive:'',
			}
		},
		mounted(){
			this.onNoBack();
			this.$router.push('/welcome');
		},
		methods:{
			handleOpen(key, keyPath) {
			  console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
			  console.log(key, keyPath);
			},
			onNoBack(){
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', function () {
						history.pushState(null, null, document.URL);
				});
			},
			onSetLang(){
				localStorage.getItem('lang') ? this.$i18n.locale = localStorage.getItem('lang') : localStorage.setItem('lang','zh');
			},
			onChangeLang(val){
				this.$i18n.locale=val; //此处val为 zh 或者 en
				localStorage.setItem('lang',val)
			},
			onGoHome(){
				this.defaultActive = '';
				this.$router.push('/welcome');
			},
			onSaveIndex(index){
				if(!isNaN(index)){
					index = index + '';
				}
				this.defaultActive = index;
			},
		},
	}
</script>
<style scoped lang="less">
.el-container{
	width: 100%;
	height: 1080px;
}
.el-header {
	color: #333;
	height: 80px!important;
	line-height: 80px;
	color: #FFFFFF;
}
.container{
	width: 100%;
	height: calc(100% - 80px);
}
.homeContent{
	border-top: 5px solid #e9eaeb;
	box-sizing: border-box;
}
.el-main {
	color: #333;
	width: 100%;
	padding: 5px;
	position: relative;
	background: #e9eaeb;
}
.header{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
}
.headerLeft{
	cursor: pointer;
	width: 200px;
	h1{
		color: #ff6c60;
		font-size: 25px;
	}
}
.menu_one{
	width: 240px;
}
.langBox{
	cursor: pointer;
}
</style>
