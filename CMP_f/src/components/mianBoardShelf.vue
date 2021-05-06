<template>
	<div class="main">
		<div class="title">
			仓库货架信息
		</div>
		<div class="flex flex_end">
			<el-button type="primary" @click="createButton">新增</el-button>
			<el-dialog title="新增货架信息" :visible.sync="dialogFormVisible">
			  <el-form :model="form" :rules="rules">
				<el-form-item label="货架别名" :label-width="formLabelWidth" prop="shelf_name">
				  <el-input v-model="form.shelf_name" autocomplete="off" placeholder="请填写货架别名，该名称用来区分货架，格式：仓库区域+货架"></el-input>
				</el-form-item>
				<el-form-item label="货架类型" :label-width="formLabelWidth" prop="value_shelf">
				  <el-select v-model="form.value_shelf" clearable placeholder="请选择" style="width:100%">
					<el-option
					  v-for="item in options_shelf"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="货架所属区域" :label-width="formLabelWidth" prop="value_warehouse">
				  <el-select v-model="form.value_warehouse" clearable placeholder="请选择" style="width:100%">
				  <el-option
					  v-for="item in options_warehouse"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="承载重量区间" :label-width="formLabelWidth" prop="value_weight">
				  <el-select v-model="form.value_weight" clearable placeholder="请选择" style="width:100%">
				  <el-option
					  v-for="item in options_weight"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				  </el-form-item>
				<el-form-item label="工具直径区间" :label-width="formLabelWidth" prop="value_diameter">
				  <el-select v-model="form.value_diameter" clearable placeholder="请选择" style="width:100%">
				  <el-option
					  v-for="item in options_diameter"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				  </el-form-item>
				<el-form-item label="最大承载工具数量" :label-width="formLabelWidth" prop="shelf_max_num">
				  <el-input v-model.number="form.shelf_max_num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" :label-width="formLabelWidth">
				  <el-input v-model="form.comment" autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelButton">取 消</el-button>
				<el-button type="primary" @click="createShelfInfo">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<div>
			<el-table
				:data="tableData"
				style="width: 100%">
