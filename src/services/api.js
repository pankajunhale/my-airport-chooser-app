import {ajax} from 'rxjs/ajax';
const BASE_URL = `api/`;

const get = (api)=>{
	return ajax.getJSON(`${BASE_URL}${api}`);
}

const getLocalJsonData = (url)=>{
	return fetch(`${url}`)
}

const post = (api,data) =>{
	return ajax(
		{
			url: `${BASE_URL}${api}`, 
			method : 'POST',
			headers : {
			  'Content-Type': 'application/json'
			},
			body: data
		}
	);
}

export {
	get,
	getLocalJsonData,
	post
}