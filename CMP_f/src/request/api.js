/**
 * api接口统一管理
 */
import {get,post,postFile,putFile,put,delet} from './http';
import {ipConfig} from '@/config/ipConfig';
import store from '../store/store.js'

// 调用接口的方法
export const model = p => post(ipConfig.urlCMP + '/model', p); //样例接口
export const ShuttleCar = p => get(ipConfig.urlCMP + '/shuttlecar/shuttlecar', p);  // 穿梭成 增 删 查
export const Warehouse = p => get(ipConfig.urlCMP + '/com_tool/warehouse', p);      // 仓库区域 查
export const CreateWarehouse = p => post(ipConfig.urlCMP + '/com_tool/warehouse', p); // 仓库区域 增
export const updateWarehouse = p => post(ipConfig.urlCMP + '/com_tool/update_warehouse', p); // 仓库区域 更
export const deleteWarehouse = p => delet(ipConfig.urlCMP + '/com_tool/warehouse', p); // 仓库区域 删   +p['id']+'/'
export const getWeightInfo = p => get(ipConfig.urlCMP + '/com_tool/weight', p); // 货架重量 查
export const createWeightInfo = p => post(ipConfig.urlCMP + '/com_tool/weight', p); // 货架重量 增
export const updateWeightInfo = p => post(ipConfig.urlCMP + '/com_tool/update_weight', p); // 货架重量 增
export const deleteWeightInfo = p => delet(ipConfig.urlCMP + '/com_tool/weight', p); // 货架重量 删
export const getDiameterInfo = p => get(ipConfig.urlCMP + '/com_tool/diameter', p); // 货架直径 查
export const createDiameterInfo = p => post(ipConfig.urlCMP + '/com_tool/diameter', p); // 货架直径 增
export const updateDiameterInfo = p => post(ipConfig.urlCMP + '/com_tool/update_diameter', p); // 货架直径 更
export const deleteDiameterInfo = p => delet(ipConfig.urlCMP + '/com_tool/diameter', p); // 货架直径 更
export const getShelfInfo = p => get(ipConfig.urlCMP + '/com_tool/shelf', p); // 货架信息 查
export const getWareHouseSelect = p => get(ipConfig.urlCMP + '/com_tool/warehouse_select', p); // 货架信息 选择
export const getWeightSelect = p => get(ipConfig.urlCMP + '/com_tool/weight_select', p); // 货架重量 选择
export const getDiameterSelect = p => get(ipConfig.urlCMP + '/com_tool/diameter_select', p); // 货架直径 选择
export const createShelf = p => post(ipConfig.urlCMP + '/com_tool/shelf', p); // 货架 add
export const getToolsInfo = p => get(ipConfig.urlCMP + '/com_tool/tool_info', p); // 工具 查
export const createToolsInfo = p => post(ipConfig.urlCMP + '/com_tool/tool_info', p); // 工具 add
export const getToolSingleInfo = p => get(ipConfig.urlCMP + '/com_tool/tool_info_single', p);  // 获取货架信息
export const searchReposityInfo = p => get(ipConfig.urlCMP + '/com_tool/tool_info', p);  // 通过查询条件获取库存信息

export const outReposity = p => get(ipConfig.urlCMP + '/com_tool/tool_output', p); // 出库

export const getShuttleInfo = p => get(ipConfig.urlCMP + '/com_tool/shuttlecar', p); // 获取穿梭车信息

export const addShuttle = p => post(ipConfig.urlCMP + '/com_tool/shuttlecar', p); // 出库

export const updateShuttleInfo = p => post(ipConfig.urlCMP + '/com_tool/update_shuttlecar', p); // 出库

export const deleteShuttleInfo = p => delet(ipConfig.urlCMP + '/com_tool/shuttlecar', p); // 出库

export const getTransferInfo = p => get(ipConfig.urlCMP + '/com_tool/transfercar', p); // 获取移载信息

export const addTransfer = p => post(ipConfig.urlCMP + '/com_tool/transfercar', p); // 添加

export const updateTransfer = p => post(ipConfig.urlCMP + '/com_tool/update_transfercar', p); // 更新

export const deleteTransferInfo = p => delet(ipConfig.urlCMP + '/com_tool/transfercar', p); // 更新

deleteTransferInfo
export default {
	model,
	ShuttleCar,
	Warehouse,
	CreateWarehouse,
	updateWarehouse,
	deleteWarehouse,
	getWeightInfo,
	createWeightInfo,
	updateWeightInfo,
	deleteWeightInfo,
	getDiameterInfo,
	createDiameterInfo,
	updateDiameterInfo,
	deleteDiameterInfo,
	getShelfInfo,
	getWareHouseSelect,
	getWeightSelect,
	getDiameterSelect,
	createShelf,
	getToolsInfo,
	getToolSingleInfo,
	createToolsInfo,
	searchReposityInfo,
	outReposity,
	getShuttleInfo,
	addShuttle,
	updateShuttleInfo,
	deleteShuttleInfo,
	getTransferInfo,
	addTransfer,
	updateTransfer,
	deleteTransferInfo,
}
