<template>
	<div class="main">
		<div class="title">
			货架设计承载重量区间信息
		</div>
		<div class="flex flex_end">
			<el-button type="primary" @click="createButton">新增</el-button>
			<el-dialog title="新增货架设计承载重量区间" :visible.sync="dialogFormVisible">
			  <el-form :model="form" :rules="rules">
				<el-form-item label="最小重量" :label-width="formLabelWidth" prop="min_weight">
				  <el-input v-model.number="form.min_weight" autocomplete="off" placeholder="货架最小承载重量，单位：kg"></el-input>
				</el-form-item>
				<el-form-item label="最大重量" :label-width="formLabelWidth" prop="max_weight">
				  <el-input v-model.number="form.max_weight" autocomplete="off" placeholder="货架最大承载重量，单位：kg"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth">
				  <el-input v-model="form.comment" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelButton">取 消</el-button>
				<el-button type="primary" @click="createWeightInfo">确 定</el-button>
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
				  label="最小重量(单位：kg)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.min_weight }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="最大重量(单位：kg)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.max_weight }}</el-tag>
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
					  <el-dialog title="编辑货架设计承载重量区间" :visible.sync="dialogFormUpdateVisible">
						<el-form :model="updateForm" :rules="rules">
							<el-form-item label="货架最小承载重量(单位：kg)" :label-width="formLabelWidth" prop="min_weight">
							  <el-input v-model.number="updateForm.min_weight" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="货架最大承载重量(单位：kg)" :label-width="formLabelWidth" prop="max_weight">
							  <el-input v-model.number="updateForm.max_weight" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="备注" :label-width="formLabelWidth">
							  <el-input v-model="updateForm.comment" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelUpdateButton">取 消</el-button>
							<el-button type="primary" @click="updateWeightInfo">确 定</el-button>
						  </div>
					  </el-dialog>
					<el-button
					  size="mini"
					  type="danger"
					  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					  <el-dialog title="货架承载重量信息删除" :visible.sync="dialogFormDeleteVisible">
						  <span style="font-size:20px;font-weight:bold;color:red">该操作将会在数据库中删除对应数据，并无法回复，请您确认之后再点击确定！</span>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelDeleteButton">取 消</el-button>
							<el-button type="primary" @click="deleteWeightInfo">确 定</el-button>
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
	export default{
		name:'mianBoardWeight',
		data(){
			return{
				tableData: [],
				dialogFormVisible: false,
				dialogTableVisible: false,
				dialogFormUpdateVisible: false,
				dialogFormDeleteVisible: false,
				form: {
					min_weight: '',
					max_weight: '',
					comment: ''
				},
				formLabelWidth: '200px',
				updateForm: {},
				deleteForm: {},
				pageSize: 1,
				currentPage:1,
				count:10,
				totalPage:1,
				rules: {
				  min_weight: [
					{ required: true, message: '请输入重量', trigger: 'blur' },
					{ type: 'number', message: '重量为数字值'},
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
				  max_weight: [
					{ required: true, message: '请输入重量', trigger: 'blur' },
					{ type: 'number', message: '重量为数字值'},
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
			this.getWeightInfo(); // 主动调用接口
		},
		methods:{
			handleCurrentChange(val){
				this.getWeightInfo();
			},
			createButton() {
				// 新增按钮，用来清空数据的
				this.form = {
					min_weight: '',
					max_weight: '',
					comment: ''
				};
				this.dialogFormVisible = true
				this.currentPage = 1
			},
			cancelButton() {
				// 取消按钮，用来清空数据的
				this.form = {
					min_weight: '',
					max_weight: '',
					comment: ''
				};
				this.dialogFormVisible = false
			},
			getWeightInfo() {
				//查询货架重量信息
				this.tableData = []
				let params ={
					page:this.currentPage,
					size:this.count
				}
				this.$api.getWeightInfo(params).then((res) => {
					// res -- 返回的数据
					if (res.code === 200) {
						this.totalPage = res.count
						for (var item of res.data) {
							this.tableData.push(
								{
									'id': item.id,
									'data': item.create_time,
									'max_weight': item.max_weight,
									'min_weight': item.min_weight,
									'comment': item.comment
								}
							)
						}
					} else {
						this.tableData = [{
							'id': '',
							'data': '',
							'max_weight': '',
							'min_weight': '',
							'comment': ''
						}]
					}
				})
			},
			createWeightInfo(){
				// 增加货架承载重量接口
				let params = {
					min_weight: this.form.min_weight,
					max_weight: this.form.max_weight,
					comment: this.form.comment
				}
				this.$api.createWeightInfo(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormVisible = false;
						this.form = {
							min_weight: '',
							max_weight: '',
							comment: ''
						};
						this.tableData = []
						this.getWeightInfo()
					}
				})
			},
			handleEdit(index, row) {
				// 更新按钮
				this.updateForm = {
					id: row.id,
					min_weight: row.min_weight,
					max_weight: row.max_weight,
					comment: row.comment
				}
				this.dialogFormUpdateVisible = true;
			},
			cancelUpdateButton() {
				// 更新的取消按钮
				this.dialogFormUpdateVisible = false;
				this.updateForm = {}
			},
			updateWeightInfo() {
				// 更新的确定按钮
				let params = {
					'id': this.updateForm.id,
					'min_weight': this.updateForm.min_weight,
					'max_weight': this.updateForm.max_weight,
					'comment': this.updateForm.comment
				}
				this.$api.updateWeightInfo(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormUpdateVisible = false;
						this.updateForm = {};
						this.tableData = []
						this.getWeightInfo()
					}
				})
			},
			handleDelete(index, row) {
				// 删除按钮
				this.deleteForm = {
					id: row.id,
					min_weight: row.min_weight,
					max_weight: row.max_weight,
					comment: row.commet
				}
				this.dialogFormDeleteVisible = true;
			},
			cancelDeleteButton() {
				// 删除的取消按钮
				this.dialogFormDeleteVisible = false;
				this.deleteForm = {}
			},
			deleteWeightInfo() {
				// 删除的确定按钮
				let params = {
					'weight_id': this.deleteForm.id
				}
				this.$api.deleteWeightInfo(params).then((res) => {
					if (res.code === 200) {
						this.$message.success(res.msg);
						this.dialogFormDeleteVisible = false;
						this.deleteForm = {};
						this.tableData = [];
						this.getWeightInfo()
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
