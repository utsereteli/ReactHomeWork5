(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static\\development\\pages\\countries\\[slug].js"],{

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fcountries%2F%5Bslug%5D&absolutePagePath=D%3A%5Cpersonal%5Creact%5Creact_group_1%5Chomework2%5Cpages%5Ccountries%5C%5Bslug%5D.js!./":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fcountries%2F%5Bslug%5D&absolutePagePath=D%3A%5Cpersonal%5Creact%5Creact_group_1%5Chomework2%5Cpages%5Ccountries%5C%5Bslug%5D.js ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/countries/[slug]",
      function () {
        return __webpack_require__(/*! ./pages/countries/[slug].js */ "./pages/countries/[slug].js");
      }
    ]);
  

/***/ }),

/***/ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/react-number-format/dist/react-number-format.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-number-format/dist/react-number-format.es.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * react-number-format - 4.4.1
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2020 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-number-format
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

// basic noop function
function noop() {}
function returnTrue() {
  return true;
}
function charIsNumber(_char) {
  return !!(_char || '').match(/\d/);
}
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;

    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;

    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator);
} //spilt a float number into different parts beforeDecimal, afterDecimal, and negation

function splitDecimal(numStr) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var hasNagation = numStr[0] === '-';
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');
  var parts = numStr.split('.');
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || '';
  return {
    beforeDecimal: beforeDecimal,
    afterDecimal: afterDecimal,
    hasNagation: hasNagation,
    addNegation: addNegation
  };
}
function fixLeadingZero(numStr) {
  if (!numStr) return numStr;
  var isNegative = numStr[0] === '-';
  if (isNegative) numStr = numStr.substring(1, numStr.length);
  var parts = numStr.split('.');
  var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  var afterDecimal = parts[1] || '';
  return "".concat(isNegative ? '-' : '').concat(beforeDecimal).concat(afterDecimal ? ".".concat(afterDecimal) : '');
}
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */

function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = '';
  var filler = fixedDecimalScale ? '0' : '';

  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }

  return str;
}
/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */

function roundToPrecision(numStr, scale, fixedDecimalScale) {
  //if number is empty don't do anything return empty string
  if (['', '-'].indexOf(numStr) !== -1) return numStr;
  var shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;

  var _splitDecimal = splitDecimal(numStr),
      beforeDecimal = _splitDecimal.beforeDecimal,
      afterDecimal = _splitDecimal.afterDecimal,
      hasNagation = _splitDecimal.hasNagation;

  var roundedDecimalParts = parseFloat("0.".concat(afterDecimal || '0')).toFixed(scale).split('.');
  var intPart = beforeDecimal.split('').reverse().reduce(function (roundedStr, current, idx) {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }

    return current + roundedStr;
  }, roundedDecimalParts[0]);
  var decimalPart = limitToScale(roundedDecimalParts[1] || '', Math.min(scale, afterDecimal.length), fixedDecimalScale);
  var negation = hasNagation ? '-' : '';
  var decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return "".concat(negation).concat(intPart).concat(decimalSeparator).concat(decimalPart);
}
function omit(obj, keyMaps) {
  var filteredObj = {};
  Object.keys(obj).forEach(function (key) {
    if (!keyMaps[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
}
/** set the caret positon in an input field **/

function setCaretPosition(el, caretPos) {
  el.value = el.value; // ^ this is used to not only get "focus", but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)

  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    } // (el.selectionStart === 0 added for Firefox bug)


    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    } // fail city, fortunately this never happens (as far as I've tested) :)


    el.focus();
    return false;
  }
}
/**
  Given previous value and newValue it returns the index
  start - end to which values have changed.
  This function makes assumption about only consecutive
  characters are changed which is correct assumption for caret input.
*/

function findChangedIndex(prevValue, newValue) {
  var i = 0,
      j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;

  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  } //check what has been changed from last


  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }

  return {
    start: i,
    end: prevLength - j
  };
}
/*
  Returns a number whose value is limited to the given range
*/

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function getCurrentCaretPosition(el) {
  /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
  return Math.max(el.selectionStart, el.selectionEnd);
}

var propTypes$1 = {
  thousandSeparator: propTypes.oneOfType([propTypes.string, propTypes.oneOf([true])]),
  decimalSeparator: propTypes.string,
  allowedDecimalSeparators: propTypes.arrayOf(propTypes.string),
  thousandsGroupStyle: propTypes.oneOf(['thousand', 'lakh', 'wan']),
  decimalScale: propTypes.number,
  fixedDecimalScale: propTypes.bool,
  displayType: propTypes.oneOf(['input', 'text']),
  prefix: propTypes.string,
  suffix: propTypes.string,
  format: propTypes.oneOfType([propTypes.string, propTypes.func]),
  removeFormatting: propTypes.func,
  mask: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),
  value: propTypes.oneOfType([propTypes.number, propTypes.string]),
  defaultValue: propTypes.oneOfType([propTypes.number, propTypes.string]),
  isNumericString: propTypes.bool,
  customInput: propTypes.elementType,
  allowNegative: propTypes.bool,
  allowEmptyFormatting: propTypes.bool,
  allowLeadingZeros: propTypes.bool,
  onValueChange: propTypes.func,
  onKeyDown: propTypes.func,
  onMouseUp: propTypes.func,
  onChange: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  type: propTypes.oneOf(['text', 'tel', 'password']),
  isAllowed: propTypes.func,
  renderText: propTypes.func,
  getInputRef: propTypes.oneOfType([propTypes.func, // for legacy refs
  propTypes.shape({
    current: propTypes.any
  })])
};
var defaultProps = {
  displayType: 'input',
  decimalSeparator: '.',
  thousandsGroupStyle: 'thousand',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  allowNegative: true,
  allowEmptyFormatting: false,
  allowLeadingZeros: false,
  isNumericString: false,
  type: 'text',
  onValueChange: noop,
  onChange: noop,
  onKeyDown: noop,
  onMouseUp: noop,
  onFocus: noop,
  onBlur: noop,
  isAllowed: returnTrue
};

