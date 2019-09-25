"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _WrappedDialog = _interopRequireDefault(require("./WrappedDialog"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getNewId = function getNewId() {
  return new Date().valueOf() + Math.random();
};

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'add':
      return [].concat(_toConsumableArray(state), [payload]);

    case 'remove':
      return state.filter(function (item) {
        return item.key !== payload;
      });

    default:
      throw new Error("unknown action type: ".concat(type));
  }
};

var OpenDialogProvider = function OpenDialogProvider(_ref2) {
  var children = _ref2.children;

  var _useReducer = (0, _react.useReducer)(reducer, []),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      modalList = _useReducer2[0],
      dispatch = _useReducer2[1];

  var openDialog = function openDialog(component, options) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: 'add',
        payload: {
          key: getNewId(),
          component: component,
          options: options,
          resolve: resolve,
          reject: reject,
          dispatch: dispatch
        }
      });
    });
  };

  return _react["default"].createElement(_context.OpenDialogContext.Provider, {
    value: {
      openDialog: openDialog
    }
  }, children, modalList.map(function (props) {
    return _react["default"].createElement(_WrappedDialog["default"], props);
  }));
};

var _default = OpenDialogProvider;
exports["default"] = _default;