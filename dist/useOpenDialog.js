"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _context = require("./context");

/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-25 10:49:58
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 10:53:47
 * @ Description:
 */
var useOpenDialog = function useOpenDialog() {
  var _useContext = (0, _react.useContext)(_context.OpenDialogContext),
      openDialog = _useContext.openDialog;

  return openDialog;
};

var _default = useOpenDialog;
exports["default"] = _default;