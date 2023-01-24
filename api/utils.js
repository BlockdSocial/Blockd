// Pass error code api calls
const passErrorCodeApis = [];
let abortables = {};

/**
 *
 */
export function shouldPassErrorCode(apiCall) {
  return passErrorCodeApis.includes(apiCall);
}

/**
 *
 */
export function isAbortError(error) {
  return error === 'Aborted api call';
}

/**
 *
 */
export async function abortHandler({abortKey, request, fields}) {
  if (abortables.hasOwnProperty(abortKey)) {
    abortables[abortKey]();
  }

  // Call abortable api
  const { abort, call } = abortableRequest(
    request,
    fields
  );

  // Add abort function
  abortables[abortKey] = abort;

  // Get api result
  const result = await call();

  // Remove abort key
  delete abortables[abortKey];

  return result;
}

/**
 *
 */
export function abortableRequest(request, fields) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    call: async () => request(fields, signal)
  };
}
