"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalContext = exports.OpenDialogContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-25 10:47:49
 * @ Modified by: CaoYunyang
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 11:13:35
 * 结构如下：
 * <RootContainer>
 *   <OtherProviders>
 *     <OpenDialogProvider>
 *       // 这个 Provider 是私有的，用于给 useOpenDialog 等 hook api 提供数据
 *       <OpenDialogContext.Provider>
 *         {your app here}
 *       </OpenDialogContext.Provider>
 *
 *       <ModalContext.Provider>
 *         <Dialog>
 *           {dialog 1 content here}
 *         </Dialog>
 *       </ModalContext.Provide>
 *
 *       <ModalContext.Provider>
 *         <Dialog>
 *           {dialog 2 content here}
 *         </Dialog>
 *       </ModalContext.Provide>
 *
 *       ...
 *
 *       <ModalContext.Provider>
 *         <Dialog>
 *           {dialog n content here}
 *         </Dialog>
 *       </ModalContext.Provide>
 *     </OpenDialogProvider>
 *   </OtherProviders>
 * </RootContainer>
 */
// for private use
var OpenDialogContext = _react["default"].createContext(); // for public use


exports.OpenDialogContext = OpenDialogContext;

var ModalContext = _react["default"].createContext();

exports.ModalContext = ModalContext;