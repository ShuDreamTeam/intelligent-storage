<template>
	<div class="main" style="width:100%;">
		<div class="title">货架工具入库及其详细信息查看</div>
		<!--入库-->
		<!-- <div class="flex flex_end"> -->
		<div>
			<el-row style="margin-bottom:5px;">
				<el-col :offset="20" :span="1">
					<el-button type="success" @click="openSearchDialog">查询</el-button>
				</el-col>
				<el-col :offset="1" :span="1">
					<el-button type="primary" @click="createButton">入库</el-button>
				</el-col>
			</el-row>
			<el-dialog title="工具入库操作" :visible.sync="dialogFormVisible">
				<el-form :model="form" :rules="rules">
				<el-form-item label="工具类型" :label-width="formLabelWidth" prop>
					<el-select v-model="form.tool_class" clearable placeholder="请选择" style="width:100%">
					<el-option label="扶正器" value="1"></el-option>
					<el-option label="震击器" value="2"></el-option>
					<el-option label="安全阀" value="3"></el-option>
					<el-option label="封隔器" value="4"></el-option>
					<el-option label="法兰" value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工具别名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="长度 mm" :label-width="formLabelWidth">
					<el-input v-model="form.tool_length" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="直径 mm" :label-width="formLabelWidth">
					<el-input v-model="form.tool_diameter" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="重量 kg" :label-width="formLabelWidth">
					<el-input v-model="form.tool_weight" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="保养状态" :label-width="formLabelWidth" prop="value_shelf">
					<el-select
					v-model="form.tool_current_status"
					clearable
					placeholder="请选择"
					style="width:100%"
					>
					<el-option label="工具待入库" value="10"></el-option>
					<el-option label="工具在仓库中" value="0"></el-option>
					<el-option label="工具已经出库" value="1"></el-option>
					<el-option label="工具保养中" value="2"></el-option>
					<el-option label="工具贴标签中" value="3"></el-option>
					<el-option label="工具待返回" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="RFID" :label-width="formLabelWidth" prop="value_shelf">
					<el-button type="primary">写RFID</el-button>
				</el-form-item>
				<el-form-item label="库位" :label-width="formLabelWidth" prop="value_warehouse">
					<el-cascader
					v-model="form.SPid"
					placeholder="请选择"
					style="width:100%"
					:options="options_warehouse"
					clearable
					></el-cascader>
				</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				<el-button @click="cancelButton">取 消</el-button>
				<el-button type="primary" @click="createToolsInfo">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="id" width="50">
				<template slot-scope="scope">
					<!--					<i class="el-icon-time"></i>-->
					<span style="margin-left: 10px">{{ scope.row.id }}</span>
				</template>
				</el-table-column>
				<el-table-column label="名称" width="200">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.name }}</el-tag>
					</div>
				</template>
				</el-table-column>
				<el-table-column label="区域">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.wpid_name }}</el-tag>
					</div>
				</template>
				</el-table-column>
				<el-table-column label="货架">
				<template slot-scope="scope">
					<span>{{ scope.row.spid_name }}</span>
				</template>
				</el-table-column>
				<el-table-column label="长度">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_length }}</span>
				</template>
				</el-table-column>
				<el-table-column label="重量">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_weight }}</span>
				</template>
				</el-table-column>
				<el-table-column label="直径">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_diameter }}</span>
				</template>
				</el-table-column>
				<el-table-column label="类型">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_class }}</span>
				</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!--详情-->
						<el-button
						size="mini"
						type="success"
						@click="handleInfoEdit(scope.$index, scope.row)"
						>详情</el-button>
						<el-dialog title="工具详情查看" :visible.sync="dialogFormInfoVisible" :append-to-body="true">
						<el-form label-width="40%">
							<el-form-item label="名称: ">
							<h2>{{ formLabelAlign.name }}</h2>
							</el-form-item>
							<el-form-item label="所属区域: ">
							<h2>{{formLabelAlign.wpid_name}}</h2>
							</el-form-item>
							<el-form-item label="所属货架: ">
							<h2>{{ formLabelAlign.spid_name }}</h2>
							</el-form-item>
							<el-form-item label="工具类型: ">
							<h2>{{ formLabelAlign.tool_class }}</h2>
							</el-form-item>
							<el-form-item label="工具当前状态: ">
							<h2>{{ formLabelAlign.tool_current_status }}</h2>
							</el-form-item>
							<el-form-item label="工具长度: ">
							<h2>{{ formLabelAlign.tool_length }}</h2>
							</el-form-item>
							<el-form-item label="工具重量: ">
							<h2>{{ formLabelAlign.tool_weight }}</h2>
							</el-form-item>
							<el-form-item label="工具直径: ">
							<h2>{{ formLabelAlign.tool_diameter }}</h2>
							</el-form-item>
							<el-form-item label="工具入库时间: ">
							<h2>{{ formLabelAlign.tool_input_time }}</h2>
							</el-form-item>
							<el-form-item label="工具出库时间: ">
							<h2>{{ formLabelAlign.tool_output_time }}</h2>
							</el-form-item>
							<el-form-item label="工具保养状态: ">
							<h2>{{ formLabelAlign.tool_status }}</h2>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="cancelInfoButton">取 消</el-button>
						</div>
						</el-dialog>
						<el-button size="mini" type="primary" @click="outReposity(scope.row)">出库</el-button>
					</template>
					
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="count"
				background
				layout="prev, pager, next, jumper"
				:total="totalPage"
			></el-pagination>
		</div>

		<!-- 点击查询按钮时弹出库存的查询页面 -->
		<el-dialog
			title="出库"
			:visible.sync="searchDialogVisible"
			width="45%">
			<el-form :model="searchForm" ref="searchForm">
				<el-row>
					<el-col :span="15">
						<el-form-item label="工具类型" :label-width="formLabelWidth" prop="tool_class">
							<el-select v-model="searchForm.tool_class" placeholder="请选择工具">
								<el-option
								v-for="item in choice_tool"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="工具信息" :label-width="formLabelWidth">
					<el-row>
						<el-col :span="18">
							<el-form-item label="长度mm" :label-width="formLabelWidth" prop="tool_length">
								<el-input v-model="searchForm.tool_length" autocomplete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="margin-top:10px;" :span="18">
							<el-form-item label="直径mm" :label-width="formLabelWidth" prop="tool_diameter">
								<el-input v-model="searchForm.tool_diameter" autocomplete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col style="margin-top:10px;" :span="18">
							<el-form-item label="重量kg" :label-width="formLabelWidth" prop="tool_weight">
								<el-input v-model="searchForm.tool_weight" autocomplete="off"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="保养状态" :label-width="formLabelWidth" prop="tool_status">
					<el-select v-model="searchForm.tool_status" placeholder="请选择工具">
						<el-option
							v-for="item in choice_status"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="search">查询库存</el-button>
				<el-button type="info" @click="reset('searchForm')">重置</el-button>
			</div>
		</el-dialog>

		<!-- 点击查询库存时弹出对应的库存信息 -->
		<el-dialog
			title="库存信息"
			:visible.sync="repertoryDialogVisible"
			:append-to-body="true"
			width="80%">
			<el-row>
				<el-col>工具数量: {{count.total_count}}</el-col>
				<el-col>保养数量: {{count.maintenance_count}}</el-col>
				<el-col>待保养数量: {{count.to_maintenance_count}}</el-col>
			</el-row>
			<el-table :data="reposityTableData" style="width: 100%">
				<el-table-column label="id" width="50">
				<template slot-scope="scope">
					<!--					<i class="el-icon-time"></i>-->
					<span style="margin-left: 10px">{{ scope.row.id }}</span>
				</template>
				</el-table-column>
				<el-table-column label="名称" width="200">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.name }}</el-tag>
					</div>
				</template>
				</el-table-column>
				<el-table-column label="区域">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.wpid_name }}</el-tag>
					</div>
				</template>
				</el-table-column>
				<el-table-column label="货架">
				<template slot-scope="scope">
					<span>{{ scope.row.spid_name }}</span>
				</template>
				</el-table-column>
				<el-table-column label="长度">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_length }}</span>
				</template>
				</el-table-column>
				<el-table-column label="重量">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_weight }}</span>
				</template>
				</el-table-column>
				<el-table-column label="直径">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_diameter }}</span>
				</template>
				</el-table-column>
				<el-table-column label="类型">
				<template slot-scope="scope">
					<span>{{ scope.row.tool_class }}</span>
				</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!--详情-->
						<el-button
						size="mini"
						type="success"
						@click="handleInfoEdit(scope.$index, scope.row)"
						>详情</el-button>
						<el-dialog title="工具详情查看" 
							:visible.sync="dialogFormInfoVisible" 
							:append-to-body="true">
						<el-form label-width="40%">
							<el-form-item label="名称: ">
							<h2>{{ formLabelAlign.name }}</h2>
							</el-form-item>
							<el-form-item label="所属区域: ">
							<h2>{{formLabelAlign.wpid_name}}</h2>
							</el-form-item>
							<el-form-item label="所属货架: ">
							<h2>{{ formLabelAlign.spid_name }}</h2>
							</el-form-item>
							<el-form-item label="工具类型: ">
							<h2>{{ formLabelAlign.tool_class }}</h2>
							</el-form-item>
							<el-form-item label="工具当前状态: ">
							<h2>{{ formLabelAlign.tool_current_status }}</h2>
							</el-form-item>
							<el-form-item label="工具长度: ">
							<h2>{{ formLabelAlign.tool_length }}</h2>
							</el-form-item>
							<el-form-item label="工具重量: ">
							<h2>{{ formLabelAlign.tool_weight }}</h2>
							</el-form-item>
							<el-form-item label="工具直径: ">
							<h2>{{ formLabelAlign.tool_diameter }}</h2>
							</el-form-item>
							<el-form-item label="工具入库时间: ">
							<h2>{{ formLabelAlign.tool_input_time }}</h2>
							</el-form-item>
							<el-form-item label="工具出库时间: ">
							<h2>{{ formLabelAlign.tool_output_time }}</h2>
							</el-form-item>
							<el-form-item label="工具保养状态: ">
							<h2>{{ formLabelAlign.tool_status }}</h2>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="cancelInfoButton">取 消</el-button>
						</div>
						</el-dialog>
						<el-button size="mini" type="primary" @click="outReposity(scope.row)">出库</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="count"
				background
				layout="prev, pager, next, jumper"
				:total="totalPage"
			></el-pagination>
		</el-dialog>


	</div>
