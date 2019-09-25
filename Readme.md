## 项目介绍

使用 hook api 方式弹出对话框，此项目解决的痛点有：

- 使用命令的方式弹出模态框，更符合习惯，且不必维护 isOpen 状态
- DialogContent 和 调用逻辑解耦，利于代码复用
- 通过 返回 Promise 对象，可以传递对话框异步关闭后的状态和结果
- api 简单易用，不用写大量的样板代码
- 支持 jsx 方式书写 DialogContent，便于传入 props 属性
- DialogContent 里面的内容也可以获取到全局 Provider 的值

## 使用方法

#### Setup

```bash
npm install --save @sogou/use-open-dialog
```

#### Dependency

@material-ui/core/Dialog，react，react-dom

#### Demo

在 [codeSandbox](https://codesandbox.io/s/github/index-swf/use-open-dialog-demo/tree/master/) 中试试看 



##### app.js

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { OpenDialogProvider } from '@sogou/use-open-dialog';

// 使用前需要把 OpenDialogProvider 放到全局
// 注意和其他Provider 的嵌套层次
// 为了使模态框中的内容也可以获取到其他 Provider 的值，建议把 OpenDialogProvider 放在尽量内层的位置
const App = ({ children }) => <OpenDialogProvider>
  {children}
</OpenDialogProvider>;

ReactDom.render(<App>{your app content}</App>, document.querySelector('#root-container'));

```

##### demo.js

```jsx
import React from "react";
import { Button } from "@material-ui/core";
import useOpenDialog from "@sogou/use-open-dialog";
import CreateOrEditUserDialog from "./CreateOrEditUserDialog";

const Demo = () => {
  const openDialog = useOpenDialog();
  const handleClick = () =>
  	// 这个函数调用返回一个 Promise 对象，确定/取消 回调对应其 resolved/rejected 状态
  	// 调用回调的传参就是 [[PromiseValue]] 的值
    openDialog(<CreateOrEditUserDialog id={123} />, {
      // 这里的 option 详见 materialUI/Dialog api https://material-ui.com/api/dialog/#props
      disableBackdropClick: true
    }).then(
      ({ username }) => {
        // 如上所述：这个 userInfo 对象来自 Dialog 组件的 onSuccessCallback 的参数
        console.log("保存成功", username);
      },
      error => {
        console.error("保存失败", error.message);
      }
    );

  return (
    <>
      <Button variant="outlined" onClick={handleClick} color="primary">
        Open Dialog
      </Button>
    </>
  );
};

export default Demo;

```

##### CreateOrEditUserDialog.js

```jsx
import React, { useContext } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { ModalContext } from "@sogou/use-open-dialog";
import Demo from "./demo";

const CreateOrEditUserDialog = ({ id }) => {
  // 成功/失败回调从 ModalContext 回调取
  const [successCallback, errorCallback] = useContext(ModalContext);
  const onSuccess = () => {
    // 支持回调传参
    successCallback({ username: "张三" });
  };
  const onCancel = () => {
    errorCallback(new Error("用户取消"));
  };

  return (
    <>
      <DialogTitle>{id ? "编辑用户信息" : "创建用户"}</DialogTitle>
      <DialogContent>
        <DialogContentText>用户信息编辑{Math.random()}</DialogContentText>
        <Demo />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSuccess} variant="outlined" color="primary">
          确定
        </Button>
        <Button onClick={onCancel} variant="outlined" color="primary" autoFocus>
          取消
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateOrEditUserDialog;

```

## API

#### useOpenDialog

`<Promise<returnedValue> Function(dialogContent: ReactNode, dialogProps?: Object)> Function()`

useOpenDialog 是一个 hook api，它遵循 [React Hooks api 规范](https://reactjs.org/docs/hooks-rules.html)，需要按规范调用。它返回一个 openDialog 函数，其定义如下：

Promise<returnedValue> Function(dialogContent: ReactNode, dialogProps?: Object)

openDialog 的返回值 是一个 Promise ，Promise[[PromiseValue]]是对话框异步关闭后的结果

dialogContent 是对话框的内容

dialogProps 是 传到 @material-ui/core/Dialog 上的 props，详见其 [API](https://material-ui.com/api/dialog/#props)

#### useConfirm

`void Function(confirmOptions: Object)> Function()`

useConfirm 是一个 hook api，它遵循 [React Hooks api 规范](https://reactjs.org/docs/hooks-rules.html)，需要按规范调用。它返回一个 confirm 函数，其定义如下：

```
void Function({
  title?: string | ReactNode,
  content?: string | reactNode,
  okText?: string | ReactNode,
  cancelText?: string | ReactNode,
  onOk?: <Promise<void> | void> Function(),
  onCancel?: <Promise<void> | void> Function(),
})
```

confirm 的 api 与 antd 的 Modal.confirm 类似，onOk 和 onCancel 支持异步过程，当传入一个返回 Promise 的函数时，pending 时按钮显示为 loading 状态，resolved 时，对话框关闭，rejected 时，取消关闭

#### OpenDialogProvider

`React.FC<Props{}>`

这是一个 Provider 组件，为 useOpenDialog 提供全局数据，用法详见demo

#### ModalContext

`React.createContext<ModalContext>[successCallback: void Function(returnedValue?: any), cancelCallback: void Function(returnedValue?: any)]`

这个一个 使用 React.createContext() 创建的上下文，用于 DialogContext 组件 获取上层的回调，用法详见 demo

## Contributors

caoyunyang 有问题或建议欢迎反馈

## 1.0.0 前 api 不稳定，使用时注意版本锁定

## Changelog

- 190925: add useConfirm
- 190924: initial commit