var NumberFormat =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberFormat, _React$Component);

  function NumberFormat(props) {
    var _this;

    _classCallCheck(this, NumberFormat);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberFormat).call(this, props));
    var defaultValue = props.defaultValue; //validate props

    _this.validateProps();

    var formattedValue = _this.formatValueProp(defaultValue);

    _this.state = {
      value: formattedValue,
      numAsString: _this.removeFormatting(formattedValue)
    };
    _this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NumberFormat, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateValueIfRequired(prevProps);
    }
  }, {
    key: "updateValueIfRequired",
    value: function updateValueIfRequired(prevProps) {
      var props = this.props,
          state = this.state,
          focusedElm = this.focusedElm;
      var stateValue = state.value,
          _state$numAsString = state.numAsString,
          lastNumStr = _state$numAsString === void 0 ? '' : _state$numAsString; // If only state changed no need to do any thing

      if (prevProps !== props) {
        //validate props
        this.validateProps();
        var lastValueWithNewFormat = this.formatNumString(lastNumStr);
        var formattedValue = props.value === undefined ? lastValueWithNewFormat : this.formatValueProp();
        var numAsString = this.removeFormatting(formattedValue);
        var floatValue = parseFloat(numAsString);
        var lastFloatValue = parseFloat(lastNumStr);

        if ( //while typing set state only when float value changes
        (!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue || //can also set state when float value is same and the format props changes
        lastValueWithNewFormat !== stateValue || //set state always when not in focus and formatted value is changed
        focusedElm === null && formattedValue !== stateValue) {
          this.updateValue({
            formattedValue: formattedValue,
            numAsString: numAsString,
            input: focusedElm
          });
        }
      }
    }
    /** Misc methods **/

  }, {
    key: "getFloatString",
    value: function getFloatString() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var decimalScale = this.props.decimalScale;

      var _this$getSeparators = this.getSeparators(),
          decimalSeparator = _this$getSeparators.decimalSeparator;

      var numRegex = this.getNumberRegex(true); //remove negation for regex check

      var hasNegation = num[0] === '-';
      if (hasNegation) num = num.replace('-', ''); //if decimal scale is zero remove decimal and number after decimalSeparator

      if (decimalSeparator && decimalScale === 0) {
        num = num.split(decimalSeparator)[0];
      }

      num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.'); //remove extra decimals

      var firstDecimalIndex = num.indexOf('.');

      if (firstDecimalIndex !== -1) {
        num = "".concat(num.substring(0, firstDecimalIndex), ".").concat(num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), ''));
      } //add negation back


      if (hasNegation) num = '-' + num;
      return num;
    } //returned regex assumes decimalSeparator is as per prop

  }, {
    key: "getNumberRegex",
    value: function getNumberRegex(g, ignoreDecimalSeparator) {
      var _this$props = this.props,
          format = _this$props.format,
          decimalScale = _this$props.decimalScale;

      var _this$getSeparators2 = this.getSeparators(),
          decimalSeparator = _this$getSeparators2.decimalSeparator;

      return new RegExp('\\d' + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? '|' + escapeRegExp(decimalSeparator) : ''), g ? 'g' : undefined);
    }
  }, {
    key: "getSeparators",
    value: function getSeparators() {
      var decimalSeparator = this.props.decimalSeparator;
      var _this$props2 = this.props,
          thousandSeparator = _this$props2.thousandSeparator,
          allowedDecimalSeparators = _this$props2.allowedDecimalSeparators;

      if (thousandSeparator === true) {
        thousandSeparator = ',';
      }

      if (!allowedDecimalSeparators) {
        allowedDecimalSeparators = [decimalSeparator, '.'];
      }

      return {
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator,
        allowedDecimalSeparators: allowedDecimalSeparators
      };
    }
  }, {
    key: "getMaskAtIndex",
    value: function getMaskAtIndex(index) {
      var _this$props$mask = this.props.mask,
          mask = _this$props$mask === void 0 ? ' ' : _this$props$mask;

      if (typeof mask === 'string') {
        return mask;
      }

      return mask[index] || ' ';
    }
  }, {
    key: "getValueObject",
    value: function getValueObject(formattedValue, numAsString) {
      var floatValue = parseFloat(numAsString);
      return {
        formattedValue: formattedValue,
        value: numAsString,
        floatValue: isNaN(floatValue) ? undefined : floatValue
      };
    }
  }, {
    key: "validateProps",
    value: function validateProps() {
      var mask = this.props.mask; //validate decimalSeparator and thousandSeparator

      var _this$getSeparators3 = this.getSeparators(),
          decimalSeparator = _this$getSeparators3.decimalSeparator,
          thousandSeparator = _this$getSeparators3.thousandSeparator;

      if (decimalSeparator === thousandSeparator) {
        throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: ".concat(thousandSeparator, " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n          decimalSeparator: ").concat(decimalSeparator, " (default value for decimalSeparator is .)\n       "));
      } //validate mask


      if (mask) {
        var maskAsStr = mask === 'string' ? mask : mask.toString();

        if (maskAsStr.match(/\d/g)) {
          throw new Error("\n          Mask ".concat(mask, " should not contain numeric character;\n        "));
        }
      }
    }
    /** Misc methods end **/

    /** caret specific methods **/

  }, {
    key: "setPatchedCaretPosition",
    value: function setPatchedCaretPosition(el, caretPos, currentValue) {
      /* setting caret position within timeout of 0ms is required for mobile chrome,
      otherwise browser resets the caret position after we set it
      We are also setting it without timeout so that in normal browser we don't see the flickering */
      setCaretPosition(el, caretPos);
      setTimeout(function () {
        if (el.value === currentValue) setCaretPosition(el, caretPos);
      }, 0);
    }
    /* This keeps the caret within typing area so people can't type in between prefix or suffix */

  }, {
    key: "correctCaretPosition",
    value: function correctCaretPosition(value, caretPos, direction) {
      var _this$props3 = this.props,
          prefix = _this$props3.prefix,
          suffix = _this$props3.suffix,
          format = _this$props3.format; //if value is empty return 0

      if (value === '') return 0; //caret position should be between 0 and value length

      caretPos = clamp(caretPos, 0, value.length); //in case of format as number limit between prefix and suffix

      if (!format) {
        var hasNegation = value[0] === '-';
        return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
      } //in case if custom format method don't do anything


      if (typeof format === 'function') return caretPos;
      /* in case format is string find the closest # position from the caret position */
      //in case the caretPos have input value on it don't do anything

      if (format[caretPos] === '#' && charIsNumber(value[caretPos])) return caretPos; //if caretPos is just after input value don't do anything

      if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) return caretPos; //find the nearest caret position

      var firstHashPosition = format.indexOf('#');
      var lastHashPosition = format.lastIndexOf('#'); //limit the cursor between the first # position and the last # position

      caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);
      var nextPos = format.substring(caretPos, format.length).indexOf('#');
      var caretLeftBound = caretPos;
      var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos); //get the position where the last number is present

      while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))) {
        caretLeftBound -= 1;
      }

      var goToLeft = !charIsNumber(value[caretRightBound]) || direction === 'left' && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBound - caretPos;

      if (goToLeft) {
        //check if number should be taken after the bound or after it
        //if number preceding a valid number keep it after
        return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
      }

      return caretRightBound;
    }
  }, {
    key: "getCaretPosition",
    value: function getCaretPosition(inputValue, formattedValue, caretPos) {
      var format = this.props.format;
      var stateValue = this.state.value;
      var numRegex = this.getNumberRegex(true);
      var inputNumber = (inputValue.match(numRegex) || []).join('');
      var formattedNumber = (formattedValue.match(numRegex) || []).join('');
      var j, i;
      j = 0;

      for (i = 0; i < caretPos; i++) {
        var currentInputChar = inputValue[i] || '';
        var currentFormatChar = formattedValue[j] || ''; //no need to increase new cursor position if formatted value does not have those characters
        //case inputValue = 1a23 and formattedValue =  123

        if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) continue; //When we are striping out leading zeros maintain the new cursor position
        //Case inputValue = 00023 and formattedValue = 23;

        if (currentInputChar === '0' && currentFormatChar.match(numRegex) && currentFormatChar !== '0' && inputNumber.length !== formattedNumber.length) continue; //we are not using currentFormatChar because j can change here

        while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
          j++;
        }

        j++;
      }

      if (typeof format === 'string' && !stateValue) {
        //set it to the maximum value so it goes after the last number
        j = formattedValue.length;
      } //correct caret position if its outside of editable area


      j = this.correctCaretPosition(formattedValue, j);
      return j;
    }
    /** caret specific methods ends **/

    /** methods to remove formattting **/

  }, {
    key: "removePrefixAndSuffix",
    value: function removePrefixAndSuffix(val) {
      var _this$props4 = this.props,
          format = _this$props4.format,
          prefix = _this$props4.prefix,
          suffix = _this$props4.suffix; //remove prefix and suffix

      if (!format && val) {
        var isNegative = val[0] === '-'; //remove negation sign

        if (isNegative) val = val.substring(1, val.length); //remove prefix

        val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val; //remove suffix

        var suffixLastIndex = val.lastIndexOf(suffix);
        val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val; //add negation sign back

        if (isNegative) val = '-' + val;
      }

      return val;
    }
  }, {
    key: "removePatternFormatting",
    value: function removePatternFormatting(val) {
      var format = this.props.format;
      var formatArray = format.split('#').filter(function (str) {
        return str !== '';
      });
      var start = 0;
      var numStr = '';

      for (var i = 0, ln = formatArray.length; i <= ln; i++) {
        var part = formatArray[i] || ''; //if i is the last fragment take the index of end of the value
        //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##

        var index = i === ln ? val.length : val.indexOf(part, start);
        /* in any case if we don't find the pattern part in the value assume the val as numeric string
        This will be also in case if user has started typing, in any other case it will not be -1
        unless wrong prop value is provided */

        if (index === -1) {
          numStr = val;
          break;
        } else {
          numStr += val.substring(start, index);
          start = index + part.length;
        }
      }

      return (numStr.match(/\d/g) || []).join('');
    }
  }, {
    key: "removeFormatting",
    value: function removeFormatting(val) {
      var _this$props5 = this.props,
          format = _this$props5.format,
          removeFormatting = _this$props5.removeFormatting;
      if (!val) return val;

      if (!format) {
        val = this.removePrefixAndSuffix(val);
        val = this.getFloatString(val);
      } else if (typeof format === 'string') {
        val = this.removePatternFormatting(val);
      } else if (typeof removeFormatting === 'function') {
        //condition need to be handled if format method is provide,
        val = removeFormatting(val);
      } else {
        val = (val.match(/\d/g) || []).join('');
      }

      return val;
    }
    /** methods to remove formattting end **/

    /*** format specific methods start ***/

    /**
     * Format when # based string is provided
     * @param  {string} numStr Numeric String
     * @return {string}        formatted Value
     */

  }, {
    key: "formatWithPattern",
    value: function formatWithPattern(numStr) {
      var format = this.props.format;
      var hashCount = 0;
      var formattedNumberAry = format.split('');

      for (var i = 0, ln = format.length; i < ln; i++) {
        if (format[i] === '#') {
          formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
          hashCount += 1;
        }
      }

      return formattedNumberAry.join('');
    }
    /**
     * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
     * @return {string} formatted Value
     */

  }, {
    key: "formatAsNumber",
    value: function formatAsNumber(numStr) {
      var _this$props6 = this.props,
          decimalScale = _this$props6.decimalScale,
          fixedDecimalScale = _this$props6.fixedDecimalScale,
          prefix = _this$props6.prefix,
          suffix = _this$props6.suffix,
          allowNegative = _this$props6.allowNegative,
          thousandsGroupStyle = _this$props6.thousandsGroupStyle;

      var _this$getSeparators4 = this.getSeparators(),
          thousandSeparator = _this$getSeparators4.thousandSeparator,
          decimalSeparator = _this$getSeparators4.decimalSeparator;

      var hasDecimalSeparator = numStr.indexOf('.') !== -1 || decimalScale && fixedDecimalScale;

      var _splitDecimal = splitDecimal(numStr, allowNegative),
          beforeDecimal = _splitDecimal.beforeDecimal,
          afterDecimal = _splitDecimal.afterDecimal,
          addNegation = _splitDecimal.addNegation; // eslint-disable-line prefer-const
      //apply decimal precision if its defined


      if (decimalScale !== undefined) afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);

      if (thousandSeparator) {
        beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
      } //add prefix and suffix


      if (prefix) beforeDecimal = prefix + beforeDecimal;
      if (suffix) afterDecimal = afterDecimal + suffix; //restore negation sign

      if (addNegation) beforeDecimal = '-' + beforeDecimal;
      numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || '') + afterDecimal;
      return numStr;
    }
  }, {
    key: "formatNumString",
    value: function formatNumString() {
      var numStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _this$props7 = this.props,
          format = _this$props7.format,
          allowEmptyFormatting = _this$props7.allowEmptyFormatting;
      var formattedValue = numStr;

      if (numStr === '' && !allowEmptyFormatting) {
        formattedValue = '';
      } else if (numStr === '-' && !format) {
        formattedValue = '-';
      } else if (typeof format === 'string') {
        formattedValue = this.formatWithPattern(formattedValue);
      } else if (typeof format === 'function') {
        formattedValue = format(formattedValue);
      } else {
        formattedValue = this.formatAsNumber(formattedValue);
      }

      return formattedValue;
    }
  }, {
    key: "formatValueProp",
    value: function formatValueProp(defaultValue) {
      var _this$props8 = this.props,
          format = _this$props8.format,
          decimalScale = _this$props8.decimalScale,
          fixedDecimalScale = _this$props8.fixedDecimalScale,
          allowEmptyFormatting = _this$props8.allowEmptyFormatting;
      var _this$props9 = this.props,
          _this$props9$value = _this$props9.value,
          value = _this$props9$value === void 0 ? defaultValue : _this$props9$value,
          isNumericString = _this$props9.isNumericString;
      var isNonNumericFalsy = !value && value !== 0;

      if (isNonNumericFalsy && allowEmptyFormatting) {
        value = '';
      } // if value is not defined return empty string


      if (isNonNumericFalsy && !allowEmptyFormatting) return '';

      if (typeof value === 'number') {
        value = value.toString();
        isNumericString = true;
      } //change infinity value to empty string


      if (value === 'Infinity' && isNumericString) {
        value = '';
      } //round the number based on decimalScale
      //format only if non formatted value is provided


      if (isNumericString && !format && typeof decimalScale === 'number') {
        value = roundToPrecision(value, decimalScale, fixedDecimalScale);
      }

      var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);
      return formattedValue;
    }
  }, {
    key: "formatNegation",
    value: function formatNegation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var allowNegative = this.props.allowNegative;
      var negationRegex = new RegExp('(-)');
      var doubleNegationRegex = new RegExp('(-)(.)*(-)'); // Check number has '-' value

      var hasNegation = negationRegex.test(value); // Check number has 2 or more '-' values

      var removeNegation = doubleNegationRegex.test(value); //remove negation

      value = value.replace(/-/g, '');

      if (hasNegation && !removeNegation && allowNegative) {
        value = '-' + value;
      }

      return value;
    }
  }, {
    key: "formatInput",
    value: function formatInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var format = this.props.format; //format negation only if we are formatting as number

      if (!format) {
        value = this.removePrefixAndSuffix(value);
        value = this.formatNegation(value);
      } //remove formatting from number


      value = this.removeFormatting(value);
      return this.formatNumString(value);
    }
    /*** format specific methods end ***/

  }, {
    key: "isCharacterAFormat",
    value: function isCharacterAFormat(caretPos, value) {
      var _this$props10 = this.props,
          format = _this$props10.format,
          prefix = _this$props10.prefix,
          suffix = _this$props10.suffix,
          decimalScale = _this$props10.decimalScale,
          fixedDecimalScale = _this$props10.fixedDecimalScale;

      var _this$getSeparators5 = this.getSeparators(),
          decimalSeparator = _this$getSeparators5.decimalSeparator; //check within format pattern


      if (typeof format === 'string' && format[caretPos] !== '#') return true; //check in number format

      if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkIfFormatGotDeleted",
    value: function checkIfFormatGotDeleted(start, end, value) {
      for (var i = start; i < end; i++) {
        if (this.isCharacterAFormat(i, value)) return true;
      }

      return false;
    }
    /**
     * This will check if any formatting got removed by the delete or backspace and reset the value
     * It will also work as fallback if android chome keyDown handler does not work
     **/

  }, {
    key: "correctInputValue",
    value: function correctInputValue(caretPos, lastValue, value) {
      var _this$props11 = this.props,
          format = _this$props11.format,
          allowNegative = _this$props11.allowNegative,
          prefix = _this$props11.prefix,
          suffix = _this$props11.suffix,
          decimalScale = _this$props11.decimalScale;

      var _this$getSeparators6 = this.getSeparators(),
          allowedDecimalSeparators = _this$getSeparators6.allowedDecimalSeparators,
          decimalSeparator = _this$getSeparators6.decimalSeparator;

      var lastNumStr = this.state.numAsString || '';
      var _this$selectionBefore = this.selectionBeforeInput,
          selectionStart = _this$selectionBefore.selectionStart,
          selectionEnd = _this$selectionBefore.selectionEnd;

      var _findChangedIndex = findChangedIndex(lastValue, value),
          start = _findChangedIndex.start,
          end = _findChangedIndex.end;
      /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */


      if (!format && start === end && allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1) {
        var separator = decimalScale === 0 ? '' : decimalSeparator;
        return value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length);
      }
      /* don't do anyhting if something got added,
       or if value is empty string (when whole input is cleared)
       or whole input is replace with a number
      */


      var leftBound = !!format ? 0 : prefix.length;
      var rightBound = lastValue.length - (!!format ? 0 : suffix.length);

      if (value.length > lastValue.length || !value.length || start === end || selectionStart === 0 && selectionEnd === lastValue.length || selectionStart === leftBound && selectionEnd === rightBound) {
        return value;
      } //if format got deleted reset the value to last value


      if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
        value = lastValue;
      } //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
      //clear all numbers in such case while keeping the - sign


      if (!format) {
        var numericString = this.removeFormatting(value);

        var _splitDecimal2 = splitDecimal(numericString, allowNegative),
            beforeDecimal = _splitDecimal2.beforeDecimal,
            afterDecimal = _splitDecimal2.afterDecimal,
            addNegation = _splitDecimal2.addNegation; // eslint-disable-line prefer-const
        //clear only if something got deleted


        var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;

        if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === '' && !parseFloat(afterDecimal)) {
          return addNegation ? '-' : '';
        }
      }

      return value;
    }
    /** Update value and caret position */

  }, {
    key: "updateValue",
    value: function updateValue(params) {
      var formattedValue = params.formattedValue,
          input = params.input,
          _params$setCaretPosit = params.setCaretPosition,
          setCaretPosition = _params$setCaretPosit === void 0 ? true : _params$setCaretPosit;
      var numAsString = params.numAsString,
          caretPos = params.caretPos;
      var onValueChange = this.props.onValueChange;
      var lastValue = this.state.value;

      if (input) {
        //set caret position, and value imperatively when element is provided
        if (setCaretPosition) {
          //calculate caret position if not defined
          if (!caretPos) {
            var inputValue = params.inputValue || input.value;
            var currentCaretPosition = getCurrentCaretPosition(input);
            /**
             * set the value imperatively, this is required for IE fix
             * This is also required as if new caret position is beyond the previous value.
             * Caret position will not be set correctly
             */

            input.value = formattedValue; //get the caret position

            caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
          } //set caret position


          this.setPatchedCaretPosition(input, caretPos, formattedValue);
        } else {
          /**
           * if we are not setting caret position set the value imperatively.
           * This is required on onBlur method
           */
          input.value = formattedValue;
        }
      } //calculate numeric string if not passed


      if (numAsString === undefined) {
        numAsString = this.removeFormatting(formattedValue);
      } //update state if value is changed


      if (formattedValue !== lastValue) {
        this.setState({
          value: formattedValue,
          numAsString: numAsString
        }); // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287

        onValueChange(this.getValueObject(formattedValue, numAsString));
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var el = e.target;
      var inputValue = el.value;
      var state = this.state,
          props = this.props;
      var isAllowed = props.isAllowed;
      var lastValue = state.value || '';
      var currentCaretPosition = getCurrentCaretPosition(el);
      inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);
      var formattedValue = this.formatInput(inputValue) || '';
      var numAsString = this.removeFormatting(formattedValue);
      var valueObj = this.getValueObject(formattedValue, numAsString);

      if (!isAllowed(valueObj)) {
        formattedValue = lastValue;
      }

      this.updateValue({
        formattedValue: formattedValue,
        numAsString: numAsString,
        inputValue: inputValue,
        input: el
      });
      props.onChange(e);
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var props = this.props,
          state = this.state;
      var format = props.format,
          onBlur = props.onBlur,
          allowLeadingZeros = props.allowLeadingZeros;
      var numAsString = state.numAsString;
      var lastValue = state.value;
      this.focusedElm = null;

      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
      }

      if (!format) {
        // if the numAsString is not a valid number reset it to empty
        if (isNaN(parseFloat(numAsString))) {
          numAsString = '';
        }

        if (!allowLeadingZeros) {
          numAsString = fixLeadingZero(numAsString);
        }

        var formattedValue = this.formatNumString(numAsString); //change the state

        if (formattedValue !== lastValue) {
          // the event needs to be persisted because its properties can be accessed in an asynchronous way
          this.updateValue({
            formattedValue: formattedValue,
            numAsString: numAsString,
            input: e.target,
            setCaretPosition: false
          });
          onBlur(e);
          return;
        }
      }

      onBlur(e);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var el = e.target;
      var key = e.key;
      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          _el$value = el.value,
          value = _el$value === void 0 ? '' : _el$value;
      var expectedCaretPosition;
      var _this$props12 = this.props,
          decimalScale = _this$props12.decimalScale,
          fixedDecimalScale = _this$props12.fixedDecimalScale,
          prefix = _this$props12.prefix,
          suffix = _this$props12.suffix,
          format = _this$props12.format,
          onKeyDown = _this$props12.onKeyDown;
      var ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
      var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
      var negativeRegex = new RegExp('-');
      var isPatternFormat = typeof format === 'string';
      this.selectionBeforeInput = {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      }; //Handle backspace and delete against non numerical/decimal characters or arrow keys

      if (key === 'ArrowLeft' || key === 'Backspace') {
        expectedCaretPosition = selectionStart - 1;
      } else if (key === 'ArrowRight') {
        expectedCaretPosition = selectionStart + 1;
      } else if (key === 'Delete') {
        expectedCaretPosition = selectionStart;
      } //if expectedCaretPosition is not set it means we don't want to Handle keyDown
      //also if multiple characters are selected don't handle


      if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
        onKeyDown(e);
        return;
      }

      var newCaretPosition = expectedCaretPosition;
      var leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
      var rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        var direction = key === 'ArrowLeft' ? 'left' : 'right';
        newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
      } else if (key === 'Delete' && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
          newCaretPosition++;
        }
      } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
        /* NOTE: This is special case when backspace is pressed on a
        negative value while the cursor position is after prefix. We can't handle it on onChange because
        we will not have any information of keyPress
        */
        if (selectionStart <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
          var newValue = value.substring(1);
          this.updateValue({
            formattedValue: newValue,
            caretPos: newCaretPosition,
            input: el
          });
        } else if (!negativeRegex.test(value[expectedCaretPosition])) {
          while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
            newCaretPosition--;
          }

          newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
        }
      }

      if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
        e.preventDefault();
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }
      /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
              Remove this when you find different solution */


      if (e.isUnitTestRun) {
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }

      onKeyDown(e);
    }
    /** required to handle the caret position when click anywhere within the input **/

  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      var el = e.target;
      /**
       * NOTE: we have to give default value for value as in case when custom input is provided
       * value can come as undefined when nothing is provided on value prop.
      */

      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          _el$value2 = el.value,
          value = _el$value2 === void 0 ? '' : _el$value2;

      if (selectionStart === selectionEnd) {
        var caretPosition = this.correctCaretPosition(value, selectionStart);

        if (caretPosition !== selectionStart) {
          this.setPatchedCaretPosition(el, caretPosition, value);
        }
      }

      this.props.onMouseUp(e);
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      var _this2 = this;

      // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
      // (onFocus event target selectionStart is always 0 before setTimeout)
      e.persist();
      this.focusedElm = e.target;
      this.focusTimeout = setTimeout(function () {
        var el = e.target;
        var selectionStart = el.selectionStart,
            selectionEnd = el.selectionEnd,
            _el$value3 = el.value,
            value = _el$value3 === void 0 ? '' : _el$value3;

        var caretPosition = _this2.correctCaretPosition(value, selectionStart); //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)


        if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
          _this2.setPatchedCaretPosition(el, caretPosition, value);
        }

        _this2.props.onFocus(e);
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props13 = this.props,
          type = _this$props13.type,
          displayType = _this$props13.displayType,
          customInput = _this$props13.customInput,
          renderText = _this$props13.renderText,
          getInputRef = _this$props13.getInputRef;
      var value = this.state.value;
      var otherProps = omit(this.props, propTypes$1);

      var inputProps = _extends({
        inputMode: 'numeric'
      }, otherProps, {
        type: type,
        value: value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onMouseUp: this.onMouseUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      });

      if (displayType === 'text') {
        return renderText ? renderText(value) || null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", _extends({}, otherProps, {
          ref: getInputRef
        }), value);
      } else if (customInput) {
        var CustomInput = customInput;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CustomInput, _extends({}, inputProps, {
          ref: getInputRef
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({}, inputProps, {
        ref: getInputRef
      }));
    }
  }]);

  return NumberFormat;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

NumberFormat.propTypes = propTypes$1;
NumberFormat.defaultProps = defaultProps;

/* harmony default export */ __webpack_exports__["default"] = (NumberFormat);


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_5030f387d328e4415785 ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_5030f387d328e4415785 */ "dll-reference dll_5030f387d328e4415785"))("./node_modules/react/index.js");

/***/ }),

/***/ "./pages/countries/[slug].js":
/*!***********************************!*\
  !*** ./pages/countries/[slug].js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_CountryStatistic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/components/CountryStatistic */ "./src/components/CountryStatistic/index.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "D:\\personal\\react\\react_group_1\\homework2\\pages\\countries\\[slug].js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Index = props => __jsx("div", {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 3
  }
}, __jsx(_src_components_CountryStatistic__WEBPACK_IMPORTED_MODULE_1__["default"], {
  countryData: props.countryData,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 5
  }
}));

_c = Index;

Index.getInitialProps = async context => {
  const resposne = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`https://api.covid19api.com/total/country/${context.query.slug}`);
  return {
    countryData: resposne.data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

var _c;

$RefreshReg$(_c, "Index");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/components/CountryStatistic/index.jsx":
/*!***************************************************!*\
  !*** ./src/components/CountryStatistic/index.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-number-format */ "./node_modules/react-number-format/dist/react-number-format.es.js");
var _jsxFileName = "D:\\personal\\react\\react_group_1\\homework2\\src\\components\\CountryStatistic\\index.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CountryStatistic = ({
  countryData
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("table", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 11
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 15
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 19
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 23
    }
  }, "\u10E5\u10D5\u10D4\u10E7\u10D0\u10DC\u10D0"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 23
    }
  }, "\u10D3\u10D0\u10D8\u10DB\u10E4\u10D8\u10EA\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 23
    }
  }, "\u10D2\u10D0\u10E0\u10D3\u10D0\u10EA\u10D5\u10DA\u10D8\u10DA\u10D8"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 23
    }
  }, "\u10D2\u10D0\u10DB\u10DD\u10EF\u10D0\u10DC\u10DB\u10E0\u10D7\u10D4\u10DA\u10D4\u10D1\u10E3\u10DA"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 23
    }
  }, "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8")))), __jsx("div", {
    className: "table-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 11
    }
  }, __jsx("table", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 13
    }
  }, __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  }, countryData.sort((a, b) => b.Confirmed - a.Confirmed).map((data, i) => __jsx("tr", {
    key: i,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 21
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, data.Country), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 21
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: data.Confirmed,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 25
    }
  })), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 21
    }
  }, __jsx("span", {
    className: "red",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 25
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: data.Deaths,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 25
    }
  }))), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 21
    }
  }, __jsx("span", {
    className: "green",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 25
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: data.Recovered,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 29
    }
  }))), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 21
    }
  }, data.Date.split('T')[0])))))));
};

_c = CountryStatistic;
/* harmony default export */ __webpack_exports__["default"] = (CountryStatistic);

var _c;

$RefreshReg$(_c, "CountryStatistic");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 2:
/*!******************************************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2Fcountries%2F%5Bslug%5D&absolutePagePath=D%3A%5Cpersonal%5Creact%5Creact_group_1%5Chomework2%5Cpages%5Ccountries%5C%5Bslug%5D.js ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2Fcountries%2F%5Bslug%5D&absolutePagePath=D%3A%5Cpersonal%5Creact%5Creact_group_1%5Chomework2%5Cpages%5Ccountries%5C%5Bslug%5D.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fcountries%2F%5Bslug%5D&absolutePagePath=D%3A%5Cpersonal%5Creact%5Creact_group_1%5Chomework2%5Cpages%5Ccountries%5C%5Bslug%5D.js!./");


/***/ }),

