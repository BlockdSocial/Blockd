// Libraries
import humps from 'humps';

// Config
import { api, SYNTAX_ERROR, SERVER_ERROR } from './config';

import { shouldPassErrorCode } from './utils';
import { triggerUnauthorizedUserAlert } from '../utils/alertUtils';

// Helpers
import { isEmpty } from 'lodash';
import { deleteCookie } from 'cookies-next';

let testApiName = 'none';

/**
 *
 */
export const apiCall = async (
	apiName: any,
	method: any,
	endpoint: any,
	fields = {} as any,
	headers = {},
	signal = null
) => {

	// Configure default query string
	let queryString = '';
	const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token') as any) : '';

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

	let response: any = null
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

		// Handle response status
		let result = await handleApiResponse(apiName, response);
		return result;

	} catch (error: any) {
		// Api call aborted
		if (error.name === 'AbortError') {
			throw 'Aborted api call';
		}

		// Read-in error code
		let errorCode: any = 500;
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
const getPostRequestFieldFormat = (fields: any, body: any) => {

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
const getPutDeleteRequestFieldFormat = (fields: any, body: any) => {
	body = JSON.stringify(fields);
	return body;
}

/**
 *
 */
const handleApiResponse = async (apiName: any, response: any) => {
	console.log(`${apiName} api response: `, response);

	// Handle test api
	if (apiName === testApiName) {
		let textDebugResponse = await response.text();
		console.log(`${apiName} api debug text response: `, textDebugResponse);
	}

	// Handle response by status
	const status: any = response.status;
	switch (true) {
		case status == 200: {
			return await handleSuccessfulApiResponse(apiName, response);
		}
		case status == 201: {
			console.log(`Successful ${apiName} empty result`);
			return 'success';
		}

		case status == 401:
		case status == 403: {
			let failedResponse: any = await response.json();
			triggerUnauthorizedUserAlert().then(() => {
				localStorage.removeItem('token');
				deleteCookie('token');
				window.location.replace('/');
			});
			throw new Error(failedResponse.message);
		}

		// Conflict error code
		case 400 <= status && status <= 500: {
			let failedResponse: any = await response.json();
			throw new Error(failedResponse.message);
		}
		default: {
			let textResponse = await response.text();
			console.log('textResponse: ', textResponse);
			return textResponse;
		}
	}
}

/**
 *
 */
const handleSuccessfulApiResponse = async (apiName: any, response: any) => {
	let jsonResponse = await response.json();
	console.log(`Successful ${apiName} api json response: `, jsonResponse);

	// Validate app
	let result = humps.camelizeKeys(jsonResponse);
	return result;
}

/**
 *
 */
export const errorHandler = (apiName: any, error: any, errorStatus = null) => {
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

	throw error;
}

/**
 *
 */
export function endpointParser(fields: any) {
}
