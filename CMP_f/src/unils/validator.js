//验证JSON格式
export function validatorJSON(rule, value, callback){
	if (!value) {
		return callback(new Error("请输入响应数据"));
	} else {
		if (typeof value == 'string') {
			try {
				var obj=JSON.parse(value);
				if(typeof obj == 'object' && obj ){
					callback();
				}else{
					return callback(new Error('响应数据格式不正确!!!请输入正确JSON格式'))
				}
			} catch(e) {
				return callback(new Error('响应数据格式不正确!!!请输入正确JSON格式'))
			}
		}
	}
};