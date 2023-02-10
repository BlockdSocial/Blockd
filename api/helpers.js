// Libraries
import humps from 'humps';

// Config
import { api, SYNTAX_ERROR, SERVER_ERROR } from './config';

// Stores
import { store } from '../stores/rootStore';

// Utils
import {
	triggerApiConflictAlert,
	triggerUnauthorizedUserAlert
} from '../utils/alertUtils';
import { shouldPassErrorCode } from './utils';
import { deleteCookie } from 'cookies-next';

// Helpers
import { isEmpty } from '../helpers/utils';
import { getDOMData } from '../utils/domUtils';

let testApiName = 'none';

/**
 *
 */
export const apiCall = async (
	apiName,
	method,
	endpoint,
	fields = {},
	headers = {},
	signal = null
) => {

	// Configure default query string
	let queryString = '';
	// const authToken = JSON.parse(localStorage.getItem('token') || '');
	const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : ''

	// Configure default header
	headers = {
		...headers,
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + authToken
	};

	// Body build-up
	let body = null;
	switch (method) {

		// GET request fields format
		case 'GET': {
			for (let key in fields) {
				queryString += `${key}=${encodeURIComponent(fields[key])}&&`;
			}
			break;
		}

		// POST request fields format
		case 'POST': {
			body = getPostRequestFieldFormat(fields, body);
			break;
		}

		// PUT & DELETE request fields format
		case 'PUT':
		case 'DELETE': {
			body = JSON.stringify(fields);
			break;
		}
	}

	// Query string builder
	if (!isEmpty(queryString)) {
		queryString = queryString.substring(0, queryString.length - 2);
	}

	let response = null
	try {
		// Fetch results
		response = await fetch(
			`${api}/${endpoint}`
			+ queryString,
			{
				method,
				headers: { ...headers },
				body,
				signal
			}
		);

		console.log('response: ', response);

		// Handle response status
		let result = await handleApiResponse(apiName, response);
		return result;

	} catch (error) {

		// Api call aborted
		if (error.name === 'AbortError') {
			throw 'Aborted api call';
		}

		// Read-in error code
		let errorCode = 500;
		if (!isEmpty(response) && response.hasOwnProperty('status')) {
			errorCode = response.status;
		}

		// Handle error
		errorHandler(apiName, error, errorCode);
	}
}

/**
 *
 */
const getGetRequestFieldFormat = (fields, queryString) => {
	for (let key in fields) {
		queryString += `${key}=${encodeURIComponent(fields[key])}&&`;
	}
}

/**
 *
 */
const getPostRequestFieldFormat = (fields, body) => {

	// Array format
	if (Array.isArray(fields)) {
		body = JSON.stringify(fields);
		return body;
	}

	// JSON format
	body = new FormData();
	for (let key in fields) {

		// File instance
		if (typeof fields[key] === 'object' && fields[key] instanceof File) {
			body.append(key, fields[key]);
			continue;
		}

		// Array or object
		if (Array.isArray(fields[key]) || typeof fields[key] === 'object') {
			let jsonString = JSON.stringify(fields[key]);
			body.append(key, jsonString);
			continue;
		}

		// String or number
		body.append(key, fields[key]);
	}

	return body;
}

/**
 *
 */
const getPutDeleteRequestFieldFormat = (fields, body) => {
	body = JSON.stringify(fields);
	return body;
}

/**
 *
 */
const handleApiResponse = async (apiName, response) => {
	console.log(`${apiName} api response: `, response);

	// Handle test api
	if (apiName === testApiName) {
		let textDebugResponse = await response.text();
		console.log(`${apiName} api debug text response: `, textDebugResponse);
	}

	// Handle response by status
	switch (response.status) {
		case 200: {
			return await handleSuccessfulApiResponse(apiName, response);
		}
		case 201: {
			console.log(`Successful ${apiName} empty result`);
			return 'success';
		}

		// Conflict error code
		case 409: {
			let failedResponse = await response.json();
			if (failedResponse.hasOwnProperty('result')) {

				if (failedResponse.result.hasOwnProperty('error')) {
					if (failedResponse.result.error.details) {
						triggerApiConflictAlert(failedResponse.result.error.details);
					}
					throw failedResponse.result.error;
				}
			}
		}
		case 417:
		case 401: {
			localStorage.removeItem("token");
			deleteCookie("token");
			window.location.replace('/');
			let failedResponse = await response.json();
			if (failedResponse.hasOwnProperty('result')) {

				if (failedResponse.result.hasOwnProperty('error')) {
					throw failedResponse.result.error;
				}

				throw failedResponse.result;
			}
			return false;
		}
		case 400:
		case 422: {
			let failedResponse = await response.json();
			throw failedResponse.result.error;
			return false;
		}
		case 403:
			{
				localStorage.removeItem("token");
				deleteCookie("token");
				window.location.replace('/');
				let textResponse = await response.text();
				console.log('textResponse: ', textResponse);
				return false;
			}
		case 404: {
			let failedResponse = await response.json();
			throw failedResponse.result.error;
			return false;
		}
		case 500: {
			return await handleServerFailureApiResponse(apiName, response);
		}
		default: {
			let textResponse = await response.text();
			console.log('textResponse: ', textResponse);
			return false;
		}
	}
}

/**
 *
 */
const handleSuccessfulApiResponse = async (apiName, response) => {
	let jsonResponse = await response.json();
	console.log(`Successful ${apiName} api json response: `, jsonResponse);

	// Validate app
	let result = humps.camelizeKeys(jsonResponse);
	return result;
}

/**
 *
 */
const handleServerFailureApiResponse = async (apiName, response) => {
	let errorTextResponse = await response.text();
	console.log(`Server failure ${apiName} api text response: `, errorTextResponse);
}

/**
 *
 */
export const errorHandler = (apiName, error, errorStatus = null) => {
	console.log(`Api error handler ${apiName}: `, error);

	// Error details
	if (!isEmpty(error.details)) {

		// List of errors
		if (Array.isArray(error.details)) {
			throw error.details[0];
			return;
		}

		if (shouldPassErrorCode(apiName) && !isEmpty(errorStatus)) {
			throw { message: error.details, errorCode: errorStatus };
		}

		throw error.details;
		return;
	}

	// Network generated error
	if (!isEmpty(error.message) && error.message.includes(SYNTAX_ERROR)) {
		// Throw error and return
		throw SERVER_ERROR;
		return;
	}

	throw error.errorMessage;
}

/**
 *
 */
const handleApiJsonResponse = (apiName, responseJson) => {
	console.log(`${apiName} api json response: `, responseJson);
	return
}

/**
 *
 */
function _getError(failedResponse) {
	let error = failedResponse.result.error;

	if (error && error.details) {
		return error.details;
	}

	if (error && error.message) {
		return error.message;
	}

	return error;
}

/**
 *
 */
export function endpointParser(fields) {
}
