/* eslint-disable react/prop-types */
/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-25 11:16:02
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 13:48:49
 * @ Description:
 */

import React, { useCallback, useContext, useState } from 'react';
import {
  DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button, CircularProgress,
} from '@material-ui/core';
import useOpenDialog from './useOpenDialog';
import { ModalContext } from './context';


const ConfirmBody = ({
  title,
  context,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => {
  const [isOkLoading, setIsOkLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [successCallback, cancelCallback] = useContext(ModalContext);
  const handleOkClick = () => {
    setIsOkLoading(true);
    Promise.resolve(onOk())
      .then(() => {
        setIsOkLoading(false);
        successCallback();
      }, () => {
        setIsOkLoading(false);
      });
  };
  const handleCancelClick = () => {
    setIsCancelLoading(true);
    Promise.resolve(onCancel())
      .then(() => {
        setIsCancelLoading(false);
        cancelCallback();
      }, () => {
        setIsCancelLoading(false);
      });
  };
  return <>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>
      <DialogContentText>
        {context}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleOkClick} color="primary" variant="contained">
        {okText}
        {isOkLoading && <CircularProgress />}
      </Button>
      <Button onClick={handleCancelClick} color="primary" variant="outlined" autoFocus>
        {cancelText}
        {isCancelLoading && <CircularProgress />}
      </Button>
    </DialogActions>
  </>;
};

ConfirmBody.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
  okText: '确 定',
  cancelText: '取 消',
};

const useConfirm = () => {
  const openDialog = useOpenDialog();
  const confirm = useCallback((confirmProps) => {
    openDialog(<ConfirmBody {...confirmProps} />)
      .catch(() => {});
  }, [openDialog]);

  return confirm;
};

export default useConfirm;