<!--				<el-table-column-->
<!--				  label="创建时间"-->
<!--				  width="250"-->
<!--				  >-->
<!--				  <template slot-scope="scope">-->
<!--					<i class="el-icon-time"></i>-->
<!--					<span style="margin-left: 10px">{{ scope.row.create_time }}</span>-->
<!--				  </template>-->
<!--				</el-table-column>-->
				<el-table-column
				  label="货架名称"
				  width="120"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_name }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="货架类型"
				  width="120"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.type_shelf }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="所属区域"
				  width="120"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_warehouse }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="承载重量范围 (单位：kg)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_weight }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="承载工具直径范围 (单位：mm)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_dia }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="最大工具数量 (单位：个数)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_max_num }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="当前工具数量 (单位：个数)"
				  >
				  <template slot-scope="scope">
					  <div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.shelf_now_num }}</el-tag>
					  </div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="备注"
				  width="120"
				  >
				  <template slot-scope="scope">
					<span>{{ scope.row.comment }}</span>
				  </template>
				</el-table-column>
				<el-table-column label="操作" width="200">
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

	import {getDiameterSelect} from "../request/api";

	export default{
		name:'mianBoardShelf',
		data(){
			return{
				tableData: [],
				dialogFormVisible: false,
				dialogTableVisible: false,
				dialogFormUpdateVisible: false,
				dialogFormDeleteVisible: false,
				form: {
					shelf_name: '',
					shelf_max_num: '',
					value_shelf: '',
					comment: '',
					value_warehouse: '',
					value_weight: '',
					value_diameter: '',
				},
				formLabelWidth: '200px',
				updateForm: {},
				deleteForm: {},
				pageSize: 1,
				currentPage:1,
				count:10,
				totalPage:1,
				options_warehouse: [],
				options_weight: [],
				options_diameter: [],
				options_shelf: [{
					'value': '0',
					'label': '多层货架'
				},{
					'value': '1',
					'label': '单层货架'
				}],
				rules: {
					shelf_name: [
						{required: true, message: '请输入货架别名', trigger: 'blur'}
					],
					value_shelf: [
						{required: true, message: '请选择货架类型', trigger: 'blur'}
					],
					value_warehouse: [
						{required: true, message: '请选择货架所属区域', trigger: 'blur'}
					],
					value_weight: [
						{required: true, message: '请选择承载重量区间', trigger: 'blur'}
					],
					value_diameter: [
						{required: true, message: '请选择工具直径区间', trigger: 'blur'}
					],
					shelf_max_num: [
						{required: true, message: '请输入最大承载工具数量', trigger: 'blur'},
						{ type: 'number', message: '数量为数字值'},
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
			this.getShelfInfo(); // 主动调用接口
			this.getWareHouseInfo();
			this.getWeightInfo();
			this.getDiameterInfo();
		},
		methods:{
			handleCurrentChange(val){
				this.getShelfInfo();
				this.getWareHouseInfo();
				this.getWeightInfo();
				this.getDiameterInfo();
			},
			createButton() {
				// 新增按钮，用来清空数据的
				this.form = {
					shelf_name: '',
					shelf_max_num: '',
					value_shelf: '',
					comment: '',
					value_warehouse: '',
					value_weight: '',
					value_diameter: '',
				};
				this.dialogFormVisible = true
				this.currentPage = 1
			},
			cancelButton() {
				// 取消按钮，用来清空数据的
				this.form = {
					shelf_name: '',
					shelf_max_num: '',
					value_shelf: '',
					comment: '',
					value_warehouse: '',
					value_weight: '',
					value_diameter: '',
				};
				this.dialogFormVisible = false
			},
			getWareHouseInfo() {
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
			getWeightInfo() {
				// 查一下选项
				this.$api.getWeightSelect().then((res) => {
					if (res.code === 200) {
						for (var item of res.data) {
							this.options_weight.push(
								{
									'value': item.id,
									'label': item.weight_select
								}
							)
						}
					}
				})
			},
			getDiameterInfo() {
				// 查一下选项
				this.$api.getDiameterSelect().then((res) => {
					if (res.code === 200) {
						for (var item of res.data) {
							this.options_diameter.push(
								{
									'value': item.id,
									'label': item.diameter_select
								}
							)
						}
					}
				})
			},
			getShelfInfo() {
				//查询货架信息
				this.tableData = []
				let params ={
					page:this.currentPage,
					size:this.count
				}
				this.$api.getShelfInfo(params).then((res) => {
					// res -- 返回的数据
					if (res.code === 200) {
						this.totalPage = res.count
						for (var item of res.data) {
							this.tableData.push(
								{
									'id': item.id,
									'create_time': item.create_time,
									'shelf_name': item.shelf_name,
									'type_shelf': item.type_shelf,
									'shelf_weight': item.shelf_weight,
									'shelf_dia': item.shelf_dia,
									'shelf_warehouse': item.shelf_warehouse,
									'comment': item.comment,
									'shelf_max_num': item.shelf_max_num,
									'shelf_now_num': item.shelf_now_num
								}
							)
						}
					} else {
						this.tableData = [{
							'id': '',
							'create_time': '',
							'shelf_name': '',
							'type_shelf': '',
							'shelf_weight': '',
							'shelf_dia': '',
							'shelf_warehouse': '',
							'comment': '',
							'shelf_max_num': '',
							'shelf_now_num': ''
						}]
					}
				})
			},
			createShelfInfo(){
				// 增加仓库区域
				if ( this.form.value_shelf === '' ) {
					this.$message({
						message: '请选择货架类型',
						type: 'warning'
					});
					return
				}
				if ( this.form.value_warehouse === '' ) {
					this.$message({
						message: '请选择货架所属区域',
						type: 'warning'
					});
					return
				}
				if ( this.form.value_weight === '' ) {
					this.$message({
						message: '请选择货架承载重量区间',
						type: 'warning'
					});
					return
				}
				if ( this.form.value_diameter === '' ) {
					this.$message({
						message: '请选择工具直径区间',
						type: 'warning'
					});
					return
				}
				if ( this.form.shelf_max_num === '' ) {
					this.$message({
						message: '请设置最大承载工具数量',
						type: 'warning'
					});
					return
				}
				let params = {
					shelf_name: this.form.shelf_name,
					type_shelf: this.form.value_shelf,
					shelf_weight: this.form.value_weight,
					shelf_dia: this.form.value_diameter,
					shelf_max_num: this.form.shelf_max_num,
					shelf_warehouse: this.form.value_warehouse,
					comment: this.form.comment,
				}
				this.$api.createShelf(params).then((res) => {
					if (res.code === 200) {
						this.dialogFormVisible = false;
						this.form = {
							shelf_name: '',
							shelf_max_num: '',
							value_shelf: '',
							comment: '',
							value_warehouse: '',
							value_weight: '',
							value_diameter: '',
						};
						this.tableData = []
						this.getShelfInfo()
					}
				})
			},
			handleEdit(index, row) {
				// 更新按钮
				this.updateForm = {
					id: row.id,
					shelf_name: row.shelf_name,
					type_shelf: row.type_shelf,

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
