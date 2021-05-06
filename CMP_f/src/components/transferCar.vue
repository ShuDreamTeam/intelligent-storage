<template>
	<div class="main">
		<div class="title">
			移载车信息
		</div>
		<div>
			<el-row>
				<el-col :offset="22">
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-col>
			</el-row>
			
		</div>
		<div style="margin-top:10px;">
			<el-row>
				<el-table
					:data="tableData"
					style="width: 100%">
					<el-table-column type="index" label="序号" width="120">
						
					</el-table-column>
					<el-table-column v-if="false" prop="id" label="id" width="120">
						
					</el-table-column>
					<el-table-column v-if="false" prop="WPid.id" label="id" width="120">
						
					</el-table-column>
					<el-table-column label="名称" width="">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="工作状态" width="">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.work_status }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.create_time }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="WPid.name" label="区域" width="">
					</el-table-column> -->
					<el-table-column label="备注">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.comment }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="">
					<template slot-scope="scope">
						<el-button
						size="mini"
						type="success"
						@click="handleEdit(scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.row)">删除</el-button>
					</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row>
				<el-col :offset="0">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 20, 50]"
						:page-size="10"
						layout="total, sizes, prev, pager, next, jumper"
						:total="count">
					</el-pagination>
				</el-col>
			</el-row>
			<!-- 新增表单 -->
			<el-dialog title="新增移载车信息" :visible.sync="transferDialogFormVisible">
				<el-form :model="transferForm">
					<el-row>
						<el-col :span="20">
							<el-form-item label="名称" :label-width="formLabelWidth">
								<el-input v-model="transferForm.name" autocomplete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="20">
							<el-form-item label="货架所属区域" :label-width="formLabelWidth" prop="value_warehouse">
								<el-select v-model="transferForm.value_warehouse" clearable placeholder="请选择" style="width:100%">
								<el-option
									v-for="item in options_warehouse"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="transferDialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</div>
			</el-dialog>

			<!-- 更新穿梭车信息 -->
			<el-dialog title="更新移载车信息" :visible.sync="updateTransferDialogFormVisible">
				<el-form :model="transferForm">
					<el-row>
						<el-col :span="20">
							<el-form-item label="名称" :label-width="formLabelWidth">
								<el-input v-model="transferForm.name" autocomplete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="20">
							<el-form-item label="货架所属区域" :label-width="formLabelWidth" prop="value_warehouse">
								<el-select v-model="transferForm.value_warehouse" clearable placeholder="请选择" style="width:100%">
								<el-option
									v-for="item in options_warehouse"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="updateTransferDialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="updateInfo">提 交</el-button>
				</div>
			</el-dialog>
			
			
		</div>
	</div>
</template>
<script>

	import {getDiameterSelect} from "../request/api";

	export default{
		name:'shuttleCars',
		data(){
			return{
				tableData: [], // table表的数据
				
				formLabelWidth: '100px',
		
				pageSize: 1, // 第几页
				currentPage:1, // 当前页
				count:0,	// 总条数
				totalPage:10, // 
				transferForm:{
					id: null,
					name: null,
					workStatus: null,
					comment:null,
					value_warehouse: null
				},
				transferDialogFormVisible: false, // 穿梭车对话框显示
				updateTransferDialogFormVisible: false, // 更新,
				options_warehouse: [], // 区域数组
			}
		},
		created(){
			this.getTableInfo();
		},
		methods:{
			handleAdd() {
				// console.log("新增!");
				this.getOptionsWarehouse();
				// 打开新增穿梭车对话框
				this.transferDialogFormVisible = true;
				this.transferForm.name = null;
				this.value_warehouse = null;
			},
			submit() {
				let data = {
					name: this.transferForm.name,
					WPid: this.transferForm.value_warehouse
				}
				this.$api.addTransfer(data).then(res => {
					if(res.code == 200) {
						this.$message({
							type: "success",
							message: res.msg
						})
						// 新增完成之后关闭对话框
						this.transferDialogFormVisible = false;
						this.getTableInfo();
					}
				}).catch(res=> {
					this.$message({
						type: "warning",
						message: res.msg
					})
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getTableInfo() {
				// 查一下选项
				this.$api.getTransferInfo().then((res) => {
					if (res.code === 200) {
						this.tableData = res.data;
					}
				})
			},
			getOptionsWarehouse() {
				// 查一下选项
				this.$api.getWareHouseSelect().then((res) => {
					if (res.code === 200) {
						for (var item of res.data) {
							this.options_warehouse.push(
								{
									'value': item.id,
									'label': item.warename
								}
							)
						}
					}
				})
			},
			
			handleEdit(row) {
				this.updateTransferDialogFormVisible = true;
				// 将所在行的数据进行回显
				this.transferForm.name = row.name;
				this.transferForm.id = row.id;
				console.log(JSON.stringify(row))
				this.transferForm.value_warehouse = row.WPid.id;
				this.getOptionsWarehouse();
			},
			updateInfo() {
				// 更新的确定按钮
				let params = {
					'id': this.transferForm.id,
					'name': this.transferForm.name,
					'WPid': this.transferForm.value_warehouse
				}
				this.$api.updateTransfer(params).then((res) => {
					if (res.code === 200) {
						this.$message({
							type: "success",
							message: res.msg
						})
						this.getTableInfo();
						this.updateTransferDialogFormVisible = false;
					}
				}).catch(res => {
					this.$message({
						type: "warning",
						message: msg
					})
				})
			},
			handleDelete(row) {
				let params = {
					id: row.id
				}
				this.$confirm('确定要删除吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
					
					this.$api.deleteTransferInfo(params).then(res=> {
						if(res.code == 200) {
							this.$message({
								type: 'success',
								message: res.msg
							});
							this.getTableInfo();
						}
						}).catch(res => {
							this.$message({
									type: 'warning',
									message: res.msg
								});
						})
					}).catch(() => {
					this.$message({
						type: 'warning',
						message: '取消删除!'
					});          
				});
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
		font-size: 30px;
		padding-top: 20px;
		padding-left: 20px;
	}
	.el-pagination{
		text-align: right;
		margin-top: 10px;
	}
</style>
