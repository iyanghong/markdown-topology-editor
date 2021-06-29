import crypt from './crypt'
import {isObject,isArray} from "./types";

function get(key){
	if(!key) return '';
	let value = '';
	try{
		value = driver.get(cryptKey(key));
		value = crypt.decrypt(value);
	}catch(e){
		console.log(e);
	}
	return value;
}
function getJson(key){
	if(!key) return;
	let value = null;
	try{
		value = driver.get(cryptKey(key));
		value = crypt.decrypt(value);
		if(value!== null && !isObject(value)){

			value = JSON.parse(value);
		}
	}catch(e){
		console.log(e);
	}
	return value;
}

function set(key,value){
	if(!key) return;
	try{
		if(isObject(value) || isArray(value)){
			value = JSON.stringify(value);
		}
		if(typeof value === 'number'){
			value = value.toString();
		}
		driver.set(cryptKey(key),crypt.encrypt(value));
	}catch(e){
		console.log(e);
	}
}

function del(key){
	if(!key) return;
	driver.del(cryptKey(key));
}
/**
 * 加密key值
 * @param {Object} name
 */
function cryptKey(name){
	name = (process.env.VUE_APP_NAME || '') + '_' + name;
	return crypt.encrypt(name);
}



/**
 * 缓存驱动
 * 可更改为localStorage之外的缓存方式
 */
const driver = {
	set : function(key,value){
		try{
			localStorage.setItem(key,value);
		}catch(e){
			console.log(e);
		}
	},
	get : function(key){
		let value = '';
		try{
			value = localStorage.getItem(key);
		}catch(e){
			console.log(e);
		}
		return value;
	},
	del : function(key){
		try{
			localStorage.removeItem(key);
		}catch(e){
			console.log(e);
		}
	}
};


export default{
	get,
	getJson,
	set,
	del
}