/***/ "dll-reference dll_5030f387d328e4415785":
/*!*******************************************!*\
  !*** external "dll_5030f387d328e4415785" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_5030f387d328e4415785;

/***/ })

},[[2,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWNsaWVudC1wYWdlcy1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW51bWJlci1mb3JtYXQvZGlzdC9yZWFjdC1udW1iZXItZm9ybWF0LmVzLmpzIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIGRsbF81MDMwZjM4N2QzMjhlNDQxNTc4NSIsIndlYnBhY2s6Ly8vLi9wYWdlcy9jb3VudHJpZXMvW3NsdWddLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NvdW50cnlTdGF0aXN0aWMvaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImRsbF81MDMwZjM4N2QzMjhlNDQxNTc4NVwiIl0sIm5hbWVzIjpbIkluZGV4IiwicHJvcHMiLCJjb3VudHJ5RGF0YSIsImdldEluaXRpYWxQcm9wcyIsImNvbnRleHQiLCJyZXNwb3NuZSIsImF4aW9zIiwiZ2V0IiwicXVlcnkiLCJzbHVnIiwiZGF0YSIsIkNvdW50cnlTdGF0aXN0aWMiLCJzb3J0IiwiYSIsImIiLCJDb25maXJtZWQiLCJtYXAiLCJpIiwiQ291bnRyeSIsIkRlYXRocyIsIlJlY292ZXJlZCIsIkRhdGUiLCJzcGxpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCO0FBQ25ELG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDBDQUEwQzs7QUFFMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUM7O0FBRXpDO0FBQ0EsV0FBVzs7O0FBR1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7O0FBR1A7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFQUFFOztBQUVYO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrREFBK0Q7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtFQUErRTs7O0FBRy9FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtB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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFNLGFBQVMsRUFBQyxLQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0EsTUFBQywyREFBRDtBQUNJLFNBQUssRUFBRUwsSUFBSSxDQUFDUyxNQURoQjtBQUVJLHFCQUFpQixFQUFFLElBRnZCO0FBR0ksZUFBVyxFQUFFLE1BSGpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFEQSxDQURKLENBWEEsRUFvQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQU0sYUFBUyxFQUFDLE9BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLDJEQUFEO0FBQ0ksU0FBSyxFQUFFVCxJQUFJLENBQUNVLFNBRGhCO0FBRUkscUJBQWlCLEVBQUUsSUFGdkI7QUFHSSxlQUFXLEVBQUUsTUFIakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURKLENBREosQ0FwQkEsRUE2QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFLVixJQUFJLENBQUNXLElBQUwsQ0FBVUMsS0FBVixDQUFnQixHQUFoQixFQUFxQixDQUFyQixDQUFMLENBN0JBLENBREEsQ0FGSixDQURKLENBREYsQ0FiSixDQURGO0FBeURILENBM0REOztLQUFNWCxnQjtBQTZEU0EsK0VBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQSwwQyIsImZpbGUiOiJzdGF0aWNcXGRldmVsb3BtZW50XFxwYWdlc1xcY291bnRyaWVzXFxbc2x1Z10uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndXJsJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXG4gIF07XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcyKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBmdW5jdGlvbiBvdGhlcktleXNEZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGRlZXBNZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCJcbiAgICAod2luZG93Ll9fTkVYVF9QID0gd2luZG93Ll9fTkVYVF9QIHx8IFtdKS5wdXNoKFtcbiAgICAgIFwiL2NvdW50cmllcy9bc2x1Z11cIixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCJEOlxcXFxwZXJzb25hbFxcXFxyZWFjdFxcXFxyZWFjdF9ncm91cF8xXFxcXGhvbWV3b3JrMlxcXFxwYWdlc1xcXFxjb3VudHJpZXNcXFxcW3NsdWddLmpzXCIpO1xuICAgICAgfVxuICAgIF0pO1xuICAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsTW9kdWxlKSB7XG5cdGlmICghb3JpZ2luYWxNb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImV4cG9ydHNcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogcmVhY3QtbnVtYmVyLWZvcm1hdCAtIDQuNC4xXG4gKiBBdXRob3IgOiBTdWRoYW5zaHUgWWFkYXZcbiAqIENvcHlyaWdodCAoYykgMjAxNiwgMjAyMCB0byBTdWRoYW5zaHUgWWFkYXYsIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zLXlhZGF2L3JlYWN0LW51bWJlci1mb3JtYXRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0XzEgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uV2l0aFJlc2V0KCkge31cbmVtcHR5RnVuY3Rpb25XaXRoUmVzZXQucmVzZXRXYXJuaW5nQ2FjaGUgPSBlbXB0eUZ1bmN0aW9uO1xuXG52YXIgZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHNoaW0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBpZiAoc2VjcmV0ID09PSBSZWFjdFByb3BUeXBlc1NlY3JldF8xKSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIHRocm93IGVycjtcbiAgfSAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfSAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGVsZW1lbnRUeXBlOiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW0sXG5cbiAgICBjaGVja1Byb3BUeXBlczogZW1wdHlGdW5jdGlvbldpdGhSZXNldCxcbiAgICByZXNldFdhcm5pbmdDYWNoZTogZW1wdHlGdW5jdGlvblxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cbnZhciBwcm9wVHlwZXMgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbntcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcygpO1xufVxufSk7XG5cbi8vIGJhc2ljIG5vb3AgZnVuY3Rpb25cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBjaGFySXNOdW1iZXIoX2NoYXIpIHtcbiAgcmV0dXJuICEhKF9jaGFyIHx8ICcnKS5tYXRjaCgvXFxkLyk7XG59XG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1bXFxdL3t9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIik7XG59XG5mdW5jdGlvbiBnZXRUaG91c2FuZHNHcm91cFJlZ2V4KHRob3VzYW5kc0dyb3VwU3R5bGUpIHtcbiAgc3dpdGNoICh0aG91c2FuZHNHcm91cFN0eWxlKSB7XG4gICAgY2FzZSAnbGFraCc6XG4gICAgICByZXR1cm4gLyhcXGQrPykoPz0oXFxkXFxkKSsoXFxkKSg/IVxcZCkpKFxcLlxcZCspPy9nO1xuXG4gICAgY2FzZSAnd2FuJzpcbiAgICAgIHJldHVybiAvKFxcZCkoPz0oXFxkezR9KSsoPyFcXGQpKS9nO1xuXG4gICAgY2FzZSAndGhvdXNhbmQnOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gLyhcXGQpKD89KFxcZHszfSkrKD8hXFxkKSkvZztcbiAgfVxufVxuZnVuY3Rpb24gYXBwbHlUaG91c2FuZFNlcGFyYXRvcihzdHIsIHRob3VzYW5kU2VwYXJhdG9yLCB0aG91c2FuZHNHcm91cFN0eWxlKSB7XG4gIHZhciB0aG91c2FuZHNHcm91cFJlZ2V4ID0gZ2V0VGhvdXNhbmRzR3JvdXBSZWdleCh0aG91c2FuZHNHcm91cFN0eWxlKTtcbiAgdmFyIGluZGV4ID0gc3RyLnNlYXJjaCgvWzEtOV0vKTtcbiAgaW5kZXggPSBpbmRleCA9PT0gLTEgPyBzdHIubGVuZ3RoIDogaW5kZXg7XG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKDAsIGluZGV4KSArIHN0ci5zdWJzdHJpbmcoaW5kZXgsIHN0ci5sZW5ndGgpLnJlcGxhY2UodGhvdXNhbmRzR3JvdXBSZWdleCwgJyQxJyArIHRob3VzYW5kU2VwYXJhdG9yKTtcbn0gLy9zcGlsdCBhIGZsb2F0IG51bWJlciBpbnRvIGRpZmZlcmVudCBwYXJ0cyBiZWZvcmVEZWNpbWFsLCBhZnRlckRlY2ltYWwsIGFuZCBuZWdhdGlvblxuXG5mdW5jdGlvbiBzcGxpdERlY2ltYWwobnVtU3RyKSB7XG4gIHZhciBhbGxvd05lZ2F0aXZlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0cnVlO1xuICB2YXIgaGFzTmFnYXRpb24gPSBudW1TdHJbMF0gPT09ICctJztcbiAgdmFyIGFkZE5lZ2F0aW9uID0gaGFzTmFnYXRpb24gJiYgYWxsb3dOZWdhdGl2ZTtcbiAgbnVtU3RyID0gbnVtU3RyLnJlcGxhY2UoJy0nLCAnJyk7XG4gIHZhciBwYXJ0cyA9IG51bVN0ci5zcGxpdCgnLicpO1xuICB2YXIgYmVmb3JlRGVjaW1hbCA9IHBhcnRzWzBdO1xuICB2YXIgYWZ0ZXJEZWNpbWFsID0gcGFydHNbMV0gfHwgJyc7XG4gIHJldHVybiB7XG4gICAgYmVmb3JlRGVjaW1hbDogYmVmb3JlRGVjaW1hbCxcbiAgICBhZnRlckRlY2ltYWw6IGFmdGVyRGVjaW1hbCxcbiAgICBoYXNOYWdhdGlvbjogaGFzTmFnYXRpb24sXG4gICAgYWRkTmVnYXRpb246IGFkZE5lZ2F0aW9uXG4gIH07XG59XG5mdW5jdGlvbiBmaXhMZWFkaW5nWmVybyhudW1TdHIpIHtcbiAgaWYgKCFudW1TdHIpIHJldHVybiBudW1TdHI7XG4gIHZhciBpc05lZ2F0aXZlID0gbnVtU3RyWzBdID09PSAnLSc7XG4gIGlmIChpc05lZ2F0aXZlKSBudW1TdHIgPSBudW1TdHIuc3Vic3RyaW5nKDEsIG51bVN0ci5sZW5ndGgpO1xuICB2YXIgcGFydHMgPSBudW1TdHIuc3BsaXQoJy4nKTtcbiAgdmFyIGJlZm9yZURlY2ltYWwgPSBwYXJ0c1swXS5yZXBsYWNlKC9eMCsvLCAnJykgfHwgJzAnO1xuICB2YXIgYWZ0ZXJEZWNpbWFsID0gcGFydHNbMV0gfHwgJyc7XG4gIHJldHVybiBcIlwiLmNvbmNhdChpc05lZ2F0aXZlID8gJy0nIDogJycpLmNvbmNhdChiZWZvcmVEZWNpbWFsKS5jb25jYXQoYWZ0ZXJEZWNpbWFsID8gXCIuXCIuY29uY2F0KGFmdGVyRGVjaW1hbCkgOiAnJyk7XG59XG4vKipcbiAqIGxpbWl0IGRlY2ltYWwgbnVtYmVycyB0byBnaXZlbiBzY2FsZVxuICogTm90IHVzZWQgLmZpeGVkVG8gYmVjYXVzZSB0aGF0IHdpbGwgYnJlYWsgd2l0aCBiaWcgbnVtYmVyc1xuICovXG5cbmZ1bmN0aW9uIGxpbWl0VG9TY2FsZShudW1TdHIsIHNjYWxlLCBmaXhlZERlY2ltYWxTY2FsZSkge1xuICB2YXIgc3RyID0gJyc7XG4gIHZhciBmaWxsZXIgPSBmaXhlZERlY2ltYWxTY2FsZSA/ICcwJyA6ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDw9IHNjYWxlIC0gMTsgaSsrKSB7XG4gICAgc3RyICs9IG51bVN0cltpXSB8fCBmaWxsZXI7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCB0byByb3VuZCBwcm9wIHZhbHVlIHRvIGdpdmVuIHNjYWxlLlxuICogTm90IHVzZWQgLnJvdW5kIG9yIC5maXhlZFRvIGJlY2F1c2UgdGhhdCB3aWxsIGJyZWFrIHdpdGggYmlnIG51bWJlcnNcbiAqL1xuXG5mdW5jdGlvbiByb3VuZFRvUHJlY2lzaW9uKG51bVN0ciwgc2NhbGUsIGZpeGVkRGVjaW1hbFNjYWxlKSB7XG4gIC8vaWYgbnVtYmVyIGlzIGVtcHR5IGRvbid0IGRvIGFueXRoaW5nIHJldHVybiBlbXB0eSBzdHJpbmdcbiAgaWYgKFsnJywgJy0nXS5pbmRleE9mKG51bVN0cikgIT09IC0xKSByZXR1cm4gbnVtU3RyO1xuICB2YXIgc2hvdWRIYXZlRGVjaW1hbFNlcGFyYXRvciA9IG51bVN0ci5pbmRleE9mKCcuJykgIT09IC0xICYmIHNjYWxlO1xuXG4gIHZhciBfc3BsaXREZWNpbWFsID0gc3BsaXREZWNpbWFsKG51bVN0ciksXG4gICAgICBiZWZvcmVEZWNpbWFsID0gX3NwbGl0RGVjaW1hbC5iZWZvcmVEZWNpbWFsLFxuICAgICAgYWZ0ZXJEZWNpbWFsID0gX3NwbGl0RGVjaW1hbC5hZnRlckRlY2ltYWwsXG4gICAgICBoYXNOYWdhdGlvbiA9IF9zcGxpdERlY2ltYWwuaGFzTmFnYXRpb247XG5cbiAgdmFyIHJvdW5kZWREZWNpbWFsUGFydHMgPSBwYXJzZUZsb2F0KFwiMC5cIi5jb25jYXQoYWZ0ZXJEZWNpbWFsIHx8ICcwJykpLnRvRml4ZWQoc2NhbGUpLnNwbGl0KCcuJyk7XG4gIHZhciBpbnRQYXJ0ID0gYmVmb3JlRGVjaW1hbC5zcGxpdCgnJykucmV2ZXJzZSgpLnJlZHVjZShmdW5jdGlvbiAocm91bmRlZFN0ciwgY3VycmVudCwgaWR4KSB7XG4gICAgaWYgKHJvdW5kZWRTdHIubGVuZ3RoID4gaWR4KSB7XG4gICAgICByZXR1cm4gKE51bWJlcihyb3VuZGVkU3RyWzBdKSArIE51bWJlcihjdXJyZW50KSkudG9TdHJpbmcoKSArIHJvdW5kZWRTdHIuc3Vic3RyaW5nKDEsIHJvdW5kZWRTdHIubGVuZ3RoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudCArIHJvdW5kZWRTdHI7XG4gIH0sIHJvdW5kZWREZWNpbWFsUGFydHNbMF0pO1xuICB2YXIgZGVjaW1hbFBhcnQgPSBsaW1pdFRvU2NhbGUocm91bmRlZERlY2ltYWxQYXJ0c1sxXSB8fCAnJywgTWF0aC5taW4oc2NhbGUsIGFmdGVyRGVjaW1hbC5sZW5ndGgpLCBmaXhlZERlY2ltYWxTY2FsZSk7XG4gIHZhciBuZWdhdGlvbiA9IGhhc05hZ2F0aW9uID8gJy0nIDogJyc7XG4gIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gc2hvdWRIYXZlRGVjaW1hbFNlcGFyYXRvciA/ICcuJyA6ICcnO1xuICByZXR1cm4gXCJcIi5jb25jYXQobmVnYXRpb24pLmNvbmNhdChpbnRQYXJ0KS5jb25jYXQoZGVjaW1hbFNlcGFyYXRvcikuY29uY2F0KGRlY2ltYWxQYXJ0KTtcbn1cbmZ1bmN0aW9uIG9taXQob2JqLCBrZXlNYXBzKSB7XG4gIHZhciBmaWx0ZXJlZE9iaiA9IHt9O1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICgha2V5TWFwc1trZXldKSBmaWx0ZXJlZE9ialtrZXldID0gb2JqW2tleV07XG4gIH0pO1xuICByZXR1cm4gZmlsdGVyZWRPYmo7XG59XG4vKiogc2V0IHRoZSBjYXJldCBwb3NpdG9uIGluIGFuIGlucHV0IGZpZWxkICoqL1xuXG5mdW5jdGlvbiBzZXRDYXJldFBvc2l0aW9uKGVsLCBjYXJldFBvcykge1xuICBlbC52YWx1ZSA9IGVsLnZhbHVlOyAvLyBeIHRoaXMgaXMgdXNlZCB0byBub3Qgb25seSBnZXQgXCJmb2N1c1wiLCBidXRcbiAgLy8gdG8gbWFrZSBzdXJlIHdlIGRvbid0IGhhdmUgaXQgZXZlcnl0aGluZyAtc2VsZWN0ZWQtXG4gIC8vIChpdCBjYXVzZXMgYW4gaXNzdWUgaW4gY2hyb21lLCBhbmQgaGF2aW5nIGl0IGRvZXNuJ3QgaHVydCBhbnkgb3RoZXIgYnJvd3NlcilcblxuICBpZiAoZWwgIT09IG51bGwpIHtcbiAgICBpZiAoZWwuY3JlYXRlVGV4dFJhbmdlKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmUoJ2NoYXJhY3RlcicsIGNhcmV0UG9zKTtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAvLyAoZWwuc2VsZWN0aW9uU3RhcnQgPT09IDAgYWRkZWQgZm9yIEZpcmVmb3ggYnVnKVxuXG5cbiAgICBpZiAoZWwuc2VsZWN0aW9uU3RhcnQgfHwgZWwuc2VsZWN0aW9uU3RhcnQgPT09IDApIHtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShjYXJldFBvcywgY2FyZXRQb3MpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAvLyBmYWlsIGNpdHksIGZvcnR1bmF0ZWx5IHRoaXMgbmV2ZXIgaGFwcGVucyAoYXMgZmFyIGFzIEkndmUgdGVzdGVkKSA6KVxuXG5cbiAgICBlbC5mb2N1cygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuLyoqXG4gIEdpdmVuIHByZXZpb3VzIHZhbHVlIGFuZCBuZXdWYWx1ZSBpdCByZXR1cm5zIHRoZSBpbmRleFxuICBzdGFydCAtIGVuZCB0byB3aGljaCB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLlxuICBUaGlzIGZ1bmN0aW9uIG1ha2VzIGFzc3VtcHRpb24gYWJvdXQgb25seSBjb25zZWN1dGl2ZVxuICBjaGFyYWN0ZXJzIGFyZSBjaGFuZ2VkIHdoaWNoIGlzIGNvcnJlY3QgYXNzdW1wdGlvbiBmb3IgY2FyZXQgaW5wdXQuXG4qL1xuXG5mdW5jdGlvbiBmaW5kQ2hhbmdlZEluZGV4KHByZXZWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgdmFyIGkgPSAwLFxuICAgICAgaiA9IDA7XG4gIHZhciBwcmV2TGVuZ3RoID0gcHJldlZhbHVlLmxlbmd0aDtcbiAgdmFyIG5ld0xlbmd0aCA9IG5ld1ZhbHVlLmxlbmd0aDtcblxuICB3aGlsZSAocHJldlZhbHVlW2ldID09PSBuZXdWYWx1ZVtpXSAmJiBpIDwgcHJldkxlbmd0aCkge1xuICAgIGkrKztcbiAgfSAvL2NoZWNrIHdoYXQgaGFzIGJlZW4gY2hhbmdlZCBmcm9tIGxhc3RcblxuXG4gIHdoaWxlIChwcmV2VmFsdWVbcHJldkxlbmd0aCAtIDEgLSBqXSA9PT0gbmV3VmFsdWVbbmV3TGVuZ3RoIC0gMSAtIGpdICYmIG5ld0xlbmd0aCAtIGogPiBpICYmIHByZXZMZW5ndGggLSBqID4gaSkge1xuICAgIGorKztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGksXG4gICAgZW5kOiBwcmV2TGVuZ3RoIC0galxuICB9O1xufVxuLypcbiAgUmV0dXJucyBhIG51bWJlciB3aG9zZSB2YWx1ZSBpcyBsaW1pdGVkIHRvIHRoZSBnaXZlbiByYW5nZVxuKi9cblxuZnVuY3Rpb24gY2xhbXAobnVtLCBtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtLCBtaW4pLCBtYXgpO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudENhcmV0UG9zaXRpb24oZWwpIHtcbiAgLypNYXggb2Ygc2VsZWN0aW9uU3RhcnQgYW5kIHNlbGVjdGlvbkVuZCBpcyB0YWtlbiBmb3IgdGhlIHBhdGNoIG9mIHBpeGVsIGFuZCBvdGhlciBtb2JpbGUgZGV2aWNlIGNhcmV0IGJ1ZyovXG4gIHJldHVybiBNYXRoLm1heChlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbn1cblxudmFyIHByb3BUeXBlcyQxID0ge1xuICB0aG91c2FuZFNlcGFyYXRvcjogcHJvcFR5cGVzLm9uZU9mVHlwZShbcHJvcFR5cGVzLnN0cmluZywgcHJvcFR5cGVzLm9uZU9mKFt0cnVlXSldKSxcbiAgZGVjaW1hbFNlcGFyYXRvcjogcHJvcFR5cGVzLnN0cmluZyxcbiAgYWxsb3dlZERlY2ltYWxTZXBhcmF0b3JzOiBwcm9wVHlwZXMuYXJyYXlPZihwcm9wVHlwZXMuc3RyaW5nKSxcbiAgdGhvdXNhbmRzR3JvdXBTdHlsZTogcHJvcFR5cGVzLm9uZU9mKFsndGhvdXNhbmQnLCAnbGFraCcsICd3YW4nXSksXG4gIGRlY2ltYWxTY2FsZTogcHJvcFR5cGVzLm51bWJlcixcbiAgZml4ZWREZWNpbWFsU2NhbGU6IHByb3BUeXBlcy5ib29sLFxuICBkaXNwbGF5VHlwZTogcHJvcFR5cGVzLm9uZU9mKFsnaW5wdXQnLCAndGV4dCddKSxcbiAgcHJlZml4OiBwcm9wVHlwZXMuc3RyaW5nLFxuICBzdWZmaXg6IHByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcm1hdDogcHJvcFR5cGVzLm9uZU9mVHlwZShbcHJvcFR5cGVzLnN0cmluZywgcHJvcFR5cGVzLmZ1bmNdKSxcbiAgcmVtb3ZlRm9ybWF0dGluZzogcHJvcFR5cGVzLmZ1bmMsXG4gIG1hc2s6IHByb3BUeXBlcy5vbmVPZlR5cGUoW3Byb3BUeXBlcy5zdHJpbmcsIHByb3BUeXBlcy5hcnJheU9mKHByb3BUeXBlcy5zdHJpbmcpXSksXG4gIHZhbHVlOiBwcm9wVHlwZXMub25lT2ZUeXBlKFtwcm9wVHlwZXMubnVtYmVyLCBwcm9wVHlwZXMuc3RyaW5nXSksXG4gIGRlZmF1bHRWYWx1ZTogcHJvcFR5cGVzLm9uZU9mVHlwZShbcHJvcFR5cGVzLm51bWJlciwgcHJvcFR5cGVzLnN0cmluZ10pLFxuICBpc051bWVyaWNTdHJpbmc6IHByb3BUeXBlcy5ib29sLFxuICBjdXN0b21JbnB1dDogcHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICBhbGxvd05lZ2F0aXZlOiBwcm9wVHlwZXMuYm9vbCxcbiAgYWxsb3dFbXB0eUZvcm1hdHRpbmc6IHByb3BUeXBlcy5ib29sLFxuICBhbGxvd0xlYWRpbmdaZXJvczogcHJvcFR5cGVzLmJvb2wsXG4gIG9uVmFsdWVDaGFuZ2U6IHByb3BUeXBlcy5mdW5jLFxuICBvbktleURvd246IHByb3BUeXBlcy5mdW5jLFxuICBvbk1vdXNlVXA6IHByb3BUeXBlcy5mdW5jLFxuICBvbkNoYW5nZTogcHJvcFR5cGVzLmZ1bmMsXG4gIG9uRm9jdXM6IHByb3BUeXBlcy5mdW5jLFxuICBvbkJsdXI6IHByb3BUeXBlcy5mdW5jLFxuICB0eXBlOiBwcm9wVHlwZXMub25lT2YoWyd0ZXh0JywgJ3RlbCcsICdwYXNzd29yZCddKSxcbiAgaXNBbGxvd2VkOiBwcm9wVHlwZXMuZnVuYyxcbiAgcmVuZGVyVGV4dDogcHJvcFR5cGVzLmZ1bmMsXG4gIGdldElucHV0UmVmOiBwcm9wVHlwZXMub25lT2ZUeXBlKFtwcm9wVHlwZXMuZnVuYywgLy8gZm9yIGxlZ2FjeSByZWZzXG4gIHByb3BUeXBlcy5zaGFwZSh7XG4gICAgY3VycmVudDogcHJvcFR5cGVzLmFueVxuICB9KV0pXG59O1xudmFyIGRlZmF1bHRQcm9wcyA9IHtcbiAgZGlzcGxheVR5cGU6ICdpbnB1dCcsXG4gIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcbiAgdGhvdXNhbmRzR3JvdXBTdHlsZTogJ3Rob3VzYW5kJyxcbiAgZml4ZWREZWNpbWFsU2NhbGU6IGZhbHNlLFxuICBwcmVmaXg6ICcnLFxuICBzdWZmaXg6ICcnLFxuICBhbGxvd05lZ2F0aXZlOiB0cnVlLFxuICBhbGxvd0VtcHR5Rm9ybWF0dGluZzogZmFsc2UsXG4gIGFsbG93TGVhZGluZ1plcm9zOiBmYWxzZSxcbiAgaXNOdW1lcmljU3RyaW5nOiBmYWxzZSxcbiAgdHlwZTogJ3RleHQnLFxuICBvblZhbHVlQ2hhbmdlOiBub29wLFxuICBvbkNoYW5nZTogbm9vcCxcbiAgb25LZXlEb3duOiBub29wLFxuICBvbk1vdXNlVXA6IG5vb3AsXG4gIG9uRm9jdXM6IG5vb3AsXG4gIG9uQmx1cjogbm9vcCxcbiAgaXNBbGxvd2VkOiByZXR1cm5UcnVlXG59O1xuXG52YXIgTnVtYmVyRm9ybWF0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhOdW1iZXJGb3JtYXQsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE51bWJlckZvcm1hdChwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJGb3JtYXQpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoTnVtYmVyRm9ybWF0KS5jYWxsKHRoaXMsIHByb3BzKSk7XG4gICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHByb3BzLmRlZmF1bHRWYWx1ZTsgLy92YWxpZGF0ZSBwcm9wc1xuXG4gICAgX3RoaXMudmFsaWRhdGVQcm9wcygpO1xuXG4gICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gX3RoaXMuZm9ybWF0VmFsdWVQcm9wKGRlZmF1bHRWYWx1ZSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiBmb3JtYXR0ZWRWYWx1ZSxcbiAgICAgIG51bUFzU3RyaW5nOiBfdGhpcy5yZW1vdmVGb3JtYXR0aW5nKGZvcm1hdHRlZFZhbHVlKVxuICAgIH07XG4gICAgX3RoaXMuc2VsZWN0aW9uQmVmb3JlSW5wdXQgPSB7XG4gICAgICBzZWxlY3Rpb25TdGFydDogMCxcbiAgICAgIHNlbGVjdGlvbkVuZDogMFxuICAgIH07XG4gICAgX3RoaXMub25DaGFuZ2UgPSBfdGhpcy5vbkNoYW5nZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vbktleURvd24gPSBfdGhpcy5vbktleURvd24uYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMub25Nb3VzZVVwID0gX3RoaXMub25Nb3VzZVVwLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLm9uRm9jdXMgPSBfdGhpcy5vbkZvY3VzLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLm9uQmx1ciA9IF90aGlzLm9uQmx1ci5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTnVtYmVyRm9ybWF0LCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRVcGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVWYWx1ZUlmUmVxdWlyZWQocHJldlByb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlVmFsdWVJZlJlcXVpcmVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlSWZSZXF1aXJlZChwcmV2UHJvcHMpIHtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGZvY3VzZWRFbG0gPSB0aGlzLmZvY3VzZWRFbG07XG4gICAgICB2YXIgc3RhdGVWYWx1ZSA9IHN0YXRlLnZhbHVlLFxuICAgICAgICAgIF9zdGF0ZSRudW1Bc1N0cmluZyA9IHN0YXRlLm51bUFzU3RyaW5nLFxuICAgICAgICAgIGxhc3ROdW1TdHIgPSBfc3RhdGUkbnVtQXNTdHJpbmcgPT09IHZvaWQgMCA/ICcnIDogX3N0YXRlJG51bUFzU3RyaW5nOyAvLyBJZiBvbmx5IHN0YXRlIGNoYW5nZWQgbm8gbmVlZCB0byBkbyBhbnkgdGhpbmdcblxuICAgICAgaWYgKHByZXZQcm9wcyAhPT0gcHJvcHMpIHtcbiAgICAgICAgLy92YWxpZGF0ZSBwcm9wc1xuICAgICAgICB0aGlzLnZhbGlkYXRlUHJvcHMoKTtcbiAgICAgICAgdmFyIGxhc3RWYWx1ZVdpdGhOZXdGb3JtYXQgPSB0aGlzLmZvcm1hdE51bVN0cmluZyhsYXN0TnVtU3RyKTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gcHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCA/IGxhc3RWYWx1ZVdpdGhOZXdGb3JtYXQgOiB0aGlzLmZvcm1hdFZhbHVlUHJvcCgpO1xuICAgICAgICB2YXIgbnVtQXNTdHJpbmcgPSB0aGlzLnJlbW92ZUZvcm1hdHRpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgICB2YXIgZmxvYXRWYWx1ZSA9IHBhcnNlRmxvYXQobnVtQXNTdHJpbmcpO1xuICAgICAgICB2YXIgbGFzdEZsb2F0VmFsdWUgPSBwYXJzZUZsb2F0KGxhc3ROdW1TdHIpO1xuXG4gICAgICAgIGlmICggLy93aGlsZSB0eXBpbmcgc2V0IHN0YXRlIG9ubHkgd2hlbiBmbG9hdCB2YWx1ZSBjaGFuZ2VzXG4gICAgICAgICghaXNOYU4oZmxvYXRWYWx1ZSkgfHwgIWlzTmFOKGxhc3RGbG9hdFZhbHVlKSkgJiYgZmxvYXRWYWx1ZSAhPT0gbGFzdEZsb2F0VmFsdWUgfHwgLy9jYW4gYWxzbyBzZXQgc3RhdGUgd2hlbiBmbG9hdCB2YWx1ZSBpcyBzYW1lIGFuZCB0aGUgZm9ybWF0IHByb3BzIGNoYW5nZXNcbiAgICAgICAgbGFzdFZhbHVlV2l0aE5ld0Zvcm1hdCAhPT0gc3RhdGVWYWx1ZSB8fCAvL3NldCBzdGF0ZSBhbHdheXMgd2hlbiBub3QgaW4gZm9jdXMgYW5kIGZvcm1hdHRlZCB2YWx1ZSBpcyBjaGFuZ2VkXG4gICAgICAgIGZvY3VzZWRFbG0gPT09IG51bGwgJiYgZm9ybWF0dGVkVmFsdWUgIT09IHN0YXRlVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlOiBmb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgICAgIG51bUFzU3RyaW5nOiBudW1Bc1N0cmluZyxcbiAgICAgICAgICAgIGlucHV0OiBmb2N1c2VkRWxtXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqIE1pc2MgbWV0aG9kcyAqKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldEZsb2F0U3RyaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZsb2F0U3RyaW5nKCkge1xuICAgICAgdmFyIG51bSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG4gICAgICB2YXIgZGVjaW1hbFNjYWxlID0gdGhpcy5wcm9wcy5kZWNpbWFsU2NhbGU7XG5cbiAgICAgIHZhciBfdGhpcyRnZXRTZXBhcmF0b3JzID0gdGhpcy5nZXRTZXBhcmF0b3JzKCksXG4gICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciA9IF90aGlzJGdldFNlcGFyYXRvcnMuZGVjaW1hbFNlcGFyYXRvcjtcblxuICAgICAgdmFyIG51bVJlZ2V4ID0gdGhpcy5nZXROdW1iZXJSZWdleCh0cnVlKTsgLy9yZW1vdmUgbmVnYXRpb24gZm9yIHJlZ2V4IGNoZWNrXG5cbiAgICAgIHZhciBoYXNOZWdhdGlvbiA9IG51bVswXSA9PT0gJy0nO1xuICAgICAgaWYgKGhhc05lZ2F0aW9uKSBudW0gPSBudW0ucmVwbGFjZSgnLScsICcnKTsgLy9pZiBkZWNpbWFsIHNjYWxlIGlzIHplcm8gcmVtb3ZlIGRlY2ltYWwgYW5kIG51bWJlciBhZnRlciBkZWNpbWFsU2VwYXJhdG9yXG5cbiAgICAgIGlmIChkZWNpbWFsU2VwYXJhdG9yICYmIGRlY2ltYWxTY2FsZSA9PT0gMCkge1xuICAgICAgICBudW0gPSBudW0uc3BsaXQoZGVjaW1hbFNlcGFyYXRvcilbMF07XG4gICAgICB9XG5cbiAgICAgIG51bSA9IChudW0ubWF0Y2gobnVtUmVnZXgpIHx8IFtdKS5qb2luKCcnKS5yZXBsYWNlKGRlY2ltYWxTZXBhcmF0b3IsICcuJyk7IC8vcmVtb3ZlIGV4dHJhIGRlY2ltYWxzXG5cbiAgICAgIHZhciBmaXJzdERlY2ltYWxJbmRleCA9IG51bS5pbmRleE9mKCcuJyk7XG5cbiAgICAgIGlmIChmaXJzdERlY2ltYWxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgbnVtID0gXCJcIi5jb25jYXQobnVtLnN1YnN0cmluZygwLCBmaXJzdERlY2ltYWxJbmRleCksIFwiLlwiKS5jb25jYXQobnVtLnN1YnN0cmluZyhmaXJzdERlY2ltYWxJbmRleCArIDEsIG51bS5sZW5ndGgpLnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoZGVjaW1hbFNlcGFyYXRvciksICdnJyksICcnKSk7XG4gICAgICB9IC8vYWRkIG5lZ2F0aW9uIGJhY2tcblxuXG4gICAgICBpZiAoaGFzTmVnYXRpb24pIG51bSA9ICctJyArIG51bTtcbiAgICAgIHJldHVybiBudW07XG4gICAgfSAvL3JldHVybmVkIHJlZ2V4IGFzc3VtZXMgZGVjaW1hbFNlcGFyYXRvciBpcyBhcyBwZXIgcHJvcFxuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0TnVtYmVyUmVnZXhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TnVtYmVyUmVnZXgoZywgaWdub3JlRGVjaW1hbFNlcGFyYXRvcikge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wcy5mb3JtYXQsXG4gICAgICAgICAgZGVjaW1hbFNjYWxlID0gX3RoaXMkcHJvcHMuZGVjaW1hbFNjYWxlO1xuXG4gICAgICB2YXIgX3RoaXMkZ2V0U2VwYXJhdG9yczIgPSB0aGlzLmdldFNlcGFyYXRvcnMoKSxcbiAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yID0gX3RoaXMkZ2V0U2VwYXJhdG9yczIuZGVjaW1hbFNlcGFyYXRvcjtcblxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ1xcXFxkJyArIChkZWNpbWFsU2VwYXJhdG9yICYmIGRlY2ltYWxTY2FsZSAhPT0gMCAmJiAhaWdub3JlRGVjaW1hbFNlcGFyYXRvciAmJiAhZm9ybWF0ID8gJ3wnICsgZXNjYXBlUmVnRXhwKGRlY2ltYWxTZXBhcmF0b3IpIDogJycpLCBnID8gJ2cnIDogdW5kZWZpbmVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2VwYXJhdG9yc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTZXBhcmF0b3JzKCkge1xuICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICB0aG91c2FuZFNlcGFyYXRvciA9IF90aGlzJHByb3BzMi50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICBhbGxvd2VkRGVjaW1hbFNlcGFyYXRvcnMgPSBfdGhpcyRwcm9wczIuYWxsb3dlZERlY2ltYWxTZXBhcmF0b3JzO1xuXG4gICAgICBpZiAodGhvdXNhbmRTZXBhcmF0b3IgPT09IHRydWUpIHtcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IgPSAnLCc7XG4gICAgICB9XG5cbiAgICAgIGlmICghYWxsb3dlZERlY2ltYWxTZXBhcmF0b3JzKSB7XG4gICAgICAgIGFsbG93ZWREZWNpbWFsU2VwYXJhdG9ycyA9IFtkZWNpbWFsU2VwYXJhdG9yLCAnLiddO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcjogdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGFsbG93ZWREZWNpbWFsU2VwYXJhdG9yczogYWxsb3dlZERlY2ltYWxTZXBhcmF0b3JzXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRNYXNrQXRJbmRleFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRNYXNrQXRJbmRleChpbmRleCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzJG1hc2sgPSB0aGlzLnByb3BzLm1hc2ssXG4gICAgICAgICAgbWFzayA9IF90aGlzJHByb3BzJG1hc2sgPT09IHZvaWQgMCA/ICcgJyA6IF90aGlzJHByb3BzJG1hc2s7XG5cbiAgICAgIGlmICh0eXBlb2YgbWFzayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG1hc2s7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXNrW2luZGV4XSB8fCAnICc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFZhbHVlT2JqZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlT2JqZWN0KGZvcm1hdHRlZFZhbHVlLCBudW1Bc1N0cmluZykge1xuICAgICAgdmFyIGZsb2F0VmFsdWUgPSBwYXJzZUZsb2F0KG51bUFzU3RyaW5nKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1hdHRlZFZhbHVlOiBmb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgdmFsdWU6IG51bUFzU3RyaW5nLFxuICAgICAgICBmbG9hdFZhbHVlOiBpc05hTihmbG9hdFZhbHVlKSA/IHVuZGVmaW5lZCA6IGZsb2F0VmFsdWVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInZhbGlkYXRlUHJvcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRhdGVQcm9wcygpIHtcbiAgICAgIHZhciBtYXNrID0gdGhpcy5wcm9wcy5tYXNrOyAvL3ZhbGlkYXRlIGRlY2ltYWxTZXBhcmF0b3IgYW5kIHRob3VzYW5kU2VwYXJhdG9yXG5cbiAgICAgIHZhciBfdGhpcyRnZXRTZXBhcmF0b3JzMyA9IHRoaXMuZ2V0U2VwYXJhdG9ycygpLFxuICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgPSBfdGhpcyRnZXRTZXBhcmF0b3JzMy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yID0gX3RoaXMkZ2V0U2VwYXJhdG9yczMudGhvdXNhbmRTZXBhcmF0b3I7XG5cbiAgICAgIGlmIChkZWNpbWFsU2VwYXJhdG9yID09PSB0aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcXG4gICAgICAgICAgRGVjaW1hbCBzZXBhcmF0b3IgY2FuJ3QgYmUgc2FtZSBhcyB0aG91c2FuZCBzZXBhcmF0b3IuXFxuICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBcIi5jb25jYXQodGhvdXNhbmRTZXBhcmF0b3IsIFwiICh0aG91c2FuZFNlcGFyYXRvciA9IHt0cnVlfSBpcyBzYW1lIGFzIHRob3VzYW5kU2VwYXJhdG9yID0gXFxcIixcXFwiKVxcbiAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIikuY29uY2F0KGRlY2ltYWxTZXBhcmF0b3IsIFwiIChkZWZhdWx0IHZhbHVlIGZvciBkZWNpbWFsU2VwYXJhdG9yIGlzIC4pXFxuICAgICAgIFwiKSk7XG4gICAgICB9IC8vdmFsaWRhdGUgbWFza1xuXG5cbiAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgIHZhciBtYXNrQXNTdHIgPSBtYXNrID09PSAnc3RyaW5nJyA/IG1hc2sgOiBtYXNrLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKG1hc2tBc1N0ci5tYXRjaCgvXFxkL2cpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXFxuICAgICAgICAgIE1hc2sgXCIuY29uY2F0KG1hc2ssIFwiIHNob3VsZCBub3QgY29udGFpbiBudW1lcmljIGNoYXJhY3RlcjtcXG4gICAgICAgIFwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqIE1pc2MgbWV0aG9kcyBlbmQgKiovXG5cbiAgICAvKiogY2FyZXQgc3BlY2lmaWMgbWV0aG9kcyAqKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldFBhdGNoZWRDYXJldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBhdGNoZWRDYXJldFBvc2l0aW9uKGVsLCBjYXJldFBvcywgY3VycmVudFZhbHVlKSB7XG4gICAgICAvKiBzZXR0aW5nIGNhcmV0IHBvc2l0aW9uIHdpdGhpbiB0aW1lb3V0IG9mIDBtcyBpcyByZXF1aXJlZCBmb3IgbW9iaWxlIGNocm9tZSxcbiAgICAgIG90aGVyd2lzZSBicm93c2VyIHJlc2V0cyB0aGUgY2FyZXQgcG9zaXRpb24gYWZ0ZXIgd2Ugc2V0IGl0XG4gICAgICBXZSBhcmUgYWxzbyBzZXR0aW5nIGl0IHdpdGhvdXQgdGltZW91dCBzbyB0aGF0IGluIG5vcm1hbCBicm93c2VyIHdlIGRvbid0IHNlZSB0aGUgZmxpY2tlcmluZyAqL1xuICAgICAgc2V0Q2FyZXRQb3NpdGlvbihlbCwgY2FyZXRQb3MpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChlbC52YWx1ZSA9PT0gY3VycmVudFZhbHVlKSBzZXRDYXJldFBvc2l0aW9uKGVsLCBjYXJldFBvcyk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgLyogVGhpcyBrZWVwcyB0aGUgY2FyZXQgd2l0aGluIHR5cGluZyBhcmVhIHNvIHBlb3BsZSBjYW4ndCB0eXBlIGluIGJldHdlZW4gcHJlZml4IG9yIHN1ZmZpeCAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiY29ycmVjdENhcmV0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29ycmVjdENhcmV0UG9zaXRpb24odmFsdWUsIGNhcmV0UG9zLCBkaXJlY3Rpb24pIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIHByZWZpeCA9IF90aGlzJHByb3BzMy5wcmVmaXgsXG4gICAgICAgICAgc3VmZml4ID0gX3RoaXMkcHJvcHMzLnN1ZmZpeCxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczMuZm9ybWF0OyAvL2lmIHZhbHVlIGlzIGVtcHR5IHJldHVybiAwXG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHJldHVybiAwOyAvL2NhcmV0IHBvc2l0aW9uIHNob3VsZCBiZSBiZXR3ZWVuIDAgYW5kIHZhbHVlIGxlbmd0aFxuXG4gICAgICBjYXJldFBvcyA9IGNsYW1wKGNhcmV0UG9zLCAwLCB2YWx1ZS5sZW5ndGgpOyAvL2luIGNhc2Ugb2YgZm9ybWF0IGFzIG51bWJlciBsaW1pdCBiZXR3ZWVuIHByZWZpeCBhbmQgc3VmZml4XG5cbiAgICAgIGlmICghZm9ybWF0KSB7XG4gICAgICAgIHZhciBoYXNOZWdhdGlvbiA9IHZhbHVlWzBdID09PSAnLSc7XG4gICAgICAgIHJldHVybiBjbGFtcChjYXJldFBvcywgcHJlZml4Lmxlbmd0aCArIChoYXNOZWdhdGlvbiA/IDEgOiAwKSwgdmFsdWUubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCk7XG4gICAgICB9IC8vaW4gY2FzZSBpZiBjdXN0b20gZm9ybWF0IG1ldGhvZCBkb24ndCBkbyBhbnl0aGluZ1xuXG5cbiAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnZnVuY3Rpb24nKSByZXR1cm4gY2FyZXRQb3M7XG4gICAgICAvKiBpbiBjYXNlIGZvcm1hdCBpcyBzdHJpbmcgZmluZCB0aGUgY2xvc2VzdCAjIHBvc2l0aW9uIGZyb20gdGhlIGNhcmV0IHBvc2l0aW9uICovXG4gICAgICAvL2luIGNhc2UgdGhlIGNhcmV0UG9zIGhhdmUgaW5wdXQgdmFsdWUgb24gaXQgZG9uJ3QgZG8gYW55dGhpbmdcblxuICAgICAgaWYgKGZvcm1hdFtjYXJldFBvc10gPT09ICcjJyAmJiBjaGFySXNOdW1iZXIodmFsdWVbY2FyZXRQb3NdKSkgcmV0dXJuIGNhcmV0UG9zOyAvL2lmIGNhcmV0UG9zIGlzIGp1c3QgYWZ0ZXIgaW5wdXQgdmFsdWUgZG9uJ3QgZG8gYW55dGhpbmdcblxuICAgICAgaWYgKGZvcm1hdFtjYXJldFBvcyAtIDFdID09PSAnIycgJiYgY2hhcklzTnVtYmVyKHZhbHVlW2NhcmV0UG9zIC0gMV0pKSByZXR1cm4gY2FyZXRQb3M7IC8vZmluZCB0aGUgbmVhcmVzdCBjYXJldCBwb3NpdGlvblxuXG4gICAgICB2YXIgZmlyc3RIYXNoUG9zaXRpb24gPSBmb3JtYXQuaW5kZXhPZignIycpO1xuICAgICAgdmFyIGxhc3RIYXNoUG9zaXRpb24gPSBmb3JtYXQubGFzdEluZGV4T2YoJyMnKTsgLy9saW1pdCB0aGUgY3Vyc29yIGJldHdlZW4gdGhlIGZpcnN0ICMgcG9zaXRpb24gYW5kIHRoZSBsYXN0ICMgcG9zaXRpb25cblxuICAgICAgY2FyZXRQb3MgPSBjbGFtcChjYXJldFBvcywgZmlyc3RIYXNoUG9zaXRpb24sIGxhc3RIYXNoUG9zaXRpb24gKyAxKTtcbiAgICAgIHZhciBuZXh0UG9zID0gZm9ybWF0LnN1YnN0cmluZyhjYXJldFBvcywgZm9ybWF0Lmxlbmd0aCkuaW5kZXhPZignIycpO1xuICAgICAgdmFyIGNhcmV0TGVmdEJvdW5kID0gY2FyZXRQb3M7XG4gICAgICB2YXIgY2FyZXRSaWdodEJvdW5kID0gY2FyZXRQb3MgKyAobmV4dFBvcyA9PT0gLTEgPyAwIDogbmV4dFBvcyk7IC8vZ2V0IHRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgbGFzdCBudW1iZXIgaXMgcHJlc2VudFxuXG4gICAgICB3aGlsZSAoY2FyZXRMZWZ0Qm91bmQgPiBmaXJzdEhhc2hQb3NpdGlvbiAmJiAoZm9ybWF0W2NhcmV0TGVmdEJvdW5kXSAhPT0gJyMnIHx8ICFjaGFySXNOdW1iZXIodmFsdWVbY2FyZXRMZWZ0Qm91bmRdKSkpIHtcbiAgICAgICAgY2FyZXRMZWZ0Qm91bmQgLT0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGdvVG9MZWZ0ID0gIWNoYXJJc051bWJlcih2YWx1ZVtjYXJldFJpZ2h0Qm91bmRdKSB8fCBkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjYXJldFBvcyAhPT0gZmlyc3RIYXNoUG9zaXRpb24gfHwgY2FyZXRQb3MgLSBjYXJldExlZnRCb3VuZCA8IGNhcmV0UmlnaHRCb3VuZCAtIGNhcmV0UG9zO1xuXG4gICAgICBpZiAoZ29Ub0xlZnQpIHtcbiAgICAgICAgLy9jaGVjayBpZiBudW1iZXIgc2hvdWxkIGJlIHRha2VuIGFmdGVyIHRoZSBib3VuZCBvciBhZnRlciBpdFxuICAgICAgICAvL2lmIG51bWJlciBwcmVjZWRpbmcgYSB2YWxpZCBudW1iZXIga2VlcCBpdCBhZnRlclxuICAgICAgICByZXR1cm4gY2hhcklzTnVtYmVyKHZhbHVlW2NhcmV0TGVmdEJvdW5kXSkgPyBjYXJldExlZnRCb3VuZCArIDEgOiBjYXJldExlZnRCb3VuZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhcmV0UmlnaHRCb3VuZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2FyZXRQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDYXJldFBvc2l0aW9uKGlucHV0VmFsdWUsIGZvcm1hdHRlZFZhbHVlLCBjYXJldFBvcykge1xuICAgICAgdmFyIGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0O1xuICAgICAgdmFyIHN0YXRlVmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xuICAgICAgdmFyIG51bVJlZ2V4ID0gdGhpcy5nZXROdW1iZXJSZWdleCh0cnVlKTtcbiAgICAgIHZhciBpbnB1dE51bWJlciA9IChpbnB1dFZhbHVlLm1hdGNoKG51bVJlZ2V4KSB8fCBbXSkuam9pbignJyk7XG4gICAgICB2YXIgZm9ybWF0dGVkTnVtYmVyID0gKGZvcm1hdHRlZFZhbHVlLm1hdGNoKG51bVJlZ2V4KSB8fCBbXSkuam9pbignJyk7XG4gICAgICB2YXIgaiwgaTtcbiAgICAgIGogPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2FyZXRQb3M7IGkrKykge1xuICAgICAgICB2YXIgY3VycmVudElucHV0Q2hhciA9IGlucHV0VmFsdWVbaV0gfHwgJyc7XG4gICAgICAgIHZhciBjdXJyZW50Rm9ybWF0Q2hhciA9IGZvcm1hdHRlZFZhbHVlW2pdIHx8ICcnOyAvL25vIG5lZWQgdG8gaW5jcmVhc2UgbmV3IGN1cnNvciBwb3NpdGlvbiBpZiBmb3JtYXR0ZWQgdmFsdWUgZG9lcyBub3QgaGF2ZSB0aG9zZSBjaGFyYWN0ZXJzXG4gICAgICAgIC8vY2FzZSBpbnB1dFZhbHVlID0gMWEyMyBhbmQgZm9ybWF0dGVkVmFsdWUgPSAgMTIzXG5cbiAgICAgICAgaWYgKCFjdXJyZW50SW5wdXRDaGFyLm1hdGNoKG51bVJlZ2V4KSAmJiBjdXJyZW50SW5wdXRDaGFyICE9PSBjdXJyZW50Rm9ybWF0Q2hhcikgY29udGludWU7IC8vV2hlbiB3ZSBhcmUgc3RyaXBpbmcgb3V0IGxlYWRpbmcgemVyb3MgbWFpbnRhaW4gdGhlIG5ldyBjdXJzb3IgcG9zaXRpb25cbiAgICAgICAgLy9DYXNlIGlucHV0VmFsdWUgPSAwMDAyMyBhbmQgZm9ybWF0dGVkVmFsdWUgPSAyMztcblxuICAgICAgICBpZiAoY3VycmVudElucHV0Q2hhciA9PT0gJzAnICYmIGN1cnJlbnRGb3JtYXRDaGFyLm1hdGNoKG51bVJlZ2V4KSAmJiBjdXJyZW50Rm9ybWF0Q2hhciAhPT0gJzAnICYmIGlucHV0TnVtYmVyLmxlbmd0aCAhPT0gZm9ybWF0dGVkTnVtYmVyLmxlbmd0aCkgY29udGludWU7IC8vd2UgYXJlIG5vdCB1c2luZyBjdXJyZW50Rm9ybWF0Q2hhciBiZWNhdXNlIGogY2FuIGNoYW5nZSBoZXJlXG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRJbnB1dENoYXIgIT09IGZvcm1hdHRlZFZhbHVlW2pdICYmIGogPCBmb3JtYXR0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH1cblxuICAgICAgICBqKys7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJyAmJiAhc3RhdGVWYWx1ZSkge1xuICAgICAgICAvL3NldCBpdCB0byB0aGUgbWF4aW11bSB2YWx1ZSBzbyBpdCBnb2VzIGFmdGVyIHRoZSBsYXN0IG51bWJlclxuICAgICAgICBqID0gZm9ybWF0dGVkVmFsdWUubGVuZ3RoO1xuICAgICAgfSAvL2NvcnJlY3QgY2FyZXQgcG9zaXRpb24gaWYgaXRzIG91dHNpZGUgb2YgZWRpdGFibGUgYXJlYVxuXG5cbiAgICAgIGogPSB0aGlzLmNvcnJlY3RDYXJldFBvc2l0aW9uKGZvcm1hdHRlZFZhbHVlLCBqKTtcbiAgICAgIHJldHVybiBqO1xuICAgIH1cbiAgICAvKiogY2FyZXQgc3BlY2lmaWMgbWV0aG9kcyBlbmRzICoqL1xuXG4gICAgLyoqIG1ldGhvZHMgdG8gcmVtb3ZlIGZvcm1hdHR0aW5nICoqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlUHJlZml4QW5kU3VmZml4XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVByZWZpeEFuZFN1ZmZpeCh2YWwpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczQgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGZvcm1hdCA9IF90aGlzJHByb3BzNC5mb3JtYXQsXG4gICAgICAgICAgcHJlZml4ID0gX3RoaXMkcHJvcHM0LnByZWZpeCxcbiAgICAgICAgICBzdWZmaXggPSBfdGhpcyRwcm9wczQuc3VmZml4OyAvL3JlbW92ZSBwcmVmaXggYW5kIHN1ZmZpeFxuXG4gICAgICBpZiAoIWZvcm1hdCAmJiB2YWwpIHtcbiAgICAgICAgdmFyIGlzTmVnYXRpdmUgPSB2YWxbMF0gPT09ICctJzsgLy9yZW1vdmUgbmVnYXRpb24gc2lnblxuXG4gICAgICAgIGlmIChpc05lZ2F0aXZlKSB2YWwgPSB2YWwuc3Vic3RyaW5nKDEsIHZhbC5sZW5ndGgpOyAvL3JlbW92ZSBwcmVmaXhcblxuICAgICAgICB2YWwgPSBwcmVmaXggJiYgdmFsLmluZGV4T2YocHJlZml4KSA9PT0gMCA/IHZhbC5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCwgdmFsLmxlbmd0aCkgOiB2YWw7IC8vcmVtb3ZlIHN1ZmZpeFxuXG4gICAgICAgIHZhciBzdWZmaXhMYXN0SW5kZXggPSB2YWwubGFzdEluZGV4T2Yoc3VmZml4KTtcbiAgICAgICAgdmFsID0gc3VmZml4ICYmIHN1ZmZpeExhc3RJbmRleCAhPT0gLTEgJiYgc3VmZml4TGFzdEluZGV4ID09PSB2YWwubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCA/IHZhbC5zdWJzdHJpbmcoMCwgc3VmZml4TGFzdEluZGV4KSA6IHZhbDsgLy9hZGQgbmVnYXRpb24gc2lnbiBiYWNrXG5cbiAgICAgICAgaWYgKGlzTmVnYXRpdmUpIHZhbCA9ICctJyArIHZhbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlUGF0dGVybkZvcm1hdHRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlUGF0dGVybkZvcm1hdHRpbmcodmFsKSB7XG4gICAgICB2YXIgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQ7XG4gICAgICB2YXIgZm9ybWF0QXJyYXkgPSBmb3JtYXQuc3BsaXQoJyMnKS5maWx0ZXIoZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyICE9PSAnJztcbiAgICAgIH0pO1xuICAgICAgdmFyIHN0YXJ0ID0gMDtcbiAgICAgIHZhciBudW1TdHIgPSAnJztcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxuID0gZm9ybWF0QXJyYXkubGVuZ3RoOyBpIDw9IGxuOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBmb3JtYXRBcnJheVtpXSB8fCAnJzsgLy9pZiBpIGlzIHRoZSBsYXN0IGZyYWdtZW50IHRha2UgdGhlIGluZGV4IG9mIGVuZCBvZiB0aGUgdmFsdWVcbiAgICAgICAgLy9Gb3IgY2FzZSBsaWtlICsxICg5MTEpIDkxMSA5MSA5MSBoYXZpbmcgcGF0dGVybiArMSAoIyMjKSAjIyMgIyMgIyNcblxuICAgICAgICB2YXIgaW5kZXggPSBpID09PSBsbiA/IHZhbC5sZW5ndGggOiB2YWwuaW5kZXhPZihwYXJ0LCBzdGFydCk7XG4gICAgICAgIC8qIGluIGFueSBjYXNlIGlmIHdlIGRvbid0IGZpbmQgdGhlIHBhdHRlcm4gcGFydCBpbiB0aGUgdmFsdWUgYXNzdW1lIHRoZSB2YWwgYXMgbnVtZXJpYyBzdHJpbmdcbiAgICAgICAgVGhpcyB3aWxsIGJlIGFsc28gaW4gY2FzZSBpZiB1c2VyIGhhcyBzdGFydGVkIHR5cGluZywgaW4gYW55IG90aGVyIGNhc2UgaXQgd2lsbCBub3QgYmUgLTFcbiAgICAgICAgdW5sZXNzIHdyb25nIHByb3AgdmFsdWUgaXMgcHJvdmlkZWQgKi9cblxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgbnVtU3RyID0gdmFsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bVN0ciArPSB2YWwuc3Vic3RyaW5nKHN0YXJ0LCBpbmRleCk7XG4gICAgICAgICAgc3RhcnQgPSBpbmRleCArIHBhcnQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAobnVtU3RyLm1hdGNoKC9cXGQvZykgfHwgW10pLmpvaW4oJycpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVGb3JtYXR0aW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmcodmFsKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM1ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczUuZm9ybWF0LFxuICAgICAgICAgIHJlbW92ZUZvcm1hdHRpbmcgPSBfdGhpcyRwcm9wczUucmVtb3ZlRm9ybWF0dGluZztcbiAgICAgIGlmICghdmFsKSByZXR1cm4gdmFsO1xuXG4gICAgICBpZiAoIWZvcm1hdCkge1xuICAgICAgICB2YWwgPSB0aGlzLnJlbW92ZVByZWZpeEFuZFN1ZmZpeCh2YWwpO1xuICAgICAgICB2YWwgPSB0aGlzLmdldEZsb2F0U3RyaW5nKHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhbCA9IHRoaXMucmVtb3ZlUGF0dGVybkZvcm1hdHRpbmcodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbW92ZUZvcm1hdHRpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy9jb25kaXRpb24gbmVlZCB0byBiZSBoYW5kbGVkIGlmIGZvcm1hdCBtZXRob2QgaXMgcHJvdmlkZSxcbiAgICAgICAgdmFsID0gcmVtb3ZlRm9ybWF0dGluZyh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gKHZhbC5tYXRjaCgvXFxkL2cpIHx8IFtdKS5qb2luKCcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgLyoqIG1ldGhvZHMgdG8gcmVtb3ZlIGZvcm1hdHR0aW5nIGVuZCAqKi9cblxuICAgIC8qKiogZm9ybWF0IHNwZWNpZmljIG1ldGhvZHMgc3RhcnQgKioqL1xuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHdoZW4gIyBiYXNlZCBzdHJpbmcgaXMgcHJvdmlkZWRcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG51bVN0ciBOdW1lcmljIFN0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgIGZvcm1hdHRlZCBWYWx1ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0V2l0aFBhdHRlcm5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0V2l0aFBhdHRlcm4obnVtU3RyKSB7XG4gICAgICB2YXIgZm9ybWF0ID0gdGhpcy5wcm9wcy5mb3JtYXQ7XG4gICAgICB2YXIgaGFzaENvdW50ID0gMDtcbiAgICAgIHZhciBmb3JtYXR0ZWROdW1iZXJBcnkgPSBmb3JtYXQuc3BsaXQoJycpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbG4gPSBmb3JtYXQubGVuZ3RoOyBpIDwgbG47IGkrKykge1xuICAgICAgICBpZiAoZm9ybWF0W2ldID09PSAnIycpIHtcbiAgICAgICAgICBmb3JtYXR0ZWROdW1iZXJBcnlbaV0gPSBudW1TdHJbaGFzaENvdW50XSB8fCB0aGlzLmdldE1hc2tBdEluZGV4KGhhc2hDb3VudCk7XG4gICAgICAgICAgaGFzaENvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlckFyeS5qb2luKCcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBudW1TdHIgTnVtZXJpYyBzdHJpbmcvZmxvYXRTdHJpbmddIEl0IGFsd2F5cyBoYXZlIGRlY2ltYWxTZXBhcmF0b3IgYXMgLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gZm9ybWF0dGVkIFZhbHVlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJmb3JtYXRBc051bWJlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JtYXRBc051bWJlcihudW1TdHIpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczYgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRlY2ltYWxTY2FsZSA9IF90aGlzJHByb3BzNi5kZWNpbWFsU2NhbGUsXG4gICAgICAgICAgZml4ZWREZWNpbWFsU2NhbGUgPSBfdGhpcyRwcm9wczYuZml4ZWREZWNpbWFsU2NhbGUsXG4gICAgICAgICAgcHJlZml4ID0gX3RoaXMkcHJvcHM2LnByZWZpeCxcbiAgICAgICAgICBzdWZmaXggPSBfdGhpcyRwcm9wczYuc3VmZml4LFxuICAgICAgICAgIGFsbG93TmVnYXRpdmUgPSBfdGhpcyRwcm9wczYuYWxsb3dOZWdhdGl2ZSxcbiAgICAgICAgICB0aG91c2FuZHNHcm91cFN0eWxlID0gX3RoaXMkcHJvcHM2LnRob3VzYW5kc0dyb3VwU3R5bGU7XG5cbiAgICAgIHZhciBfdGhpcyRnZXRTZXBhcmF0b3JzNCA9IHRoaXMuZ2V0U2VwYXJhdG9ycygpLFxuICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yID0gX3RoaXMkZ2V0U2VwYXJhdG9yczQudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciA9IF90aGlzJGdldFNlcGFyYXRvcnM0LmRlY2ltYWxTZXBhcmF0b3I7XG5cbiAgICAgIHZhciBoYXNEZWNpbWFsU2VwYXJhdG9yID0gbnVtU3RyLmluZGV4T2YoJy4nKSAhPT0gLTEgfHwgZGVjaW1hbFNjYWxlICYmIGZpeGVkRGVjaW1hbFNjYWxlO1xuXG4gICAgICB2YXIgX3NwbGl0RGVjaW1hbCA9IHNwbGl0RGVjaW1hbChudW1TdHIsIGFsbG93TmVnYXRpdmUpLFxuICAgICAgICAgIGJlZm9yZURlY2ltYWwgPSBfc3BsaXREZWNpbWFsLmJlZm9yZURlY2ltYWwsXG4gICAgICAgICAgYWZ0ZXJEZWNpbWFsID0gX3NwbGl0RGVjaW1hbC5hZnRlckRlY2ltYWwsXG4gICAgICAgICAgYWRkTmVnYXRpb24gPSBfc3BsaXREZWNpbWFsLmFkZE5lZ2F0aW9uOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdFxuICAgICAgLy9hcHBseSBkZWNpbWFsIHByZWNpc2lvbiBpZiBpdHMgZGVmaW5lZFxuXG5cbiAgICAgIGlmIChkZWNpbWFsU2NhbGUgIT09IHVuZGVmaW5lZCkgYWZ0ZXJEZWNpbWFsID0gbGltaXRUb1NjYWxlKGFmdGVyRGVjaW1hbCwgZGVjaW1hbFNjYWxlLCBmaXhlZERlY2ltYWxTY2FsZSk7XG5cbiAgICAgIGlmICh0aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICBiZWZvcmVEZWNpbWFsID0gYXBwbHlUaG91c2FuZFNlcGFyYXRvcihiZWZvcmVEZWNpbWFsLCB0aG91c2FuZFNlcGFyYXRvciwgdGhvdXNhbmRzR3JvdXBTdHlsZSk7XG4gICAgICB9IC8vYWRkIHByZWZpeCBhbmQgc3VmZml4XG5cblxuICAgICAgaWYgKHByZWZpeCkgYmVmb3JlRGVjaW1hbCA9IHByZWZpeCArIGJlZm9yZURlY2ltYWw7XG4gICAgICBpZiAoc3VmZml4KSBhZnRlckRlY2ltYWwgPSBhZnRlckRlY2ltYWwgKyBzdWZmaXg7IC8vcmVzdG9yZSBuZWdhdGlvbiBzaWduXG5cbiAgICAgIGlmIChhZGROZWdhdGlvbikgYmVmb3JlRGVjaW1hbCA9ICctJyArIGJlZm9yZURlY2ltYWw7XG4gICAgICBudW1TdHIgPSBiZWZvcmVEZWNpbWFsICsgKGhhc0RlY2ltYWxTZXBhcmF0b3IgJiYgZGVjaW1hbFNlcGFyYXRvciB8fCAnJykgKyBhZnRlckRlY2ltYWw7XG4gICAgICByZXR1cm4gbnVtU3RyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmb3JtYXROdW1TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0TnVtU3RyaW5nKCkge1xuICAgICAgdmFyIG51bVN0ciA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM3ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczcuZm9ybWF0LFxuICAgICAgICAgIGFsbG93RW1wdHlGb3JtYXR0aW5nID0gX3RoaXMkcHJvcHM3LmFsbG93RW1wdHlGb3JtYXR0aW5nO1xuICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gbnVtU3RyO1xuXG4gICAgICBpZiAobnVtU3RyID09PSAnJyAmJiAhYWxsb3dFbXB0eUZvcm1hdHRpbmcpIHtcbiAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAobnVtU3RyID09PSAnLScgJiYgIWZvcm1hdCkge1xuICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9ICctJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdFdpdGhQYXR0ZXJuKGZvcm1hdHRlZFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdChmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0QXNOdW1iZXIoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZvcm1hdFZhbHVlUHJvcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JtYXRWYWx1ZVByb3AoZGVmYXVsdFZhbHVlKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM4ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczguZm9ybWF0LFxuICAgICAgICAgIGRlY2ltYWxTY2FsZSA9IF90aGlzJHByb3BzOC5kZWNpbWFsU2NhbGUsXG4gICAgICAgICAgZml4ZWREZWNpbWFsU2NhbGUgPSBfdGhpcyRwcm9wczguZml4ZWREZWNpbWFsU2NhbGUsXG4gICAgICAgICAgYWxsb3dFbXB0eUZvcm1hdHRpbmcgPSBfdGhpcyRwcm9wczguYWxsb3dFbXB0eUZvcm1hdHRpbmc7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM5ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBfdGhpcyRwcm9wczkkdmFsdWUgPSBfdGhpcyRwcm9wczkudmFsdWUsXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwcm9wczkkdmFsdWUgPT09IHZvaWQgMCA/IGRlZmF1bHRWYWx1ZSA6IF90aGlzJHByb3BzOSR2YWx1ZSxcbiAgICAgICAgICBpc051bWVyaWNTdHJpbmcgPSBfdGhpcyRwcm9wczkuaXNOdW1lcmljU3RyaW5nO1xuICAgICAgdmFyIGlzTm9uTnVtZXJpY0ZhbHN5ID0gIXZhbHVlICYmIHZhbHVlICE9PSAwO1xuXG4gICAgICBpZiAoaXNOb25OdW1lcmljRmFsc3kgJiYgYWxsb3dFbXB0eUZvcm1hdHRpbmcpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH0gLy8gaWYgdmFsdWUgaXMgbm90IGRlZmluZWQgcmV0dXJuIGVtcHR5IHN0cmluZ1xuXG5cbiAgICAgIGlmIChpc05vbk51bWVyaWNGYWxzeSAmJiAhYWxsb3dFbXB0eUZvcm1hdHRpbmcpIHJldHVybiAnJztcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICBpc051bWVyaWNTdHJpbmcgPSB0cnVlO1xuICAgICAgfSAvL2NoYW5nZSBpbmZpbml0eSB2YWx1ZSB0byBlbXB0eSBzdHJpbmdcblxuXG4gICAgICBpZiAodmFsdWUgPT09ICdJbmZpbml0eScgJiYgaXNOdW1lcmljU3RyaW5nKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9IC8vcm91bmQgdGhlIG51bWJlciBiYXNlZCBvbiBkZWNpbWFsU2NhbGVcbiAgICAgIC8vZm9ybWF0IG9ubHkgaWYgbm9uIGZvcm1hdHRlZCB2YWx1ZSBpcyBwcm92aWRlZFxuXG5cbiAgICAgIGlmIChpc051bWVyaWNTdHJpbmcgJiYgIWZvcm1hdCAmJiB0eXBlb2YgZGVjaW1hbFNjYWxlID09PSAnbnVtYmVyJykge1xuICAgICAgICB2YWx1ZSA9IHJvdW5kVG9QcmVjaXNpb24odmFsdWUsIGRlY2ltYWxTY2FsZSwgZml4ZWREZWNpbWFsU2NhbGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSBpc051bWVyaWNTdHJpbmcgPyB0aGlzLmZvcm1hdE51bVN0cmluZyh2YWx1ZSkgOiB0aGlzLmZvcm1hdElucHV0KHZhbHVlKTtcbiAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0TmVnYXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0TmVnYXRpb24oKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICAgICAgdmFyIGFsbG93TmVnYXRpdmUgPSB0aGlzLnByb3BzLmFsbG93TmVnYXRpdmU7XG4gICAgICB2YXIgbmVnYXRpb25SZWdleCA9IG5ldyBSZWdFeHAoJygtKScpO1xuICAgICAgdmFyIGRvdWJsZU5lZ2F0aW9uUmVnZXggPSBuZXcgUmVnRXhwKCcoLSkoLikqKC0pJyk7IC8vIENoZWNrIG51bWJlciBoYXMgJy0nIHZhbHVlXG5cbiAgICAgIHZhciBoYXNOZWdhdGlvbiA9IG5lZ2F0aW9uUmVnZXgudGVzdCh2YWx1ZSk7IC8vIENoZWNrIG51bWJlciBoYXMgMiBvciBtb3JlICctJyB2YWx1ZXNcblxuICAgICAgdmFyIHJlbW92ZU5lZ2F0aW9uID0gZG91YmxlTmVnYXRpb25SZWdleC50ZXN0KHZhbHVlKTsgLy9yZW1vdmUgbmVnYXRpb25cblxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8tL2csICcnKTtcblxuICAgICAgaWYgKGhhc05lZ2F0aW9uICYmICFyZW1vdmVOZWdhdGlvbiAmJiBhbGxvd05lZ2F0aXZlKSB7XG4gICAgICAgIHZhbHVlID0gJy0nICsgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZm9ybWF0SW5wdXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0SW5wdXQoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICAgICAgdmFyIGZvcm1hdCA9IHRoaXMucHJvcHMuZm9ybWF0OyAvL2Zvcm1hdCBuZWdhdGlvbiBvbmx5IGlmIHdlIGFyZSBmb3JtYXR0aW5nIGFzIG51bWJlclxuXG4gICAgICBpZiAoIWZvcm1hdCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMucmVtb3ZlUHJlZml4QW5kU3VmZml4KHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdE5lZ2F0aW9uKHZhbHVlKTtcbiAgICAgIH0gLy9yZW1vdmUgZm9ybWF0dGluZyBmcm9tIG51bWJlclxuXG5cbiAgICAgIHZhbHVlID0gdGhpcy5yZW1vdmVGb3JtYXR0aW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdE51bVN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKiogZm9ybWF0IHNwZWNpZmljIG1ldGhvZHMgZW5kICoqKi9cblxuICB9LCB7XG4gICAga2V5OiBcImlzQ2hhcmFjdGVyQUZvcm1hdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0NoYXJhY3RlckFGb3JtYXQoY2FyZXRQb3MsIHZhbHVlKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMxMCA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgZm9ybWF0ID0gX3RoaXMkcHJvcHMxMC5mb3JtYXQsXG4gICAgICAgICAgcHJlZml4ID0gX3RoaXMkcHJvcHMxMC5wcmVmaXgsXG4gICAgICAgICAgc3VmZml4ID0gX3RoaXMkcHJvcHMxMC5zdWZmaXgsXG4gICAgICAgICAgZGVjaW1hbFNjYWxlID0gX3RoaXMkcHJvcHMxMC5kZWNpbWFsU2NhbGUsXG4gICAgICAgICAgZml4ZWREZWNpbWFsU2NhbGUgPSBfdGhpcyRwcm9wczEwLmZpeGVkRGVjaW1hbFNjYWxlO1xuXG4gICAgICB2YXIgX3RoaXMkZ2V0U2VwYXJhdG9yczUgPSB0aGlzLmdldFNlcGFyYXRvcnMoKSxcbiAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yID0gX3RoaXMkZ2V0U2VwYXJhdG9yczUuZGVjaW1hbFNlcGFyYXRvcjsgLy9jaGVjayB3aXRoaW4gZm9ybWF0IHBhdHRlcm5cblxuXG4gICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycgJiYgZm9ybWF0W2NhcmV0UG9zXSAhPT0gJyMnKSByZXR1cm4gdHJ1ZTsgLy9jaGVjayBpbiBudW1iZXIgZm9ybWF0XG5cbiAgICAgIGlmICghZm9ybWF0ICYmIChjYXJldFBvcyA8IHByZWZpeC5sZW5ndGggfHwgY2FyZXRQb3MgPj0gdmFsdWUubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCB8fCBkZWNpbWFsU2NhbGUgJiYgZml4ZWREZWNpbWFsU2NhbGUgJiYgdmFsdWVbY2FyZXRQb3NdID09PSBkZWNpbWFsU2VwYXJhdG9yKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjaGVja0lmRm9ybWF0R290RGVsZXRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0lmRm9ybWF0R290RGVsZXRlZChzdGFydCwgZW5kLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFyYWN0ZXJBRm9ybWF0KGksIHZhbHVlKSkgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIGNoZWNrIGlmIGFueSBmb3JtYXR0aW5nIGdvdCByZW1vdmVkIGJ5IHRoZSBkZWxldGUgb3IgYmFja3NwYWNlIGFuZCByZXNldCB0aGUgdmFsdWVcbiAgICAgKiBJdCB3aWxsIGFsc28gd29yayBhcyBmYWxsYmFjayBpZiBhbmRyb2lkIGNob21lIGtleURvd24gaGFuZGxlciBkb2VzIG5vdCB3b3JrXG4gICAgICoqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiY29ycmVjdElucHV0VmFsdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29ycmVjdElucHV0VmFsdWUoY2FyZXRQb3MsIGxhc3RWYWx1ZSwgdmFsdWUpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczExID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczExLmZvcm1hdCxcbiAgICAgICAgICBhbGxvd05lZ2F0aXZlID0gX3RoaXMkcHJvcHMxMS5hbGxvd05lZ2F0aXZlLFxuICAgICAgICAgIHByZWZpeCA9IF90aGlzJHByb3BzMTEucHJlZml4LFxuICAgICAgICAgIHN1ZmZpeCA9IF90aGlzJHByb3BzMTEuc3VmZml4LFxuICAgICAgICAgIGRlY2ltYWxTY2FsZSA9IF90aGlzJHByb3BzMTEuZGVjaW1hbFNjYWxlO1xuXG4gICAgICB2YXIgX3RoaXMkZ2V0U2VwYXJhdG9yczYgPSB0aGlzLmdldFNlcGFyYXRvcnMoKSxcbiAgICAgICAgICBhbGxvd2VkRGVjaW1hbFNlcGFyYXRvcnMgPSBfdGhpcyRnZXRTZXBhcmF0b3JzNi5hbGxvd2VkRGVjaW1hbFNlcGFyYXRvcnMsXG4gICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciA9IF90aGlzJGdldFNlcGFyYXRvcnM2LmRlY2ltYWxTZXBhcmF0b3I7XG5cbiAgICAgIHZhciBsYXN0TnVtU3RyID0gdGhpcy5zdGF0ZS5udW1Bc1N0cmluZyB8fCAnJztcbiAgICAgIHZhciBfdGhpcyRzZWxlY3Rpb25CZWZvcmUgPSB0aGlzLnNlbGVjdGlvbkJlZm9yZUlucHV0LFxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gX3RoaXMkc2VsZWN0aW9uQmVmb3JlLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IF90aGlzJHNlbGVjdGlvbkJlZm9yZS5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgIHZhciBfZmluZENoYW5nZWRJbmRleCA9IGZpbmRDaGFuZ2VkSW5kZXgobGFzdFZhbHVlLCB2YWx1ZSksXG4gICAgICAgICAgc3RhcnQgPSBfZmluZENoYW5nZWRJbmRleC5zdGFydCxcbiAgICAgICAgICBlbmQgPSBfZmluZENoYW5nZWRJbmRleC5lbmQ7XG4gICAgICAvKiogQ2hlY2sgZm9yIGFueSBhbGxvd2VkIGRlY2ltYWwgc2VwYXJhdG9yIGlzIGFkZGVkIGluIHRoZSBudW1lcmljIGZvcm1hdCBhbmQgcmVwbGFjZSBpdCB3aXRoIGRlY2ltYWwgc2VwYXJhdG9yICovXG5cblxuICAgICAgaWYgKCFmb3JtYXQgJiYgc3RhcnQgPT09IGVuZCAmJiBhbGxvd2VkRGVjaW1hbFNlcGFyYXRvcnMuaW5kZXhPZih2YWx1ZVtzZWxlY3Rpb25TdGFydF0pICE9PSAtMSkge1xuICAgICAgICB2YXIgc2VwYXJhdG9yID0gZGVjaW1hbFNjYWxlID09PSAwID8gJycgOiBkZWNpbWFsU2VwYXJhdG9yO1xuICAgICAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIHNlbGVjdGlvblN0YXJ0KSArIHNlcGFyYXRvciArIHZhbHVlLnN1YnN0cihzZWxlY3Rpb25TdGFydCArIDEsIHZhbHVlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICAvKiBkb24ndCBkbyBhbnlodGluZyBpZiBzb21ldGhpbmcgZ290IGFkZGVkLFxuICAgICAgIG9yIGlmIHZhbHVlIGlzIGVtcHR5IHN0cmluZyAod2hlbiB3aG9sZSBpbnB1dCBpcyBjbGVhcmVkKVxuICAgICAgIG9yIHdob2xlIGlucHV0IGlzIHJlcGxhY2Ugd2l0aCBhIG51bWJlclxuICAgICAgKi9cblxuXG4gICAgICB2YXIgbGVmdEJvdW5kID0gISFmb3JtYXQgPyAwIDogcHJlZml4Lmxlbmd0aDtcbiAgICAgIHZhciByaWdodEJvdW5kID0gbGFzdFZhbHVlLmxlbmd0aCAtICghIWZvcm1hdCA/IDAgOiBzdWZmaXgubGVuZ3RoKTtcblxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IGxhc3RWYWx1ZS5sZW5ndGggfHwgIXZhbHVlLmxlbmd0aCB8fCBzdGFydCA9PT0gZW5kIHx8IHNlbGVjdGlvblN0YXJ0ID09PSAwICYmIHNlbGVjdGlvbkVuZCA9PT0gbGFzdFZhbHVlLmxlbmd0aCB8fCBzZWxlY3Rpb25TdGFydCA9PT0gbGVmdEJvdW5kICYmIHNlbGVjdGlvbkVuZCA9PT0gcmlnaHRCb3VuZCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IC8vaWYgZm9ybWF0IGdvdCBkZWxldGVkIHJlc2V0IHRoZSB2YWx1ZSB0byBsYXN0IHZhbHVlXG5cblxuICAgICAgaWYgKHRoaXMuY2hlY2tJZkZvcm1hdEdvdERlbGV0ZWQoc3RhcnQsIGVuZCwgbGFzdFZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGxhc3RWYWx1ZTtcbiAgICAgIH0gLy9mb3IgbnVtYmVycyBjaGVjayBpZiBiZWZvcmVEZWNpbWFsIGdvdCBkZWxldGVkIGFuZCB0aGVyZSBpcyBub3RoaW5nIGFmdGVyIGRlY2ltYWwsXG4gICAgICAvL2NsZWFyIGFsbCBudW1iZXJzIGluIHN1Y2ggY2FzZSB3aGlsZSBrZWVwaW5nIHRoZSAtIHNpZ25cblxuXG4gICAgICBpZiAoIWZvcm1hdCkge1xuICAgICAgICB2YXIgbnVtZXJpY1N0cmluZyA9IHRoaXMucmVtb3ZlRm9ybWF0dGluZyh2YWx1ZSk7XG5cbiAgICAgICAgdmFyIF9zcGxpdERlY2ltYWwyID0gc3BsaXREZWNpbWFsKG51bWVyaWNTdHJpbmcsIGFsbG93TmVnYXRpdmUpLFxuICAgICAgICAgICAgYmVmb3JlRGVjaW1hbCA9IF9zcGxpdERlY2ltYWwyLmJlZm9yZURlY2ltYWwsXG4gICAgICAgICAgICBhZnRlckRlY2ltYWwgPSBfc3BsaXREZWNpbWFsMi5hZnRlckRlY2ltYWwsXG4gICAgICAgICAgICBhZGROZWdhdGlvbiA9IF9zcGxpdERlY2ltYWwyLmFkZE5lZ2F0aW9uOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdFxuICAgICAgICAvL2NsZWFyIG9ubHkgaWYgc29tZXRoaW5nIGdvdCBkZWxldGVkXG5cblxuICAgICAgICB2YXIgaXNCZWZvcmVEZWNpbWFsUG9pbnQgPSBjYXJldFBvcyA8IHZhbHVlLmluZGV4T2YoZGVjaW1hbFNlcGFyYXRvcikgKyAxO1xuXG4gICAgICAgIGlmIChudW1lcmljU3RyaW5nLmxlbmd0aCA8IGxhc3ROdW1TdHIubGVuZ3RoICYmIGlzQmVmb3JlRGVjaW1hbFBvaW50ICYmIGJlZm9yZURlY2ltYWwgPT09ICcnICYmICFwYXJzZUZsb2F0KGFmdGVyRGVjaW1hbCkpIHtcbiAgICAgICAgICByZXR1cm4gYWRkTmVnYXRpb24gPyAnLScgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIC8qKiBVcGRhdGUgdmFsdWUgYW5kIGNhcmV0IHBvc2l0aW9uICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVWYWx1ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWYWx1ZShwYXJhbXMpIHtcbiAgICAgIHZhciBmb3JtYXR0ZWRWYWx1ZSA9IHBhcmFtcy5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgICBpbnB1dCA9IHBhcmFtcy5pbnB1dCxcbiAgICAgICAgICBfcGFyYW1zJHNldENhcmV0UG9zaXQgPSBwYXJhbXMuc2V0Q2FyZXRQb3NpdGlvbixcbiAgICAgICAgICBzZXRDYXJldFBvc2l0aW9uID0gX3BhcmFtcyRzZXRDYXJldFBvc2l0ID09PSB2b2lkIDAgPyB0cnVlIDogX3BhcmFtcyRzZXRDYXJldFBvc2l0O1xuICAgICAgdmFyIG51bUFzU3RyaW5nID0gcGFyYW1zLm51bUFzU3RyaW5nLFxuICAgICAgICAgIGNhcmV0UG9zID0gcGFyYW1zLmNhcmV0UG9zO1xuICAgICAgdmFyIG9uVmFsdWVDaGFuZ2UgPSB0aGlzLnByb3BzLm9uVmFsdWVDaGFuZ2U7XG4gICAgICB2YXIgbGFzdFZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZTtcblxuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIC8vc2V0IGNhcmV0IHBvc2l0aW9uLCBhbmQgdmFsdWUgaW1wZXJhdGl2ZWx5IHdoZW4gZWxlbWVudCBpcyBwcm92aWRlZFxuICAgICAgICBpZiAoc2V0Q2FyZXRQb3NpdGlvbikge1xuICAgICAgICAgIC8vY2FsY3VsYXRlIGNhcmV0IHBvc2l0aW9uIGlmIG5vdCBkZWZpbmVkXG4gICAgICAgICAgaWYgKCFjYXJldFBvcykge1xuICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZSB8fCBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2FyZXRQb3NpdGlvbiA9IGdldEN1cnJlbnRDYXJldFBvc2l0aW9uKGlucHV0KTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogc2V0IHRoZSB2YWx1ZSBpbXBlcmF0aXZlbHksIHRoaXMgaXMgcmVxdWlyZWQgZm9yIElFIGZpeFxuICAgICAgICAgICAgICogVGhpcyBpcyBhbHNvIHJlcXVpcmVkIGFzIGlmIG5ldyBjYXJldCBwb3NpdGlvbiBpcyBiZXlvbmQgdGhlIHByZXZpb3VzIHZhbHVlLlxuICAgICAgICAgICAgICogQ2FyZXQgcG9zaXRpb24gd2lsbCBub3QgYmUgc2V0IGNvcnJlY3RseVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gZm9ybWF0dGVkVmFsdWU7IC8vZ2V0IHRoZSBjYXJldCBwb3NpdGlvblxuXG4gICAgICAgICAgICBjYXJldFBvcyA9IHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbihpbnB1dFZhbHVlLCBmb3JtYXR0ZWRWYWx1ZSwgY3VycmVudENhcmV0UG9zaXRpb24pO1xuICAgICAgICAgIH0gLy9zZXQgY2FyZXQgcG9zaXRpb25cblxuXG4gICAgICAgICAgdGhpcy5zZXRQYXRjaGVkQ2FyZXRQb3NpdGlvbihpbnB1dCwgY2FyZXRQb3MsIGZvcm1hdHRlZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBpZiB3ZSBhcmUgbm90IHNldHRpbmcgY2FyZXQgcG9zaXRpb24gc2V0IHRoZSB2YWx1ZSBpbXBlcmF0aXZlbHkuXG4gICAgICAgICAgICogVGhpcyBpcyByZXF1aXJlZCBvbiBvbkJsdXIgbWV0aG9kXG4gICAgICAgICAgICovXG4gICAgICAgICAgaW5wdXQudmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSAvL2NhbGN1bGF0ZSBudW1lcmljIHN0cmluZyBpZiBub3QgcGFzc2VkXG5cblxuICAgICAgaWYgKG51bUFzU3RyaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbnVtQXNTdHJpbmcgPSB0aGlzLnJlbW92ZUZvcm1hdHRpbmcoZm9ybWF0dGVkVmFsdWUpO1xuICAgICAgfSAvL3VwZGF0ZSBzdGF0ZSBpZiB2YWx1ZSBpcyBjaGFuZ2VkXG5cblxuICAgICAgaWYgKGZvcm1hdHRlZFZhbHVlICE9PSBsYXN0VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdmFsdWU6IGZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgIG51bUFzU3RyaW5nOiBudW1Bc1N0cmluZ1xuICAgICAgICB9KTsgLy8gdHJpZ2dlciBvblZhbHVlQ2hhbmdlIHN5bmNocm9ub3VzbHksIHNvIHBhcmVudCBpcyB1cGRhdGVkIGFsb25nIHdpdGggdGhlIG51bWJlciBmb3JtYXQuIEZpeCBmb3IgIzI3NywgIzI4N1xuXG4gICAgICAgIG9uVmFsdWVDaGFuZ2UodGhpcy5nZXRWYWx1ZU9iamVjdChmb3JtYXR0ZWRWYWx1ZSwgbnVtQXNTdHJpbmcpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25DaGFuZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZSkge1xuICAgICAgdmFyIGVsID0gZS50YXJnZXQ7XG4gICAgICB2YXIgaW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaXNBbGxvd2VkID0gcHJvcHMuaXNBbGxvd2VkO1xuICAgICAgdmFyIGxhc3RWYWx1ZSA9IHN0YXRlLnZhbHVlIHx8ICcnO1xuICAgICAgdmFyIGN1cnJlbnRDYXJldFBvc2l0aW9uID0gZ2V0Q3VycmVudENhcmV0UG9zaXRpb24oZWwpO1xuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY29ycmVjdElucHV0VmFsdWUoY3VycmVudENhcmV0UG9zaXRpb24sIGxhc3RWYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgICB2YXIgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdElucHV0KGlucHV0VmFsdWUpIHx8ICcnO1xuICAgICAgdmFyIG51bUFzU3RyaW5nID0gdGhpcy5yZW1vdmVGb3JtYXR0aW5nKGZvcm1hdHRlZFZhbHVlKTtcbiAgICAgIHZhciB2YWx1ZU9iaiA9IHRoaXMuZ2V0VmFsdWVPYmplY3QoZm9ybWF0dGVkVmFsdWUsIG51bUFzU3RyaW5nKTtcblxuICAgICAgaWYgKCFpc0FsbG93ZWQodmFsdWVPYmopKSB7XG4gICAgICAgIGZvcm1hdHRlZFZhbHVlID0gbGFzdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKHtcbiAgICAgICAgZm9ybWF0dGVkVmFsdWU6IGZvcm1hdHRlZFZhbHVlLFxuICAgICAgICBudW1Bc1N0cmluZzogbnVtQXNTdHJpbmcsXG4gICAgICAgIGlucHV0VmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICAgIGlucHV0OiBlbFxuICAgICAgfSk7XG4gICAgICBwcm9wcy5vbkNoYW5nZShlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25CbHVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQmx1cihlKSB7XG4gICAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBmb3JtYXQgPSBwcm9wcy5mb3JtYXQsXG4gICAgICAgICAgb25CbHVyID0gcHJvcHMub25CbHVyLFxuICAgICAgICAgIGFsbG93TGVhZGluZ1plcm9zID0gcHJvcHMuYWxsb3dMZWFkaW5nWmVyb3M7XG4gICAgICB2YXIgbnVtQXNTdHJpbmcgPSBzdGF0ZS5udW1Bc1N0cmluZztcbiAgICAgIHZhciBsYXN0VmFsdWUgPSBzdGF0ZS52YWx1ZTtcbiAgICAgIHRoaXMuZm9jdXNlZEVsbSA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLmZvY3VzVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c1RpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZvcm1hdCkge1xuICAgICAgICAvLyBpZiB0aGUgbnVtQXNTdHJpbmcgaXMgbm90IGEgdmFsaWQgbnVtYmVyIHJlc2V0IGl0IHRvIGVtcHR5XG4gICAgICAgIGlmIChpc05hTihwYXJzZUZsb2F0KG51bUFzU3RyaW5nKSkpIHtcbiAgICAgICAgICBudW1Bc1N0cmluZyA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFhbGxvd0xlYWRpbmdaZXJvcykge1xuICAgICAgICAgIG51bUFzU3RyaW5nID0gZml4TGVhZGluZ1plcm8obnVtQXNTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXROdW1TdHJpbmcobnVtQXNTdHJpbmcpOyAvL2NoYW5nZSB0aGUgc3RhdGVcblxuICAgICAgICBpZiAoZm9ybWF0dGVkVmFsdWUgIT09IGxhc3RWYWx1ZSkge1xuICAgICAgICAgIC8vIHRoZSBldmVudCBuZWVkcyB0byBiZSBwZXJzaXN0ZWQgYmVjYXVzZSBpdHMgcHJvcGVydGllcyBjYW4gYmUgYWNjZXNzZWQgaW4gYW4gYXN5bmNocm9ub3VzIHdheVxuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoe1xuICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWU6IGZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgICAgbnVtQXNTdHJpbmc6IG51bUFzU3RyaW5nLFxuICAgICAgICAgICAgaW5wdXQ6IGUudGFyZ2V0LFxuICAgICAgICAgICAgc2V0Q2FyZXRQb3NpdGlvbjogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvbkJsdXIoZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uQmx1cihlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25LZXlEb3duXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uS2V5RG93bihlKSB7XG4gICAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICAgIHZhciBrZXkgPSBlLmtleTtcbiAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGVsLnNlbGVjdGlvbkVuZCxcbiAgICAgICAgICBfZWwkdmFsdWUgPSBlbC52YWx1ZSxcbiAgICAgICAgICB2YWx1ZSA9IF9lbCR2YWx1ZSA9PT0gdm9pZCAwID8gJycgOiBfZWwkdmFsdWU7XG4gICAgICB2YXIgZXhwZWN0ZWRDYXJldFBvc2l0aW9uO1xuICAgICAgdmFyIF90aGlzJHByb3BzMTIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRlY2ltYWxTY2FsZSA9IF90aGlzJHByb3BzMTIuZGVjaW1hbFNjYWxlLFxuICAgICAgICAgIGZpeGVkRGVjaW1hbFNjYWxlID0gX3RoaXMkcHJvcHMxMi5maXhlZERlY2ltYWxTY2FsZSxcbiAgICAgICAgICBwcmVmaXggPSBfdGhpcyRwcm9wczEyLnByZWZpeCxcbiAgICAgICAgICBzdWZmaXggPSBfdGhpcyRwcm9wczEyLnN1ZmZpeCxcbiAgICAgICAgICBmb3JtYXQgPSBfdGhpcyRwcm9wczEyLmZvcm1hdCxcbiAgICAgICAgICBvbktleURvd24gPSBfdGhpcyRwcm9wczEyLm9uS2V5RG93bjtcbiAgICAgIHZhciBpZ25vcmVEZWNpbWFsU2VwYXJhdG9yID0gZGVjaW1hbFNjYWxlICE9PSB1bmRlZmluZWQgJiYgZml4ZWREZWNpbWFsU2NhbGU7XG4gICAgICB2YXIgbnVtUmVnZXggPSB0aGlzLmdldE51bWJlclJlZ2V4KGZhbHNlLCBpZ25vcmVEZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgIHZhciBuZWdhdGl2ZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnLScpO1xuICAgICAgdmFyIGlzUGF0dGVybkZvcm1hdCA9IHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnO1xuICAgICAgdGhpcy5zZWxlY3Rpb25CZWZvcmVJbnB1dCA9IHtcbiAgICAgICAgc2VsZWN0aW9uU3RhcnQ6IHNlbGVjdGlvblN0YXJ0LFxuICAgICAgICBzZWxlY3Rpb25FbmQ6IHNlbGVjdGlvbkVuZFxuICAgICAgfTsgLy9IYW5kbGUgYmFja3NwYWNlIGFuZCBkZWxldGUgYWdhaW5zdCBub24gbnVtZXJpY2FsL2RlY2ltYWwgY2hhcmFjdGVycyBvciBhcnJvdyBrZXlzXG5cbiAgICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnIHx8IGtleSA9PT0gJ0JhY2tzcGFjZScpIHtcbiAgICAgICAgZXhwZWN0ZWRDYXJldFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQgLSAxO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICBleHBlY3RlZENhcmV0UG9zaXRpb24gPSBzZWxlY3Rpb25TdGFydCArIDE7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgZXhwZWN0ZWRDYXJldFBvc2l0aW9uID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICB9IC8vaWYgZXhwZWN0ZWRDYXJldFBvc2l0aW9uIGlzIG5vdCBzZXQgaXQgbWVhbnMgd2UgZG9uJ3Qgd2FudCB0byBIYW5kbGUga2V5RG93blxuICAgICAgLy9hbHNvIGlmIG11bHRpcGxlIGNoYXJhY3RlcnMgYXJlIHNlbGVjdGVkIGRvbid0IGhhbmRsZVxuXG5cbiAgICAgIGlmIChleHBlY3RlZENhcmV0UG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBzZWxlY3Rpb25TdGFydCAhPT0gc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgIG9uS2V5RG93bihlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmV3Q2FyZXRQb3NpdGlvbiA9IGV4cGVjdGVkQ2FyZXRQb3NpdGlvbjtcbiAgICAgIHZhciBsZWZ0Qm91bmQgPSBpc1BhdHRlcm5Gb3JtYXQgPyBmb3JtYXQuaW5kZXhPZignIycpIDogcHJlZml4Lmxlbmd0aDtcbiAgICAgIHZhciByaWdodEJvdW5kID0gaXNQYXR0ZXJuRm9ybWF0ID8gZm9ybWF0Lmxhc3RJbmRleE9mKCcjJykgKyAxIDogdmFsdWUubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aDtcblxuICAgICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcgfHwga2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGtleSA9PT0gJ0Fycm93TGVmdCcgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gdGhpcy5jb3JyZWN0Q2FyZXRQb3NpdGlvbih2YWx1ZSwgZXhwZWN0ZWRDYXJldFBvc2l0aW9uLCBkaXJlY3Rpb24pO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdEZWxldGUnICYmICFudW1SZWdleC50ZXN0KHZhbHVlW2V4cGVjdGVkQ2FyZXRQb3NpdGlvbl0pICYmICFuZWdhdGl2ZVJlZ2V4LnRlc3QodmFsdWVbZXhwZWN0ZWRDYXJldFBvc2l0aW9uXSkpIHtcbiAgICAgICAgd2hpbGUgKCFudW1SZWdleC50ZXN0KHZhbHVlW25ld0NhcmV0UG9zaXRpb25dKSAmJiBuZXdDYXJldFBvc2l0aW9uIDwgcmlnaHRCb3VuZCkge1xuICAgICAgICAgIG5ld0NhcmV0UG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdCYWNrc3BhY2UnICYmICFudW1SZWdleC50ZXN0KHZhbHVlW2V4cGVjdGVkQ2FyZXRQb3NpdGlvbl0pKSB7XG4gICAgICAgIC8qIE5PVEU6IFRoaXMgaXMgc3BlY2lhbCBjYXNlIHdoZW4gYmFja3NwYWNlIGlzIHByZXNzZWQgb24gYVxuICAgICAgICBuZWdhdGl2ZSB2YWx1ZSB3aGlsZSB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGFmdGVyIHByZWZpeC4gV2UgY2FuJ3QgaGFuZGxlIGl0IG9uIG9uQ2hhbmdlIGJlY2F1c2VcbiAgICAgICAgd2Ugd2lsbCBub3QgaGF2ZSBhbnkgaW5mb3JtYXRpb24gb2Yga2V5UHJlc3NcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHNlbGVjdGlvblN0YXJ0IDw9IGxlZnRCb3VuZCArIDEgJiYgdmFsdWVbMF0gPT09ICctJyAmJiB0eXBlb2YgZm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgIGNhcmV0UG9zOiBuZXdDYXJldFBvc2l0aW9uLFxuICAgICAgICAgICAgaW5wdXQ6IGVsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5lZ2F0aXZlUmVnZXgudGVzdCh2YWx1ZVtleHBlY3RlZENhcmV0UG9zaXRpb25dKSkge1xuICAgICAgICAgIHdoaWxlICghbnVtUmVnZXgudGVzdCh2YWx1ZVtuZXdDYXJldFBvc2l0aW9uIC0gMV0pICYmIG5ld0NhcmV0UG9zaXRpb24gPiBsZWZ0Qm91bmQpIHtcbiAgICAgICAgICAgIG5ld0NhcmV0UG9zaXRpb24tLTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gdGhpcy5jb3JyZWN0Q2FyZXRQb3NpdGlvbih2YWx1ZSwgbmV3Q2FyZXRQb3NpdGlvbiwgJ2xlZnQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3Q2FyZXRQb3NpdGlvbiAhPT0gZXhwZWN0ZWRDYXJldFBvc2l0aW9uIHx8IGV4cGVjdGVkQ2FyZXRQb3NpdGlvbiA8IGxlZnRCb3VuZCB8fCBleHBlY3RlZENhcmV0UG9zaXRpb24gPiByaWdodEJvdW5kKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRQYXRjaGVkQ2FyZXRQb3NpdGlvbihlbCwgbmV3Q2FyZXRQb3NpdGlvbiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgLyogTk9URTogdGhpcyBpcyBqdXN0IHJlcXVpcmVkIGZvciB1bml0IHRlc3QgYXMgd2UgbmVlZCB0byBnZXQgdGhlIG5ld0NhcmV0UG9zaXRpb24sXG4gICAgICAgICAgICAgIFJlbW92ZSB0aGlzIHdoZW4geW91IGZpbmQgZGlmZmVyZW50IHNvbHV0aW9uICovXG5cblxuICAgICAgaWYgKGUuaXNVbml0VGVzdFJ1bikge1xuICAgICAgICB0aGlzLnNldFBhdGNoZWRDYXJldFBvc2l0aW9uKGVsLCBuZXdDYXJldFBvc2l0aW9uLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIG9uS2V5RG93bihlKTtcbiAgICB9XG4gICAgLyoqIHJlcXVpcmVkIHRvIGhhbmRsZSB0aGUgY2FyZXQgcG9zaXRpb24gd2hlbiBjbGljayBhbnl3aGVyZSB3aXRoaW4gdGhlIGlucHV0ICoqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25Nb3VzZVVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTW91c2VVcChlKSB7XG4gICAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICAgIC8qKlxuICAgICAgICogTk9URTogd2UgaGF2ZSB0byBnaXZlIGRlZmF1bHQgdmFsdWUgZm9yIHZhbHVlIGFzIGluIGNhc2Ugd2hlbiBjdXN0b20gaW5wdXQgaXMgcHJvdmlkZWRcbiAgICAgICAqIHZhbHVlIGNhbiBjb21lIGFzIHVuZGVmaW5lZCB3aGVuIG5vdGhpbmcgaXMgcHJvdmlkZWQgb24gdmFsdWUgcHJvcC5cbiAgICAgICovXG5cbiAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGVsLnNlbGVjdGlvbkVuZCxcbiAgICAgICAgICBfZWwkdmFsdWUyID0gZWwudmFsdWUsXG4gICAgICAgICAgdmFsdWUgPSBfZWwkdmFsdWUyID09PSB2b2lkIDAgPyAnJyA6IF9lbCR2YWx1ZTI7XG5cbiAgICAgIGlmIChzZWxlY3Rpb25TdGFydCA9PT0gc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgIHZhciBjYXJldFBvc2l0aW9uID0gdGhpcy5jb3JyZWN0Q2FyZXRQb3NpdGlvbih2YWx1ZSwgc2VsZWN0aW9uU3RhcnQpO1xuXG4gICAgICAgIGlmIChjYXJldFBvc2l0aW9uICE9PSBzZWxlY3Rpb25TdGFydCkge1xuICAgICAgICAgIHRoaXMuc2V0UGF0Y2hlZENhcmV0UG9zaXRpb24oZWwsIGNhcmV0UG9zaXRpb24sIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VVcChlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25Gb2N1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkZvY3VzKGUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kIENocm9tZSBhbmQgU2FmYXJpIGJ1ZyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03NzkzMjhcbiAgICAgIC8vIChvbkZvY3VzIGV2ZW50IHRhcmdldCBzZWxlY3Rpb25TdGFydCBpcyBhbHdheXMgMCBiZWZvcmUgc2V0VGltZW91dClcbiAgICAgIGUucGVyc2lzdCgpO1xuICAgICAgdGhpcy5mb2N1c2VkRWxtID0gZS50YXJnZXQ7XG4gICAgICB0aGlzLmZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBlbC5zZWxlY3Rpb25FbmQsXG4gICAgICAgICAgICBfZWwkdmFsdWUzID0gZWwudmFsdWUsXG4gICAgICAgICAgICB2YWx1ZSA9IF9lbCR2YWx1ZTMgPT09IHZvaWQgMCA/ICcnIDogX2VsJHZhbHVlMztcblxuICAgICAgICB2YXIgY2FyZXRQb3NpdGlvbiA9IF90aGlzMi5jb3JyZWN0Q2FyZXRQb3NpdGlvbih2YWx1ZSwgc2VsZWN0aW9uU3RhcnQpOyAvL3NldFBhdGNoZWRDYXJldFBvc2l0aW9uIG9ubHkgd2hlbiBldmVyeXRoaW5nIGlzIG5vdCBzZWxlY3RlZCBvbiBmb2N1cyAod2hpbGUgdGFiYmluZyBpbnRvIHRoZSBmaWVsZClcblxuXG4gICAgICAgIGlmIChjYXJldFBvc2l0aW9uICE9PSBzZWxlY3Rpb25TdGFydCAmJiAhKHNlbGVjdGlvblN0YXJ0ID09PSAwICYmIHNlbGVjdGlvbkVuZCA9PT0gdmFsdWUubGVuZ3RoKSkge1xuICAgICAgICAgIF90aGlzMi5zZXRQYXRjaGVkQ2FyZXRQb3NpdGlvbihlbCwgY2FyZXRQb3NpdGlvbiwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnByb3BzLm9uRm9jdXMoZSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczEzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICB0eXBlID0gX3RoaXMkcHJvcHMxMy50eXBlLFxuICAgICAgICAgIGRpc3BsYXlUeXBlID0gX3RoaXMkcHJvcHMxMy5kaXNwbGF5VHlwZSxcbiAgICAgICAgICBjdXN0b21JbnB1dCA9IF90aGlzJHByb3BzMTMuY3VzdG9tSW5wdXQsXG4gICAgICAgICAgcmVuZGVyVGV4dCA9IF90aGlzJHByb3BzMTMucmVuZGVyVGV4dCxcbiAgICAgICAgICBnZXRJbnB1dFJlZiA9IF90aGlzJHByb3BzMTMuZ2V0SW5wdXRSZWY7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xuICAgICAgdmFyIG90aGVyUHJvcHMgPSBvbWl0KHRoaXMucHJvcHMsIHByb3BUeXBlcyQxKTtcblxuICAgICAgdmFyIGlucHV0UHJvcHMgPSBfZXh0ZW5kcyh7XG4gICAgICAgIGlucHV0TW9kZTogJ251bWVyaWMnXG4gICAgICB9LCBvdGhlclByb3BzLCB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsXG4gICAgICAgIG9uS2V5RG93bjogdGhpcy5vbktleURvd24sXG4gICAgICAgIG9uTW91c2VVcDogdGhpcy5vbk1vdXNlVXAsXG4gICAgICAgIG9uRm9jdXM6IHRoaXMub25Gb2N1cyxcbiAgICAgICAgb25CbHVyOiB0aGlzLm9uQmx1clxuICAgICAgfSk7XG5cbiAgICAgIGlmIChkaXNwbGF5VHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJUZXh0ID8gcmVuZGVyVGV4dCh2YWx1ZSkgfHwgbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIF9leHRlbmRzKHt9LCBvdGhlclByb3BzLCB7XG4gICAgICAgICAgcmVmOiBnZXRJbnB1dFJlZlxuICAgICAgICB9KSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChjdXN0b21JbnB1dCkge1xuICAgICAgICB2YXIgQ3VzdG9tSW5wdXQgPSBjdXN0b21JbnB1dDtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tSW5wdXQsIF9leHRlbmRzKHt9LCBpbnB1dFByb3BzLCB7XG4gICAgICAgICAgcmVmOiBnZXRJbnB1dFJlZlxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgX2V4dGVuZHMoe30sIGlucHV0UHJvcHMsIHtcbiAgICAgICAgcmVmOiBnZXRJbnB1dFJlZlxuICAgICAgfSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBOdW1iZXJGb3JtYXQ7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbk51bWJlckZvcm1hdC5wcm9wVHlwZXMgPSBwcm9wVHlwZXMkMTtcbk51bWJlckZvcm1hdC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckZvcm1hdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oLyohIGRsbC1yZWZlcmVuY2UgZGxsXzUwMzBmMzg3ZDMyOGU0NDE1Nzg1ICovIFwiZGxsLXJlZmVyZW5jZSBkbGxfNTAzMGYzODdkMzI4ZTQ0MTU3ODVcIikpKFwiLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcIik7IiwiaW1wb3J0IENvdW50cnlTdGF0aXN0aWMgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQ291bnRyeVN0YXRpc3RpYydcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5cclxuY29uc3QgSW5kZXggPSAocHJvcHMpID0+IChcclxuICA8ZGl2ID5cclxuICAgIDxDb3VudHJ5U3RhdGlzdGljIGNvdW50cnlEYXRhPXtwcm9wcy5jb3VudHJ5RGF0YX0gLz5cclxuICA8L2Rpdj5cclxuKVxyXG5cclxuSW5kZXguZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcclxuICBjb25zdCByZXNwb3NuZSA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkuY292aWQxOWFwaS5jb20vdG90YWwvY291bnRyeS8ke2NvbnRleHQucXVlcnkuc2x1Z31gKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY291bnRyeURhdGE6IHJlc3Bvc25lLmRhdGFcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4XHJcbiIsIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTnVtYmVyRm9ybWF0IGZyb20gJ3JlYWN0LW51bWJlci1mb3JtYXQnO1xyXG5cclxuY29uc3QgQ291bnRyeVN0YXRpc3RpYyA9ICh7IGNvdW50cnlEYXRhIH0pID0+IHtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8PlxyXG4gICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRoPuGDpeGDleGDlOGDp+GDkOGDnOGDkDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+4YOT4YOQ4YOY4YOb4YOk4YOY4YOq4YOY4YOg4YOU4YOR4YOj4YOa4YOYPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0aD7hg5Lhg5Dhg6Dhg5Phg5Dhg6rhg5Xhg5rhg5jhg5rhg5g8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRoPuGDkuGDkOGDm+GDneGDr+GDkOGDnOGDm+GDoOGDl+GDlOGDmuGDlOGDkeGDo+GDmjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+4YOX4YOQ4YOg4YOY4YOm4YOYPC90aD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnlEYXRhLnNvcnQoKGEsIGIpID0+IGIuQ29uZmlybWVkIC0gYS5Db25maXJtZWQpLm1hcCgoZGF0YSwgaSkgPT5cclxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfT5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhLkNvdW50cnl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkYXRhLkNvbmZpcm1lZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkYXRhLkRlYXRoc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dyZWVuJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGF0YS5SZWNvdmVyZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3I9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57ZGF0YS5EYXRlLnNwbGl0KCdUJylbMF19PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ291bnRyeVN0YXRpc3RpYztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBkbGxfNTAzMGYzODdkMzI4ZTQ0MTU3ODU7Il0sInNvdXJjZVJvb3QiOiIifQ==