<template>
	<div class="main flex flex-column flex_center">
		<p>{{message}}</p>
	</div>
</template>
<script>

	export default{
		name:'welcome',
		data(){
			return{
				message:'欢迎使用CMP管理平台',
			}
		},
		mounted(){
			
		},
		methods:{
			
		},
	}
</script>
<style scoped lang="less">
	.main{
		height: 100%;
		text-align: center;
		p{
			font-size: 60px;
			color: #ff6c60;
			font-weight: 700;
		}
	}
</style>