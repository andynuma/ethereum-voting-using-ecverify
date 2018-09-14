module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web3_provider__ = __webpack_require__("./web3/provider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web3_artifacts_helloworld_json__ = __webpack_require__("./web3/artifacts/helloworld.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web3_artifacts_helloworld_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__web3_artifacts_helloworld_json__);

var _jsxFileName = "/Users/andy/evoting_beta/client/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// client/pages/index.js



var IndexPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndexPage, _React$Component);

  function IndexPage() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, IndexPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = IndexPage.__proto__ || Object.getPrototypeOf(IndexPage)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "logUser", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _value = _asyncToGenerator(
        /*#__PURE__*/
        __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  //const mymessage = await setHelloworld("fuck you")
                  console.log("aaaaaa");

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function value() {
          return _value.apply(this, arguments);
        };
      }()
    }), _temp));
  }

  _createClass(IndexPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2() {
        var addresses;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return __WEBPACK_IMPORTED_MODULE_2__web3_provider__["a" /* eth */].getAccounts();

              case 2:
                addresses = _context2.sent;
                console.log(addresses); //onst message = await getInstance(helloworld)
                //const const

                console.log("hi");

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("button", {
        onClick: this.logUser,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, "test"));
    }
  }]);

  return IndexPage;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ }),