</template>
<script>
export default {
  name: "mianBoardInput",
  data() {
    return {
		tableData: [],
		options_warehouse: [],
		formLabelAlign: {},
		dialogFormVisible: false,
		dialogTableVisible: false,
		dialogFormUpdateVisible: false,
		dialogFormDeleteVisible: false,
		dialogFormInfoVisible: false,
		form: {
			SPid: "",
			name: "",
			tool_class: "",
			tool_length: "",
			tool_weight: "",
			tool_diameter: "",
			tool_current_status: ""
		},
		formLabelWidth: "200px",
		updateForm: {},
		deleteForm: {},
		pageSize: 1,
		currentPage: 1,
		count: 10,
		totalPage: 1,
		rules: {
			min_weight: [
			{ required: true, message: "请输入重量", trigger: "blur" },
			{ type: "number", message: "重量为数字值" },
			{
				validator(rule, value, callback) {
				if (Number.isInteger(Number(value)) && Number(value) >= 0) {
					callback();
				} else {
					callback(new Error("请输入大于等于0的正整数"));
				}
				},
				trigger: "blur"
			}
			],
			max_weight: [
			{ required: true, message: "请输入重量", trigger: "blur" },
			{ type: "number", message: "重量为数字值" },
			{
				validator(rule, value, callback) {
				if (Number.isInteger(Number(value)) && Number(value) >= 0) {
					callback();
				} else {
					callback(new Error("请输入大于等于0的正整数"));
				}
				},
				trigger: "blur"
			}
			]
		},
		searchDialogVisible: false, // 搜索框
		searchForm: {
          tool_class: null,
          tool_length: null,
          tool_diameter: null,
          tool_weight: null,
          tool_status: null
        },
		count: {
			total_count: null, 
			maintenance_count: null,
			to_maintenance_count: null
		},
		formLabelWidth: '80px',
		choice_tool: [ // 工具类型数据
			{
				value: 1,
				label: '扶正器'
				}, {
				value: '2',
				label: '震击器'
				}, {
				value: '3',
				label: '安全阀'
				}, {
				value: '4',
				label: '封隔器'
				}, {
				value: '5',
				label: '法兰'
				
			}
		],
		choice_status:[
			{value: 0, label: "待保养"},
			{value: 1, label: "已保养"}
		], // 保养状态数组
        value: '',
		reposityTableData:[], // 查询的库存信息
		repertoryDialogVisible: false, // 库存信息显示开关
    };
  },
  mounted() {
    this.getToolsInfo(); // 主动调用接口
    this.getSingleShelfInfo();
  },
  methods: {
    handleCurrentChange(val) {
      this.getToolsInfo();
    },
    createButton() {
      // 新增按钮，用来清空数据的
      this.form = {
        SPid: "",
        name: "",
        tool_class: "",
        tool_length: "",
        tool_weight: "",
        tool_diameter: "",
        tool_current_status: ""
      };
      this.dialogFormVisible = true;
      this.currentPage = 1;
    },
    cancelButton() {
      // 取消按钮，用来清空数据的
      this.form = {
        SPid: "",
        name: "",
        tool_class: "",
        tool_length: "",
        tool_weight: "",
        tool_diameter: "",
        tool_current_status: ""
      };
      this.dialogFormVisible = false;
    },
    getToolsInfo() {
      //查询工具信息
      this.tableData = [];
      let params = {
        page: this.currentPage,
        size: this.count
      };
      this.$api.getToolsInfo(params).then(res => {
        // res -- 返回的数据
        if (res.code === 200) {
          this.totalPage = res.count.total_count;
          for (var item of res.data) {
            this.tableData.push({
              id: item.id,
              data: item.create_time,
              name: item.name,
              tool_position: item.tool_position,
              tool_class: item.tool_class,
              tool_length: item.tool_length,
              tool_weight: item.tool_weight,
              tool_diameter: item.tool_diameter,
              tool_status: item.tool_status,
              tool_input_time: item.tool_input_time,
              tool_output_time: item.tool_output_time,
              tool_current_status: item.tool_current_status,
              spid_id: item.SPid.id,
              spid_name: item.SPid.name,
              wpid_id: item.WPid.id,
              wpid_name: item.WPid.name
            });
          }
        } else {
          this.tableData = [
            {
              id: "",
              data: "",
              name: "",
              tool_position: "",
              tool_class: "",
              tool_length: "",
              tool_weight: "",
              tool_diameter: "",
              tool_status: "",
              tool_input_time: "",
              tool_output_time: "",
              tool_current_status: "",
              spid_id: "",
              spid_name: "",
              wpid_id: "",
              wpid_name: ""
            }
          ];
        }
      });
    },
    createToolsInfo() {
      // 增加Tool接口
      console.log("item =", this.form);
      console.log("item2 =", this.form.SPid[0]);
      let params = {
        SPid: this.form.SPid[0],
        name: this.form.name,
        tool_class: this.form.tool_class,
        tool_length: this.form.tool_length,
        tool_weight: this.form.tool_weight,
        tool_diameter: this.form.tool_diameter,
        tool_current_status: this.form.tool_current_status
      };

      this.$api.createToolsInfo(params).then(res => {
        if (res.code === 200) {
          this.dialogFormVisible = false;
          this.form = {
            SPid: "",
            name: "",
            tool_class: "",
            tool_length: "",
            tool_weight: "",
            tool_diameter: "",
            tool_current_status: ""
          };
          this.tableData = [];
          this.getToolsInfo();
        }
      });
    },
    handleEdit(index, row) {
      // 更新按钮
      this.updateForm = {
        id: row.id,
        name: row.name,
        spid_name: row.spid_name,
        wpid_name: row.wpid_name,
        tool_class: row.tool_class,
        tool_current_status: row.tool_current_status,
        tool_diameter: row.tool_diameter,
        tool_length: row.tool_length,
        tool_weight: row.tool_weight,
        tool_input_time: row.tool_input_time,
        tool_output_time: row.tool_output_time,
        tool_status: row.tool_status
      };
      this.dialogFormUpdateVisible = true;
    },
    handleInfoEdit(index, row) {
      // 单个查询
      this.formLabelAlign = {};
      this.dialogFormInfoVisible = true;
      // 不请求了  直接显示数据
      this.formLabelAlign = {
        id: row.id,
        name: row.name,
        spid_name: row.spid_name,
        wpid_name: row.wpid_name,
        tool_class: row.tool_class,
        tool_current_status: row.tool_current_status,
        tool_diameter: row.tool_diameter,
        tool_length: row.tool_length,
        tool_weight: row.tool_weight,
        tool_input_time: row.tool_input_time,
        tool_output_time: row.tool_output_time,
        tool_status: row.tool_status
      };
    },
    cancelUpdateButton() {
      // 更新的取消按钮
      this.dialogFormUpdateVisible = false;
      this.updateForm = {};
    },
    cancelInfoButton() {
      // 详情的取消按钮
      this.dialogFormInfoVisible = false;
      this.formLabelAlign = {};
    },
    updateWeightInfo() {
      // 更新的确定按钮
      let params = {
        id: this.updateForm.id,
        min_weight: this.updateForm.min_weight,
        max_weight: this.updateForm.max_weight,
        comment: this.updateForm.comment
      };
      this.$api.updateWeightInfo(params).then(res => {
        if (res.code === 200) {
          this.dialogFormUpdateVisible = false;
          this.updateForm = {};
          this.tableData = [];
          this.getToolsInfo();
        }
      });
    },
    handleDelete(index, row) {
      // 删除按钮
      this.deleteForm = {
        id: row.id,
        min_weight: row.min_weight,
        max_weight: row.max_weight,
        comment: row.commet
      };
      this.dialogFormDeleteVisible = true;
    },
    cancelDeleteButton() {
      // 删除的取消按钮
      this.dialogFormDeleteVisible = false;
      this.deleteForm = {};
    },
    deleteWeightInfo() {
      // 删除的确定按钮
      let params = {
        weight_id: this.deleteForm.id
      };
      this.$api.deleteWeightInfo(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.dialogFormDeleteVisible = false;
          this.deleteForm = {};
          this.tableData = [];
          this.getToolsInfo();
        }
      });
    },
    getSingleShelfInfo() {
      // 获取货架信息
      this.$api.getToolSingleInfo().then(res => {
        if (res.code === 200) {
          this.options_warehouse = res.data;
        }
      });
    },
	// 打开搜索页面
    openSearchDialog() {
		this.searchDialogVisible = true;
      	console.log("hello world!");
		// 打开对话框时清空searchForm表单
		this.searchForm.tool_class = null;
		this.searchForm.tool_length = null;
		this.searchForm.tool_diameter = null;
		this.searchForm.tool_weight = null;
		this.searchForm.tool_status = null;
    },
	// 执行查询操作
	search() {
		this.repertoryDialogVisible = true;
		// 发送请求查询库存
		let params = {
			tool_class: this.searchForm.tool_class,
			tool_length: this.searchForm.tool_length,
			tool_diameter: this.searchForm.tool_diameter,
			tool_weight: this.searchForm.tool_weight,
			tool_status: this.searchForm.tool_status,
			page: this.pageSize,
			size: this.size
			
		}
		this.$api.searchReposityInfo(params).then(res => {
        if (res.code === 200) {
          this.reposityTableData = res.data;
		  this.repertoryDialogVisible = true;
		  this.count = res.count;
        }
      });
	},
	// 搜索框重置
	reset(formname) {
		console.log("充值了！");
		this.$refs[formname].resetFields();
	},
	outReposity(data) {
		let params = {
			id: data.id
		}
		console.log("出库：" + JSON.stringify(data));
		this.$confirm('确定要出库吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			this.$api.outReposity(params).then(res=> {
				if(res.code == 200) {
					this.$message({
						type: 'success',
						message: res.msg
					});
				}
			})
        })
		.catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消出库!'
          });          
        });
		// 出库是否成功，都关闭对话框
		this.repertoryDialogVisible = false;
		this.searchDialogVisible = false;
	}

	
  }
};
</script>
<style scoped lang="less">
// .main{
// 	background-color: #f6f7fc;
// 	height: 100%;
// }
.title {
  font-size: 30px;
  padding: 10px 0;
  margin-top: 25px;
}
// .el-pagination {
//   text-align: right;
//   margin-top: 10px;
// }
</style>
