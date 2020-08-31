const object2params = (obj) => {
	let output = [];
	for (let key in obj) {
		output.push(key + "=" + JSON.stringify(obj[key]));
	}
	return output.join("&");
};

export default object2params;