/***/ "./web3/artifacts/helloworld.json":
/***/ (function(module, exports) {

module.exports = {"contractName":"HelloWorld","abi":[{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c14610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152509050905600a165627a7a7230582074f4b43ea11b6fd884c9f1d8f957964e19bfcc74c45152406809180a433302bf0029","deployedBytecode":"0x608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c14610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152509050905600a165627a7a7230582074f4b43ea11b6fd884c9f1d8f957964e19bfcc74c45152406809180a433302bf0029","sourceMap":"26:104:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:104:0;;;;;;;","deployedSourceMap":"26:104:0:-;;;;;;;;;;;;;;;;;;;;;;;;52:76;;8:9:-1;5:2;;;30:1;27;20:12;5:2;52:76:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;52:76:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;88:6;102:21;;;;;;;;;;;;;;;;;;;;52:76;:::o","source":"pragma solidity ^0.4.4;\n \ncontract HelloWorld {\n \n  function get() public pure returns (string) {\n    return \"Hello World!\";\n  }\n}","sourcePath":"/Users/andy/evoting_beta/contracts/helloworld.sol","ast":{"absolutePath":"/Users/andy/evoting_beta/contracts/helloworld.sol","exportedSymbols":{"HelloWorld":[10]},"id":11,"nodeType":"SourceUnit","nodes":[{"id":1,"literals":["solidity","^","0.4",".4"],"nodeType":"PragmaDirective","src":"0:23:0"},{"baseContracts":[],"contractDependencies":[],"contractKind":"contract","documentation":null,"fullyImplemented":true,"id":10,"linearizedBaseContracts":[10],"name":"HelloWorld","nodeType":"ContractDefinition","nodes":[{"body":{"id":8,"nodeType":"Block","src":"96:32:0","statements":[{"expression":{"argumentTypes":null,"hexValue":"48656c6c6f20576f726c6421","id":6,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"109:14:0","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0","typeString":"literal_string \"Hello World!\""},"value":"Hello World!"},"functionReturnParameters":5,"id":7,"nodeType":"Return","src":"102:21:0"}]},"documentation":null,"id":9,"implemented":true,"isConstructor":false,"isDeclaredConst":true,"modifiers":[],"name":"get","nodeType":"FunctionDefinition","parameters":{"id":2,"nodeType":"ParameterList","parameters":[],"src":"64:2:0"},"payable":false,"returnParameters":{"id":5,"nodeType":"ParameterList","parameters":[{"constant":false,"id":4,"name":"","nodeType":"VariableDeclaration","scope":9,"src":"88:6:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":3,"name":"string","nodeType":"ElementaryTypeName","src":"88:6:0","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"87:8:0"},"scope":10,"src":"52:76:0","stateMutability":"pure","superFunction":null,"visibility":"public"}],"scope":11,"src":"26:104:0"}],"src":"0:130:0"},"legacyAST":{"absolutePath":"/Users/andy/evoting_beta/contracts/helloworld.sol","exportedSymbols":{"HelloWorld":[10]},"id":11,"nodeType":"SourceUnit","nodes":[{"id":1,"literals":["solidity","^","0.4",".4"],"nodeType":"PragmaDirective","src":"0:23:0"},{"baseContracts":[],"contractDependencies":[],"contractKind":"contract","documentation":null,"fullyImplemented":true,"id":10,"linearizedBaseContracts":[10],"name":"HelloWorld","nodeType":"ContractDefinition","nodes":[{"body":{"id":8,"nodeType":"Block","src":"96:32:0","statements":[{"expression":{"argumentTypes":null,"hexValue":"48656c6c6f20576f726c6421","id":6,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"109:14:0","subdenomination":null,"typeDescriptions":{"typeIdentifier":"t_stringliteral_3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0","typeString":"literal_string \"Hello World!\""},"value":"Hello World!"},"functionReturnParameters":5,"id":7,"nodeType":"Return","src":"102:21:0"}]},"documentation":null,"id":9,"implemented":true,"isConstructor":false,"isDeclaredConst":true,"modifiers":[],"name":"get","nodeType":"FunctionDefinition","parameters":{"id":2,"nodeType":"ParameterList","parameters":[],"src":"64:2:0"},"payable":false,"returnParameters":{"id":5,"nodeType":"ParameterList","parameters":[{"constant":false,"id":4,"name":"","nodeType":"VariableDeclaration","scope":9,"src":"88:6:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":3,"name":"string","nodeType":"ElementaryTypeName","src":"88:6:0","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"value":null,"visibility":"internal"}],"src":"87:8:0"},"scope":10,"src":"52:76:0","stateMutability":"pure","superFunction":null,"visibility":"public"}],"scope":11,"src":"26:104:0"}],"src":"0:130:0"},"compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"networks":{"5777":{"events":{},"links":{},"address":"0xc3635f2ce6025757882763f95b974b21c31cfb4f","transactionHash":"0x272187331a858f1e95f4a626aff54526573c66139d6ef668904bcc1e2c7b8e06"},"1535948623736":{"events":{},"links":{},"address":"0xb7d8e65677e937c96b95b94fba53b0cee438cc5f","transactionHash":"0xa62cf62e29e1567073215940210025232b26a7bf100eec9acf4320b7a53b8ed8"},"1535951355495":{"events":{},"links":{},"address":"0x144a482cdc4495df516f5bbb23ff1b4005cf41eb","transactionHash":"0x9f67034b778dc9f7ffdedac5bba8fc7498be0b8b21cbf5d1953462ca18fbf40c"},"1535952759868":{"events":{},"links":{},"address":"0x7f9935a80e9326c31046ae049f43641f75a8c456","transactionHash":"0x9f67034b778dc9f7ffdedac5bba8fc7498be0b8b21cbf5d1953462ca18fbf40c"}},"schemaVersion":"2.0.1","updatedAt":"2018-09-03T06:18:48.971Z"}

/***/ }),

/***/ "./web3/provider.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getInstance */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3__ = __webpack_require__("web3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_web3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_truffle_contract__ = __webpack_require__("truffle-contract");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_truffle_contract___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_truffle_contract__);



var provider = function provider() {
  // If the user has MetaMask:
  if (typeof web3 !== 'undefined') {
    return web3.currentProvider;
  } else {
    console.error("You need to install MetaMask for this app to work!");
  }
};

var getInstance = function getInstance(artifact) {
  var contractObj = __WEBPACK_IMPORTED_MODULE_1_truffle_contract___default()(artifact);
  contractObj.setProvider(provider());
  return contractObj.deployed();
};
var eth = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a(provider()).eth;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "truffle-contract":
/***/ (function(module, exports) {

module.exports = require("truffle-contract");

/***/ }),

/***/ "web3":
/***/ (function(module, exports) {

module.exports = require("web3");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map