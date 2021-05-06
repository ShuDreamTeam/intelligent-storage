<template>
	<div class="main">
		<div class="title">
			货架设计承载直径区间信息
		</div>
		<div class="flex flex_end">
			<el-button type="primary" @click="createButton">新增</el-button>
			<el-dialog title="新增货架设计承载直径区间" :visible.sync="dialogFormVisible">
			  <el-form :model="form" :rules="rules">
				<el-form-item label="最小直径" :label-width="formLabelWidth" prop="min_dia">
				  <el-input v-model.number="form.min_dia" autocomplete="off" placeholder="货架最小工具直径(外径)，单位：mm"></el-input>
				</el-form-item>
				<el-form-item label="最大直径" :label-width="formLabelWidth" prop="max_dia">
				  <el-input v-model.number="form.max_dia" autocomplete="off" placeholder="货架最大工具直径(外径)，单位：mm"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth">
				  <el-input v-model="form.comment" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelButton">取 消</el-button>
				<el-button type="primary" @click="createDiameterInfo">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<div>
			<el-table
				:data="tableData"
				style="width: 100%">
				<el-table-column
				  label="创建时间"
				  width="250"
				  >
				  <template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.data }}</span>
				  </template>
				</el-table-column>
				<el-table-column
				  label="最小直径(单位：mm)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.min_dia }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="最大直径(单位：mm)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.max_dia }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="备注"
				  >
				  <template slot-scope="scope">
					<span>{{ scope.row.comment }}</span>
				  </template>
				</el-table-column>
				<el-table-column label="操作">
				  <template slot-scope="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					  <el-dialog title="编辑货架设计承载工具直径区间(外径)" :visible.sync="dialogFormUpdateVisible">
						<el-form :model="updateForm" :rules="rules">
							<el-form-item label="货架最小工具直径(单位：mm)" :label-width="formLabelWidth" prop="min_dia">
							  <el-input v-model.number="updateForm.min_dia" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="货架最大工具直径(单位：mm)" :label-width="formLabelWidth" prop="max_dia">
							  <el-input v-model.number="updateForm.max_dia" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="备注" :label-width="formLabelWidth">
							  <el-input v-model="updateForm.comment" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelUpdateButton">取 消</el-button>
							<el-button type="primary" @click="updateDiameterInfo">确 定</el-button>
						  </div>
					  </el-dialog>
					<el-button
					  size="mini"
					  type="danger"
					  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					  <el-dialog title="货架承载工具直径信息删除" :visible.sync="dialogFormDeleteVisible">
						  <span style="font-size:20px;font-weight:bold;color:red">该操作将会在数据库中删除对应数据，并无法回复，请您确认之后再点击确定！</span>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelDeleteButton">取 消</el-button>
							<el-button type="primary" @click="deleteDameterInfo">确 定</el-button>
						  </div>
					  </el-dialog>
				  </template>
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="count"
				background
				layout="prev, pager, next, jumper"
				:total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import {createDiameterInfo, updateDiameterInfo} from "../request/api";

	export default{
		name:'mianBoardDiameter',
		data(){
			return{
				tableData: [],
				dialogFormVisible: false,
				dialogTableVisible: false,
				dialogFormUpdateVisible: false,
				dialogFormDeleteVisible: false,
				form: {
					min_dia: '',
					max_dia: '',
					comment: ''
				},
				formLabelWidth: '250px',
				updateForm: {},
				deleteForm: {},
				pageSize: 1,
				currentPage:1,
				count:10,
				totalPage:1,
				rules: {
				  min_dia: [
					{ required: true, message: '请输入直径', trigger: 'blur' },
					{ type: 'number', message: '直径为数字值'},
					{
					  validator(rule, value, callback) {
					   if (Number.isInteger(Number(value)) && Number(value) >= 0) {
						 callback()
						} else {
						  callback(new Error('请输入大于等于0的正整数'))
						}
					   },
					   trigger: 'blur'
					}
				  ],
				  max_dia: [
					{ required: true, message: '请输入直径', trigger: 'blur' },
					{ type: 'number', message: '直径为数字值'},
					{
					  validator(rule, value, callback) {
					   if (Number.isInteger(Number(value)) && Number(value) >= 0) {
						 callback()
						} else {
						  callback(new Error('请输入大于等于0的正整数'))
						}
					   },
					   trigger: 'blur'
					}
				  ]
				}
			}
		},
		mounted(){
			this.getDiameterInfo(); // 主动调用接口
		},
		methods:{
			handleCurrentChange(val){
				this.getDiameterInfo();
			},
			createButton() {
				// 新增按钮，用来清空数据的
				this.form = {
					min_dia: '',
					max_dia: '',
					comment: ''
				};
				this.dialogFormVisible = true
				this.currentPage = 1
			},
			cancelButton() {
				// 取消按钮，用来清空数据的
				this.form = {
					min_dia: '',
					max_dia: '',
					comment: ''
				};
				this.dialogFormVisible = false
			},
			getDiameterInfo() {
				//查询货架直径信息
				this.tableData = []
				let params ={
					page:this.currentPage,
					size:this.count
				}
				this.$api.getDiameterInfo(params).then((res) => {
					// res -- 返回的数据
					if (res.code === 200) {
						this.totalPage = res.count
						for (var item of res.data) {
							this.tableData.push(
								{
									'id': item.id,
									'data': item.create_time,
									'max_dia': item.max_dia,
									'min_dia': item.min_dia,
									'comment': item.comment
								}
							)
						}
					} else {
						this.tableData = [{
							'id': '',
							'data': '',
							'max_dia': '',
							'min_dia': '',
							'comment': ''
						}]
					}
				})
			},
			createDiameterInfo(){
				// 增加货架承载重量接口
				let params = {
					min_dia: this.form.min_dia,
					max_dia: this.form.max_dia,
					comment: this.form.comment
				}
				this.$api.createDiameterInfo(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormVisible = false;
						this.form = {
							min_dia: '',
							max_dia: '',
							comment: ''
						};
						this.tableData = []
						this.getDiameterInfo()
					}
				})
			},
			handleEdit(index, row) {
				// 更新按钮
				this.updateForm = {
					id: row.id,
					min_dia: row.min_dia,
					max_dia: row.max_dia,
					comment: row.comment
				}
				this.dialogFormUpdateVisible = true;
			},
			cancelUpdateButton() {
				// 更新的取消按钮
				this.dialogFormUpdateVisible = false;
				this.updateForm = {}
			},
			updateDiameterInfo() {
				// 更新的确定按钮
				let params = {
					'id': this.updateForm.id,
					'min_dia': this.updateForm.min_dia,
					'max_dia': this.updateForm.max_dia,
					'comment': this.updateForm.comment
				}
				this.$api.updateDiameterInfo(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormUpdateVisible = false;
						this.updateForm = {};
						this.tableData = []
						this.getDiameterInfo()
					}
				})
			},
			handleDelete(index, row) {
				// 删除按钮
				this.deleteForm = {
					id: row.id,
					min_dia: row.min_dia,
					max_dia: row.max_dia,
					comment: row.commet
				}
				this.dialogFormDeleteVisible = true;
			},
			cancelDeleteButton() {
				// 删除的取消按钮
				this.dialogFormDeleteVisible = false;
				this.deleteForm = {}
			},
			deleteDameterInfo() {
				// 删除的确定按钮
				let params = {
					'diameter_id': this.deleteForm.id
				}
				this.$api.deleteDiameterInfo(params).then((res) => {
					if (res.code === 200) {
						this.$message.success(res.msg);
						this.dialogFormDeleteVisible = false;
						this.deleteForm = {};
						this.tableData = [];
						this.getDiameterInfo()
					}
				})
			},

		},
	}
</script>
<style scoped lang="less">
	.main{
		background-color: #f6f7fc;
		height: 100%;
	}
	.title{
		font-size: 18px;
		padding: 10px 0;
	}
	.el-pagination{
		text-align: right;
		margin-top: 10px;
	}
</style>
