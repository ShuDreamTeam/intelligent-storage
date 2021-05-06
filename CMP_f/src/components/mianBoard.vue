<template>
	<div class="main">
		<div class="title">
			仓库区域信息
		</div>
		<div class="flex flex_end">
			<el-button type="primary" @click="createButton">新增</el-button>
			<el-dialog title="新增仓库区域" :visible.sync="dialogFormVisible">
			  <el-form :model="form">
				<el-form-item label="仓库区域名称" :label-width="formLabelWidth">
				  <el-input v-model="form.name" autocomplete="off" placeholder="请填写仓库区域名称"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth">
				  <el-input v-model="form.comment" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelButton">取 消</el-button>
				<el-button type="primary" @click="createWareHouseInfo">确 定</el-button>
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
				  label="仓库区域名称"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.name }}</el-tag>
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
					  <el-dialog title="仓库区域信息编辑" :visible.sync="dialogFormUpdateVisible">
						<el-form :model="updateForm">
							<el-form-item label="仓库区域名称" :label-width="formLabelWidth">
							  <el-input v-model="updateForm.warename" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="备注" :label-width="formLabelWidth">
							  <el-input v-model="updateForm.comment" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelUpdateButton">取 消</el-button>
							<el-button type="primary" @click="updateWareHouseInfo">确 定</el-button>
						  </div>
					  </el-dialog>
					<el-button
					  size="mini"
					  type="danger"
					  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					  <el-dialog title="仓库区域信息删除" :visible.sync="dialogFormDeleteVisible">
						  <span style="font-size:20px;font-weight:bold;color:red">该操作将会在数据库中删除对应数据，并无法回复，请您确认之后再点击确定！</span>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="cancelDeleteButton">取 消</el-button>
							<el-button type="primary" @click="deleteWareHouseInfo">确 定</el-button>
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
		name:'mianBoard',
		data(){
			return{
				tableData: [],
				dialogFormVisible: false,
				dialogTableVisible: false,
				dialogFormUpdateVisible: false,
				dialogFormDeleteVisible: false,
				form: {
					name: '',
					comment: ''
				},
				formLabelWidth: '120px',
				updateForm: {},
				deleteForm: {},
				pageSize: 1,
				currentPage:1,
				count:10,
				totalPage:1,
			}
		},
		mounted(){
			this.getWareHouseInfo(); // 主动调用接口
		},
		methods:{
			handleCurrentChange(val){
				this.getWareHouseInfo();
			},
			createButton() {
				// 新增按钮，用来清空数据的
				this.form = {
					name: '',
					comment: ''
				};
				this.dialogFormVisible = true
				this.currentPage = 1
			},
			cancelButton() {
				// 取消按钮，用来清空数据的
				this.form = {
					name: '',
					comment: ''
				};
				this.dialogFormVisible = false
			},
			getWareHouseInfo() {
				//查询仓库信息
				this.tableData = []
				let params ={
					page:this.currentPage,
					size:this.count
				}
				this.$api.Warehouse(params).then((res) => {
					// res -- 返回的数据
					if (res.code === 200) {
						this.totalPage = res.count
						for (var item of res.data) {
							this.tableData.push(
									{
										'id': item.id,
										'data': item.create_time,
										'name': item.warename,
										'comment': item.comment
									}
							)
						}
					} else {
						this.tableData = [{
							'id': '',
							'data': '',
							'name': '',
							'comment': ''
						}]
					}
				})
			},
			createWareHouseInfo(){
				// 增加仓库区域
				let params = {
					warename: this.form.name,
					comment: this.form.comment
				}
				this.$api.CreateWarehouse(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormVisible = false;
						this.form = {
							name: '',
							comment: ''
						};
						this.tableData = []
						this.getWareHouseInfo()
					}
				})
			},
			handleEdit(index, row) {
				// 更新按钮
				this.updateForm = {
					id: row.id,
					warename: row.name,
					comment: row.comment
				}
				this.dialogFormUpdateVisible = true;
			},
			cancelUpdateButton() {
				// 更新的取消按钮
				this.dialogFormUpdateVisible = false;
				this.updateForm = {}
			},
			updateWareHouseInfo() {
				// 更新的确定按钮
				let params = {
					'id': this.updateForm.id,
					'warename': this.updateForm.warename,
					'comment': this.updateForm.comment
				}
				this.$api.updateWarehouse(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormUpdateVisible = false;
						this.updateForm = {};
						this.tableData = []
						this.getWareHouseInfo()
					}
				})
			},
			handleDelete(index, row) {
				// 删除按钮
				this.deleteForm = {
					id: row.id,
					warename: row.name,
					comment: row.comment
				}
				this.dialogFormDeleteVisible = true;
			},
			cancelDeleteButton() {
				// 删除的取消按钮
				this.dialogFormDeleteVisible = false;
				this.deleteForm = {}
			},
			deleteWareHouseInfo() {
				// 删除的确定按钮
				let params = {
					'warehouse_id': this.deleteForm.id
				}
				this.$api.deleteWarehouse(params).then((res) => {
					if (res.code === 200) {
						this.$message.success(res.msg);
						this.dialogFormDeleteVisible = false;
						this.deleteForm = {};
						this.tableData = [];
						this.getWareHouseInfo()
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
