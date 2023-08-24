/**
 *
 */
 export const isEmpty = (variable: any) => {

	if (variable === false) {
		return true;
	}

	if (Array.isArray(variable)) {
		return variable.length === 0;
	}

	if (variable === undefined || variable === null) {
		return true;
	}

	if (typeof variable === 'string' && variable.trim() === '') {
		return true;
	}

	if (typeof variable === 'object') {
		return (Object.entries(variable).length === 0 &&
			!(variable instanceof Date));
	}

	return false;
}

/**
 *
 */
export function copyArrOfObjs(arrOfObjs: any) {
	let tmpArryOfObjs = [];
	for (let obj of arrOfObjs) {
		tmpArryOfObjs.push({...obj});
	}

	return tmpArryOfObjs;
}

/**
 * Convert associative to indexed array
 */
export function parseApiResult(apiResult: any) {
	// Handle if not array
	if (!Array.isArray(apiResult)) {
		let objKeys = Object.keys(apiResult);
		if (!isEmpty(objKeys)) {
			return apiResult[objKeys[0]];
		}
		return apiResult;
	}

	let indArray = [];
	for (let index in apiResult) {

		// Get 1st layer obj keys
		let objKeys = Object.keys(apiResult[index])

		// Add object to array
		if (!isEmpty(objKeys)) {
			indArray.push(apiResult[index][objKeys[0]]);
			continue;
		}
		indArray.push(apiResult[index]);
	}

	return indArray;
}
