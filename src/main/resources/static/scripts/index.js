var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IndexPage = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _possibleConstructorReturn2 = __webpack_require__(28);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(75);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _index = __webpack_require__(88);
	
	var _index2 = __webpack_require__(93);
	
	var _index3 = __webpack_require__(98);
	
	var _Request = __webpack_require__(99);
	
	var _Permission = __webpack_require__(119);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IndexPage = function () {
	    function IndexPage() {
	        var _this = this;
	
	        (0, _classCallCheck3.default)(this, IndexPage);
	
	        this.permissionsMap = new _Permission.Permission();
	
	        this.addTaskBtn = document.querySelector(".button--addTask");
	        this.addTaskBtn.hidden = true;
	
	        this.permissionsMap.getUserRole().then(function () {
	            _this.addTaskPopup = new _index.Popup(document.querySelector(".popup--addTask"));
	
	            _this.addTaskForm = new FormAddTask();
	
	            _this.board = new _index3.Board(document.querySelector(".board"));
	
	            if (!_Permission.Permission.isProductOwner) {
	                _this.addTaskBtn.hidden = false;
	                _this.addTaskBtn.addEventListener("click", _this.addTaskBtnClickHandler.bind(_this));
	            }
	        });
	    }
	
	    (0, _createClass3.default)(IndexPage, [{
	        key: "addTaskBtnClickHandler",
	        value: function addTaskBtnClickHandler() {
	            this.addTaskPopup.open();
	        }
	    }], [{
	        key: "run",
	        value: function run() {
	            IndexPage.instance = new IndexPage();
	        }
	    }, {
	        key: "getInstance",
	        value: function getInstance() {
	            return IndexPage.instance;
	        }
	    }]);
	    return IndexPage;
	}();
	
	var FormAddTask = function (_Form) {
	    (0, _inherits3.default)(FormAddTask, _Form);
	
	    function FormAddTask(options) {
	        (0, _classCallCheck3.default)(this, FormAddTask);
	
	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (FormAddTask.__proto__ || (0, _getPrototypeOf2.default)(FormAddTask)).call(this, document.querySelector(".form--addTask"), options));
	
	        _this2.request = new _Request.Request("/rest/task/add", "GET");
	        return _this2;
	    }
	
	    (0, _createClass3.default)(FormAddTask, [{
	        key: "getData",
	        value: function getData() {
	            var data = {};
	            this.inputs.forEach(function (item) {
	                return data[item.getName()] = item.getValue();
	            });
	            return data;
	        }
	    }, {
	        key: "submitHandler",
	        value: function submitHandler(e) {
	            e.preventDefault();
	
	            this.request.send(this.getData()).then(function (response) {
	                console.log(response);
	            }).catch(function (error) {
	                console.log("Error: " + error);
	            });
	
	            console.log("FormAddTask submitting!");
	        }
	    }]);
	    return FormAddTask;
	}(_index2.Form);
	
	exports.IndexPage = IndexPage;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(5)
	  , $getPrototypeOf = __webpack_require__(7);
	
	__webpack_require__(13)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(8)
	  , toObject    = __webpack_require__(5)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys')
	  , uid    = __webpack_require__(12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , hide      = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(29);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(30);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(59);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	__webpack_require__(54);
	module.exports = __webpack_require__(58).f('iterator');

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(33)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(35)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(36)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(37)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(38)
	  , $iterCreate    = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(52)
	  , getPrototypeOf = __webpack_require__(7)
	  , ITERATOR       = __webpack_require__(53)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(40)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(52)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(53)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(41)
	  , enumBugKeys = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(51).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(42);
	
	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(50);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(44)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(9)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(46);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(34)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(53)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(10)('wks')
	  , uid        = __webpack_require__(12)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(38)
	  , TO_STRING_TAG = __webpack_require__(53)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(56)
	  , step             = __webpack_require__(57)
	  , Iterators        = __webpack_require__(38)
	  , toIObject        = __webpack_require__(44);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(35)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(53);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(23)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(37)
	  , META           = __webpack_require__(62).KEY
	  , $fails         = __webpack_require__(24)
	  , shared         = __webpack_require__(10)
	  , setToStringTag = __webpack_require__(52)
	  , uid            = __webpack_require__(12)
	  , wks            = __webpack_require__(53)
	  , wksExt         = __webpack_require__(58)
	  , wksDefine      = __webpack_require__(63)
	  , keyOf          = __webpack_require__(64)
	  , enumKeys       = __webpack_require__(65)
	  , isArray        = __webpack_require__(68)
	  , anObject       = __webpack_require__(20)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(26)
	  , createDesc     = __webpack_require__(27)
	  , _create        = __webpack_require__(40)
	  , gOPNExt        = __webpack_require__(69)
	  , $GOPD          = __webpack_require__(71)
	  , $DP            = __webpack_require__(19)
	  , $keys          = __webpack_require__(42)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(67).f  = $propertyIsEnumerable;
	  __webpack_require__(66).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(36)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(12)('meta')
	  , isObject = __webpack_require__(21)
	  , has      = __webpack_require__(8)
	  , setDesc  = __webpack_require__(19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(36)
	  , wksExt         = __webpack_require__(58)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(42)
	  , toIObject = __webpack_require__(44);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(42)
	  , gOPS    = __webpack_require__(66)
	  , pIE     = __webpack_require__(67);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 67 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(46);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(44)
	  , gOPN      = __webpack_require__(70).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(43)
	  , hiddenKeys = __webpack_require__(50).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(67)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 72 */
/***/ function(module, exports) {



/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63)('asyncIterator');

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63)('observable');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(76);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(80);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(29);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(79).set});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, __webpack_require__(71).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(40)});

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(85);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Popup = undefined;
	
	var _assign = __webpack_require__(89);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Popup = function () {
	    function Popup(context, options) {
	        (0, _classCallCheck3.default)(this, Popup);
	
	        this.context = context;
	        this.options = (0, _assign2.default)(Popup.defaults, options);
	
	        this.elements = {};
	
	        this.elements.root = this.context;
	
	        if (!this.context.classList.contains(Popup.classes.root)) {
	            this.elements.root = this.context.querySelector("." + Popup.classes.root);
	        }
	
	        if (!this.elements.root) {
	            throw new Error("Context " + this.context + " has no ." + Popup.classes.root + " element");
	        }
	
	        this.initElements();
	        this.initHandlers();
	    }
	
	    (0, _createClass3.default)(Popup, [{
	        key: "initElements",
	        value: function initElements() {
	            for (var item in Popup.classes) {
	                if (!Popup.classes.hasOwnProperty(item)) continue;
	
	                if (item === "root") continue; // root element is already initialized
	
	                this.elements[item] = this.elements.root.querySelector("." + Popup.classes[item]);
	                if (!this.elements[item]) {
	                    console.log(item + " is not found.");
	                }
	            }
	        }
	    }, {
	        key: "initHandlers",
	        value: function initHandlers() {
	            this.elements.closeBtn.addEventListener("click", this.closeBtnClickHandler.bind(this));
	        }
	    }, {
	        key: "open",
	        value: function open() {
	            this.onBeforeOpen();
	
	            this.elements.root.classList.remove(Popup.classes.root + Popup.modifiers.root.isClosed);
	
	            this.onAfterOpen();
	        }
	    }, {
	        key: "close",
	        value: function close() {
	            this.onBeforeClose();
	
	            this.elements.root.classList.add(Popup.classes.root + Popup.modifiers.root.isClosed);
	
	            this.onAfterClose();
	        }
	    }, {
	        key: "closeBtnClickHandler",
	        value: function closeBtnClickHandler(e) {
	            e.preventDefault();
	            this.close();
	        }
	    }, {
	        key: "onBeforeClose",
	        value: function onBeforeClose() {}
	    }, {
	        key: "onAfterClose",
	        value: function onAfterClose() {}
	    }, {
	        key: "onBeforeOpen",
	        value: function onBeforeOpen() {}
	    }, {
	        key: "onAfterOpen",
	        value: function onAfterOpen() {}
	    }]);
	    return Popup;
	}();
	
	Popup.classes = {
	    root: "popup",
	    window: "popup-window",
	    closeBtn: "popup-closeBtn"
	};
	
	Popup.modifiers = {
	    root: {
	        isClosed: "--isClosed"
	    }
	};
	
	Popup.defaults = {};
	
	exports.Popup = Popup;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(92)});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(42)
	  , gOPS     = __webpack_require__(66)
	  , pIE      = __webpack_require__(67)
	  , toObject = __webpack_require__(5)
	  , IObject  = __webpack_require__(45)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(24)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Form = undefined;
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _index = __webpack_require__(94);
	
	var _index2 = __webpack_require__(95);
	
	var _index3 = __webpack_require__(97);
	
	var _index4 = __webpack_require__(96);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Form = function () {
	    function Form(context, options) {
	        (0, _classCallCheck3.default)(this, Form);
	
	        this.context = context;
	        this.options = options || {};
	
	        var inputElements = this.context.querySelectorAll(".input");
	
	        if (inputElements) {
	            this.inputs = Array.prototype.map.call(inputElements, function (element) {
	                if (element.classList.contains("inputDropdown")) {
	                    return new _index.InputDropdown(element);
	                }
	
	                if (element.classList.contains("inputText")) {
	                    return new _index2.InputText(element);
	                }
	
	                if (element.classList.contains("inputTextarea")) {
	                    return new _index3.InputTextarea(element);
	                }
	
	                return new _index4.Input(element);
	            });
	        }
	
	        this.context.addEventListener("submit", this.submitHandler.bind(this));
	    }
	
	    (0, _createClass3.default)(Form, [{
	        key: "submitHandler",
	        value: function submitHandler(e) {
	            e.preventDefault();
	            console.log("Submitting!");
	        }
	    }]);
	    return Form;
	}();
	
	exports.Form = Form;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InputDropdown = undefined;
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InputDropdown = function () {
	    function InputDropdown(context) {
	        var _this = this;
	
	        (0, _classCallCheck3.default)(this, InputDropdown);
	
	        this.context = context;
	
	        this.inputArea = this.context.querySelector(".inputDropdown-wrapper");
	        this.inputArea.addEventListener("click", this.inputAreaClickHandler.bind(this));
	
	        this.input = this.context.querySelector(".inputDropdown-el");
	        this.fakeInput = this.context.querySelector(".inputDropdown-fakeInput");
	
	        this.isClosed = this.context.classList.contains("inputDropdown--closed");
	        this.optionsList = this.context.querySelector(".inputDropdown-list");
	        this.options = this.context.querySelectorAll(".inputDropdown-option");
	
	        this.currentOption = -1;
	
	        this.defaulOffset = getComputedStyle(this.optionsList).top;
	        this.optionHeight = parseInt(getComputedStyle(this.options[0]).height, 10);
	
	        document.documentElement.addEventListener("click", this.documentClickHandler.bind(this));
	
	        Array.prototype.forEach.call(this.options, function (option, index) {
	            option.addEventListener("click", _this.optionClickHandler.bind(_this, index));
	            if (_this.input.value === option.getAttribute("data-value")) {
	                _this.selectOption(index);
	            }
	        });
	    }
	
	    (0, _createClass3.default)(InputDropdown, [{
	        key: "getName",
	        value: function getName() {
	            return this.input.name;
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.input.value;
	        }
	    }, {
	        key: "changeOffset",
	        value: function changeOffset() {
	            if (this.currentOption >= 0) {
	                this.optionsList.style.top = -this.optionHeight * this.currentOption + "px";
	            } else {
	                this.optionsList.style.top = this.defaulOffset;
	            }
	        }
	    }, {
	        key: "open",
	        value: function open() {
	            this.changeOffset();
	            this.context.classList.remove("inputDropdown--closed");
	            this.isClosed = false;
	        }
	    }, {
	        key: "close",
	        value: function close() {
	            this.context.classList.add("inputDropdown--closed");
	            this.isClosed = true;
	        }
	    }, {
	        key: "removeSelection",
	        value: function removeSelection(index) {
	            this.options[index].classList.remove("inputDropdown-option--selected");
	        }
	    }, {
	        key: "addSelection",
	        value: function addSelection(index) {
	            this.options[index].classList.add("inputDropdown-option--selected");
	        }
	    }, {
	        key: "selectOption",
	        value: function selectOption(index) {
	            if (this.currentOption >= 0) this.removeSelection(this.currentOption);
	
	            this.addSelection(index);
	
	            this.input.value = this.options[index].getAttribute("data-value");
	            this.fakeInput.innerHTML = this.options[index].innerHTML;
	            this.currentOption = index;
	        }
	    }, {
	        key: "inputAreaClickHandler",
	        value: function inputAreaClickHandler(e) {
	            e.preventDefault();
	            e.stopPropagation();
	
	            if (this.isClosed) {
	                this.open();
	            } else {
	                this.close();
	            }
	        }
	    }, {
	        key: "optionClickHandler",
	        value: function optionClickHandler(index, e) {
	            e.preventDefault();
	            e.stopPropagation();
	
	            this.selectOption(index);
	            this.close();
	        }
	    }, {
	        key: "documentClickHandler",
	        value: function documentClickHandler() {
	            if (!this.isClosed) this.close();
	        }
	    }, {
	        key: "validate",
	        value: function validate() {
	            return true;
	        }
	    }]);
	    return InputDropdown;
	}();
	
	exports.InputDropdown = InputDropdown;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InputText = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(28);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(75);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _index = __webpack_require__(96);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InputText = function (_Input) {
	    (0, _inherits3.default)(InputText, _Input);
	
	    function InputText(context, options) {
	        (0, _classCallCheck3.default)(this, InputText);
	        return (0, _possibleConstructorReturn3.default)(this, (InputText.__proto__ || (0, _getPrototypeOf2.default)(InputText)).call(this, context, options));
	    }
	
	    return InputText;
	}(_index.Input);
	
	exports.InputText = InputText;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Input = undefined;
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Input = function () {
	    function Input(context, options) {
	        (0, _classCallCheck3.default)(this, Input);
	
	        this.context = context;
	
	        if (this.context.classList.contains("input")) {
	            this.root = this.context;
	        } else {
	            this.root = document.querySelector(".input");
	        }
	
	        console.log(this.root);
	
	        this.input = this.root.querySelector(".input-el");
	
	        this.input.addEventListener("input", this.inputHandler.bind(this));
	
	        this.checkEmptity();
	    }
	
	    (0, _createClass3.default)(Input, [{
	        key: "getName",
	        value: function getName() {
	            return this.input.name;
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.input.value;
	        }
	    }, {
	        key: "checkEmptity",
	        value: function checkEmptity() {
	            if (this.input.value === "") {
	                this.root.classList.add("input--empty");
	            } else {
	                this.root.classList.remove("input--empty");
	            }
	        }
	    }, {
	        key: "inputHandler",
	        value: function inputHandler(e) {
	            this.checkEmptity();
	        }
	    }, {
	        key: "focus",
	        value: function focus() {
	            this.input.focus();
	        }
	    }]);
	    return Input;
	}();
	
	exports.Input = Input;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InputTextarea = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(28);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(75);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _index = __webpack_require__(96);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InputTextarea = function (_Input) {
	    (0, _inherits3.default)(InputTextarea, _Input);
	
	    function InputTextarea(context, options) {
	        (0, _classCallCheck3.default)(this, InputTextarea);
	        return (0, _possibleConstructorReturn3.default)(this, (InputTextarea.__proto__ || (0, _getPrototypeOf2.default)(InputTextarea)).call(this, context, options));
	    }
	
	    return InputTextarea;
	}(_index.Input);
	
	exports.InputTextarea = InputTextarea;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Board = undefined;
	
	var _assign = __webpack_require__(89);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Request = __webpack_require__(99);
	
	var _mock = __webpack_require__(116);
	
	var _index = __webpack_require__(117);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Board = function () {
	    function Board(context, options) {
	        (0, _classCallCheck3.default)(this, Board);
	
	        this.context = context;
	        this.options = (0, _assign2.default)({}, Board.defaults, options);
	
	        this.elements = {};
	        this.elements.root = this.context;
	
	        this.board = {};
	        this.board.main = this.elements.root.querySelector("." + Board.classes.main);
	        this.board.queue = this.elements.root.querySelector("." + Board.classes.queue);
	        this.loadElements();
	    }
	
	    (0, _createClass3.default)(Board, [{
	        key: "loadElements",
	        value: function loadElements() {
	            var _this = this;
	
	            var request = new _Request.Request("/rest/blackboard", "GET");
	
	            request.send().then(function (response) {
	                _this.queue = response.queue;
	                _this.tasksLists = response.developers;
	                _this.initQueue();
	                _this.initElements();
	            }).catch(function (error) {
	                console.log("Error: " + error);
	            });
	        }
	    }, {
	        key: "initElements",
	        value: function initElements() {
	            var index = 1;
	            for (var item in this.tasksLists) {
	                if (!this.tasksLists.hasOwnProperty(item)) continue;
	
	                this.board.main.appendChild(Board.createBoardList(index));
	                this.elements[item] = new _index.TaskList(document.querySelector("#" + Board.classes.list + index), {
	                    tasks: this.tasksLists[item].tasks,
	                    firstName: this.tasksLists[item].firstName,
	                    index: index++
	                });
	            }
	        }
	    }, {
	        key: "initQueue",
	        value: function initQueue() {
	            this.elements[0] = new _index.TaskList(this.board.queue, {
	                tasks: this.queue,
	                firstName: 'Queue', index: 0
	            });
	        }
	    }, {
	        key: "initUserTasks",
	        value: function initUserTasks() {
	            for (var item in this.queue) {
	                if (!this.queue.hasOwnProperty(item)) continue;
	
	                var div = document.createElement('div');
	                div.className = 'board-list';
	                this.board.main.appendChild(div);
	                this.elements[item] = new _index.TaskList(div);
	            }
	        }
	    }], [{
	        key: "createBoardList",
	        value: function createBoardList(index) {
	            var div = document.createElement('div');
	            var id = "" + Board.classes.list + index;
	            div.setAttribute('id', id);
	            div.className = Board.classes.list;
	            return div;
	        }
	    }]);
	    return Board;
	}();
	
	Board.defaults = {};
	
	Board.classes = {
	    root: 'board',
	    main: 'board-main',
	    queue: 'board-queue',
	    list: 'board-list'
	};
	
	exports.Board = Board;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Request = undefined;
	
	var _promise = __webpack_require__(100);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Request = function () {
	    function Request(url, method, headers) {
	        (0, _classCallCheck3.default)(this, Request);
	
	        this.method = method || "GET";
	        this.url = url || window.location.href;
	        this.headers = headers || {};
	    }
	
	    (0, _createClass3.default)(Request, [{
	        key: "send",
	        value: function send(data) {
	            var _this = this;
	
	            return new _promise2.default(function (resolve, reject) {
	                var xhr = void 0,
	                    tid = void 0;
	                data = data || {};
	
	                try {
	                    xhr = Request.makeXhr();
	                } catch (e) {
	                    reject(Request.ENOXHR);
	                }
	
	                var payload = Request.encode(data);
	                var url = _this.url;
	
	                if (_this.method === "GET" && payload) {
	                    url += '?' + payload;
	                    payload = null;
	                }
	
	                xhr.open(_this.method, url);
	
	                var contentType = "application/x-www-form-urlencoded";
	
	                for (var item in _this.headers) {
	                    if (!_this.headers.hasOwnProperty(item)) continue;
	
	                    if (item.toLowerCase() === "content-type") {
	                        contentType = _this.headers[item];
	                    }
	
	                    xhr.setRequestHeader(item, _this.headers[item]);
	                }
	
	                if (Request.timeout) {
	                    var _tid = setTimeout(function () {
	                        xhr.abort();
	                        reject(Request.ETIMEOUT, xhr);
	                    }, Request.timeout);
	                }
	
	                xhr.onreadystatechange = function () {
	
	                    if (Request.timeout) {
	                        clearTimeout(tid);
	                    }
	
	                    if (xhr.readyState === 4) {
	                        if (!xhr.status || (xhr.status < 200 || xhr.status >= 300) && xhr.status !== 304) {
	                            reject(xhr.responseText, xhr);
	                        }
	
	                        resolve(xhr.responseText, xhr);
	                    }
	                };
	
	                xhr.send(payload);
	            });
	        }
	    }], [{
	        key: "encode",
	        value: function encode(data) {
	            if (typeof data === "string") {
	                return data;
	            }
	
	            var params = [];
	
	            for (var key in data) {
	                if (!data.hasOwnProperty(key)) continue;
	
	                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	            }
	
	            return params.join('&');
	        }
	    }, {
	        key: "makeXhr",
	        value: function makeXhr() {
	            var xhr = void 0;
	            if (window.XMLHttpRequest) {
	                xhr = new XMLHttpRequest();
	            } else if (window.ActiveXObject) {
	                try {
	                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
	                } catch (e) {
	                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
	                }
	            }
	            return xhr;
	        }
	    }]);
	    return Request;
	}();
	
	Request.ENOXHR = 1;
	Request.ETIMEOUT = 2;
	Request.timeout = 0;
	
	exports.Request = Request;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(72);
	__webpack_require__(32);
	__webpack_require__(54);
	__webpack_require__(102);
	module.exports = __webpack_require__(15).Promise;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(36)
	  , global             = __webpack_require__(11)
	  , ctx                = __webpack_require__(16)
	  , classof            = __webpack_require__(103)
	  , $export            = __webpack_require__(14)
	  , isObject           = __webpack_require__(21)
	  , aFunction          = __webpack_require__(17)
	  , anInstance         = __webpack_require__(104)
	  , forOf              = __webpack_require__(105)
	  , speciesConstructor = __webpack_require__(109)
	  , task               = __webpack_require__(110).set
	  , microtask          = __webpack_require__(112)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(53)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(113)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(52)($Promise, PROMISE);
	__webpack_require__(114)(PROMISE);
	Wrapper = __webpack_require__(15)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(115)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(46)
	  , TAG = __webpack_require__(53)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(16)
	  , call        = __webpack_require__(106)
	  , isArrayIter = __webpack_require__(107)
	  , anObject    = __webpack_require__(20)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(108)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(38)
	  , ITERATOR   = __webpack_require__(53)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(103)
	  , ITERATOR  = __webpack_require__(53)('iterator')
	  , Iterators = __webpack_require__(38);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(20)
	  , aFunction = __webpack_require__(17)
	  , SPECIES   = __webpack_require__(53)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(16)
	  , invoke             = __webpack_require__(111)
	  , html               = __webpack_require__(51)
	  , cel                = __webpack_require__(25)
	  , global             = __webpack_require__(11)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(46)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , macrotask = __webpack_require__(110).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(46)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(11)
	  , core        = __webpack_require__(15)
	  , dP          = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(23)
	  , SPECIES     = __webpack_require__(53)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(53)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var BLACKBOARD = exports.BLACKBOARD = {
	    "developers": [{ "id": 1, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 2,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 3, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 4,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 5, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 7,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 8, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 9,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 10, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 11,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 13, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 14,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 15, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 16,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 17, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 20,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 21, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 22,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 23, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 24,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 26, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 27,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 28, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 29,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 30, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 32,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 33, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 34,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }, { "id": 35, "firstName": "Developer", "lastName": "Test", "photoUrl": null, "tasks": [] }, {
	        "id": 36,
	        "firstName": "Developer",
	        "lastName": "Test",
	        "photoUrl": null,
	        "tasks": []
	    }],
	    "queue": [{ "id": 1, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 2,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }, { "id": 3, "title": "task 2", "text": "TODO 2", "priority": "priority2" }, {
	        "id": 4,
	        "title": "task 3",
	        "text": "TODO 3",
	        "priority": "priority0"
	    }, { "id": 5, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 6,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }, { "id": 7, "title": "task 2", "text": "TODO 2", "priority": "priority2" }, {
	        "id": 8,
	        "title": "task 3",
	        "text": "TODO 3",
	        "priority": "priority0"
	    }, { "id": 9, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 10,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }, { "id": 11, "title": "task 2", "text": "TODO 2", "priority": "priority2" }, {
	        "id": 12,
	        "title": "task 3",
	        "text": "TODO 3",
	        "priority": "priority0"
	    }, { "id": 13, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 14,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }, { "id": 15, "title": "task 2", "text": "TODO 2", "priority": "priority2" }, {
	        "id": 16,
	        "title": "task 3",
	        "text": "TODO 3",
	        "priority": "priority0"
	    }, { "id": 17, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 18,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }, { "id": 19, "title": "task 2", "text": "TODO 2", "priority": "priority2" }, {
	        "id": 20,
	        "title": "task 3",
	        "text": "TODO 3",
	        "priority": "priority0"
	    }, { "id": 21, "title": "task 0", "text": "TODO 0", "priority": "priority0" }, {
	        "id": 22,
	        "title": "task 1",
	        "text": "TODO 1",
	        "priority": "priority1"
	    }]
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TaskList = undefined;
	
	var _assign = __webpack_require__(89);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _index = __webpack_require__(118);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TaskList = function () {
	    function TaskList(context, options) {
	        (0, _classCallCheck3.default)(this, TaskList);
	
	        this.options = (0, _assign2.default)(TaskList.defaults, options);
	
	        this.elements = {};
	
	        context.appendChild(TaskList.createTaskList(options));
	
	        this.context = context.querySelector('#' + TaskList.classes.root + options.index);
	        this.elements.root = this.context;
	
	        this.setTitle();
	        this.initElements();
	    }
	
	    (0, _createClass3.default)(TaskList, [{
	        key: 'initElements',
	        value: function initElements() {
	            var index = 1;
	            for (var item in TaskList.defaults.tasks) {
	                this.context.appendChild(_index.Task.createElement(index));
	                this.elements[item] = new _index.Task(document.querySelector('#task' + index++), { task: TaskList.defaults.tasks[item] });
	            }
	        }
	    }, {
	        key: 'setTitle',
	        value: function setTitle() {
	            this.context.appendChild(TaskList.createTitle());
	        }
	    }], [{
	        key: 'createTaskList',
	        value: function createTaskList(options) {
	            var taskList = document.createElement('div');
	            taskList.className = TaskList.classes.root;
	            taskList.setAttribute('id', '' + TaskList.classes.root + options.index);
	
	            return taskList;
	        }
	    }, {
	        key: 'createTitle',
	        value: function createTitle() {
	            var title = document.createElement('h2');
	            title.className = TaskList.classes.title;
	            title.innerHTML = TaskList.defaults.firstName;
	            return title;
	        }
	    }]);
	    return TaskList;
	}();
	
	TaskList.classes = {
	    root: "taskList",
	    title: "taskList-title"
	
	};
	
	TaskList.defaults = {};
	
	exports.TaskList = TaskList;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Task = undefined;
	
	var _assign = __webpack_require__(89);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Permission = __webpack_require__(119);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Task = function () {
	    function Task(context, options) {
	        (0, _classCallCheck3.default)(this, Task);
	
	        this.context = context;
	        this.options = (0, _assign2.default)({}, Task.defaults, options);
	
	        this.elements = {};
	
	        this.elements.root = this.context;
	
	        if (!this.context.classList.contains(Task.classes.root)) {
	            this.elements.root = this.context.querySelector("." + Task.classes.root);
	        }
	
	        if (!this.elements.root) {
	            throw new Error("Context " + this.context + " has no ." + Task.classes.root + " element");
	        }
	        this.initElements();
	        this.initHandlers();
	
	        if (this.options.draggable) {
	            this.elements.root.setAttribute("draggable", "true");
	        }
	    }
	
	    (0, _createClass3.default)(Task, [{
	        key: "initElements",
	        value: function initElements() {
	            this.context.appendChild(Task.createTitle(this.options.task.title));
	            this.context.appendChild(Task.createDescription(this.options.task.text));
	            this.context.appendChild(Task.createCheck());
	
	            for (var item in Task.classes) {
	                if (!Task.classes.hasOwnProperty(item)) continue;
	
	                if (item === "root") continue; // root element is already initialized
	
	                this.elements[item] = this.elements.root.querySelector("." + Task.classes[item]);
	                if (!this.elements[item]) {
	                    console.log(item + " is not found.");
	                }
	            }
	        }
	    }, {
	        key: "changeStatus",
	        value: function changeStatus() {}
	    }, {
	        key: "initHandlers",
	        value: function initHandlers() {
	            if (!_Permission.Permission.isTeamLead) {
	                return;
	            }
	            document.addEventListener("dragstart", this.dragStartHandler);
	            document.addEventListener("dragover", this.dragOverHandler);
	            document.addEventListener("drop", this.dropHandler);
	        }
	    }, {
	        key: "dragStartHandler",
	        value: function dragStartHandler(e) {
	            e.dataTransfer.setData("text", e.target.id);
	        }
	    }, {
	        key: "dragOverHandler",
	        value: function dragOverHandler(e) {
	            e.preventDefault();
	        }
	    }, {
	        key: "dropHandler",
	        value: function dropHandler(e) {
	            var container = Task.findContainer(e.target);
	            if (!container) return;
	            e.preventDefault();
	            var data = e.dataTransfer.getData("text");
	            container.appendChild(document.getElementById(data));
	        }
	    }], [{
	        key: "createElement",
	        value: function createElement(index) {
	            var div = document.createElement('div');
	            var id = "" + Task.classes.root + index;
	            div.setAttribute('id', id);
	            div.className = Task.classes.root;
	            return div;
	        }
	    }, {
	        key: "createTitle",
	        value: function createTitle(title) {
	            var el = document.createElement('h3');
	            el.className = Task.classes.taskTitle;
	            el.innerHTML = title;
	            return el;
	        }
	    }, {
	        key: "createDescription",
	        value: function createDescription(text) {
	            var el = document.createElement('p');
	            el.className = Task.classes.taskDescription;
	            el.innerHTML = text;
	            return el;
	        }
	    }, {
	        key: "createCheck",
	        value: function createCheck() {
	            var el = document.createElement('span');
	            el.className = Task.classes.taskCheck;
	            return el;
	        }
	    }, {
	        key: "findContainer",
	        value: function findContainer(el) {
	            if (el === null) return;
	            return el.className === 'taskList-queue' ? el : Task.findContainer(el.parentElement);
	        }
	    }]);
	    return Task;
	}();
	
	Task.defaults = {
	    draggable: true,
	    onDragStart: function onDragStart() {},
	    onDragOver: function onDragOver() {},
	    onDrop: function onDrop() {}
	};
	
	Task.classes = {
	    root: "task",
	    taskCheck: "task-check",
	    taskTitle: "task-title",
	    taskDescription: "task-description"
	};
	
	exports.Task = Task;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Permission = undefined;
	
	var _promise = __webpack_require__(100);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(83);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(84);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Request = __webpack_require__(99);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Permission = function () {
	    function Permission() {
	        (0, _classCallCheck3.default)(this, Permission);
	    }
	
	    (0, _createClass3.default)(Permission, [{
	        key: "getUserRole",
	        value: function getUserRole() {
	            var request = new _Request.Request("/rest/user/current", "GET");
	            var mock = {
	                id: 1,
	                userRole: 'PRODUCT_OWNER'
	            };
	
	            return _promise2.default.resolve(mock).then(function (response) {
	                Permission.userRole = response.userRole;
	                console.log(response);
	            });
	        }
	    }], [{
	        key: "run",
	        value: function run() {
	            Permission.instance = new Permission();
	        }
	    }, {
	        key: "getInstance",
	        value: function getInstance() {
	            return Permission.instance;
	        }
	    }, {
	        key: "getUserRole",
	        value: function getUserRole() {
	            return Permission.userRole;
	        }
	    }, {
	        key: "isDeveloper",
	        get: function get() {
	            return Permission.userRole === Permission.USER_ROLES.DEVELOPER;
	        }
	    }, {
	        key: "isTeamLead",
	        get: function get() {
	            return Permission.userRole === Permission.USER_ROLES.TEAM_LEAD;
	        }
	    }, {
	        key: "isProductOwner",
	        get: function get() {
	            return Permission.userRole === Permission.USER_ROLES.PRODUCT_OWNER;
	        }
	    }]);
	    return Permission;
	}();
	
	Permission.USER_ROLES = {
	    DEVELOPER: 'DEVELOPER',
	    TEAM_LEAD: 'TEAM_LEAD',
	    PRODUCT_OWNER: 'PRODUCT_OWNER'
	};
	
	exports.Permission = Permission;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map