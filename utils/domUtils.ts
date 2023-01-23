// Utils
import { isEmpty } from '../utils';

/**
 *
 */
export function getDOMData(field: any, eltId = '') {
	let elt = null;

  if (!isEmpty(eltId)) {
    elt = getElementById(eltId);
  }

  if (elt === null) {
    elt = document.getElementById('react_meta-data');
  }

	if (elt) {
		let data = elt.getAttribute(`data-${field}`);
		return data;
	}

	return false;
}

/**
 *
 */
export function setDOMData(field: any, value: any) {
	let elt = document.getElementById('react_meta-data');
  if (elt && elt.nodeType) {
    elt.setAttribute(`data-${field}`, value);
  }
}

/**
 *
 */
export function getElementById(id: any) {
	let elt = document.getElementById(id);
	return elt;
}

/**
 *
 */
export function appendScript(src: any, integrity = null, crossorigin = null) {
	const script = document.createElement("script");
	script.setAttribute('src', src);

  // Integrity attribute
  if (integrity) {
    script.setAttribute('integrity', integrity);
  }

  // Cross origin attribute
  if (crossorigin) {
    script.setAttribute('crossorigin', crossorigin);
  }

	script.async = true;
	document.body.appendChild(script);
}