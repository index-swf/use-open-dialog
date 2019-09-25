"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _useOpenDialog = _interopRequireDefault(require("./useOpenDialog"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ConfirmBody = function ConfirmBody(_ref) {
  var title = _ref.title,
      context = _ref.context,
      onOk = _ref.onOk,
      onCancel = _ref.onCancel,
      okText = _ref.okText,
      cancelText = _ref.cancelText;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOkLoading = _useState2[0],
      setIsOkLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCancelLoading = _useState4[0],
      setIsCancelLoading = _useState4[1];

  var _useContext = (0, _react.useContext)(_context.ModalContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      successCallback = _useContext2[0],
      cancelCallback = _useContext2[1];

  var handleOkClick = function handleOkClick() {
    setIsOkLoading(true);
    Promise.resolve(onOk()).then(function () {
      setIsOkLoading(false);
      successCallback();
    }, function () {
      setIsOkLoading(false);
    });
  };

  var handleCancelClick = function handleCancelClick() {
    setIsCancelLoading(true);
    Promise.resolve(onCancel()).then(function () {
      setIsCancelLoading(false);
      cancelCallback();
    }, function () {
      setIsCancelLoading(false);
    });
  };

  return _react["default"].createElement(_react["default"].Fragment, null, title && _react["default"].createElement(_core.DialogTitle, null, title), _react["default"].createElement(_core.DialogContent, null, _react["default"].createElement(_core.DialogContentText, null, context)), _react["default"].createElement(_core.DialogActions, null, _react["default"].createElement(_core.Button, {
    onClick: handleOkClick,
    color: "primary",
    variant: "contained"
  }, okText, isOkLoading && _react["default"].createElement(_core.CircularProgress, null)), _react["default"].createElement(_core.Button, {
    onClick: handleCancelClick,
    color: "primary",
    variant: "outlined",
    autoFocus: true
  }, cancelText, isCancelLoading && _react["default"].createElement(_core.CircularProgress, null))));
};

ConfirmBody.defaultProps = {
  onOk: function onOk() {},
  onCancel: function onCancel() {},
  okText: '确 定',
  cancelText: '取 消'
};

var useConfirm = function useConfirm() {
  var openDialog = (0, _useOpenDialog["default"])();
  var confirm = (0, _react.useCallback)(function (confirmProps) {
    return openDialog(_react["default"].createElement(ConfirmBody, confirmProps))["catch"](function () {});
  }, [openDialog]);
  return confirm;
};

var _default = useConfirm;
exports["default"] = _default;