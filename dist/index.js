"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OpenModalProvider = exports.ModalContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var OpenModalContext = _react["default"].createContext();

var ModalContext = _react["default"].createContext();

exports.ModalContext = ModalContext;

var useOpenModal = function useOpenModal() {
  var _useContext = (0, _react.useContext)(OpenModalContext),
      openModal = _useContext.openModal;

  return openModal;
};

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

var DialogWithProvider = _react["default"].memo(function (_ref2) {
  var key = _ref2.key,
      options = _ref2.options,
      component = _ref2.component,
      resolve = _ref2.resolve,
      reject = _ref2.reject,
      dispatch = _ref2.dispatch;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var handleClose = function handleClose() {
    setIsOpen(false);
    reject(new Error('user cancelled'));
  };

  var handleExited = function handleExited() {
    dispatch({
      type: 'remove',
      payload: key
    });
  };

  var successCallback = function successCallback(value) {
    resolve(value);
    setIsOpen(false);
  };

  var cancelCallback = function cancelCallback(value) {
    reject(value);
    setIsOpen(false);
  };

  return _react["default"].createElement(ModalContext.Provider, {
    value: [successCallback, cancelCallback]
  }, _react["default"].createElement(_core.Dialog, _extends({}, options, {
    open: isOpen,
    onClose: handleClose,
    onExited: handleExited
  }), component));
});

var OpenModalProvider = function OpenModalProvider(_ref3) {
  var children = _ref3.children;

  var _useReducer = (0, _react.useReducer)(reducer, []),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      modalList = _useReducer2[0],
      dispatch = _useReducer2[1];

  var openModal = function openModal(component, options) {
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

  return _react["default"].createElement(OpenModalContext.Provider, {
    value: {
      openModal: openModal
    }
  }, children, modalList.map(function (props) {
    return _react["default"].createElement(DialogWithProvider, props);
  }));
};

exports.OpenModalProvider = OpenModalProvider;
var _default = useOpenModal;
exports["default"] = _default;