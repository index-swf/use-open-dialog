/* eslint-disable react/prop-types */
/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-24 20:46:24
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 10:38:52
 * @ Description:
 */

import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { ModalContext } from './context';


const WrappedDialog = React.memo(
  ({
    key, options, component, resolve, reject, dispatch,
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
      setIsOpen(false);
      reject(new Error('user cancelled'));
    };
    const handleExited = () => {
      dispatch({ type: 'remove', payload: key });
    };
    const successCallback = value => {
      resolve(value);
      setIsOpen(false);
    };
    const cancelCallback = value => {
      reject(value);
      setIsOpen(false);
    };

    return (
      <ModalContext.Provider value={[successCallback, cancelCallback]}>
        <Dialog
          {...options}
          open={isOpen}
          onClose={handleClose}
          onExited={handleExited}
        >
          {component}
        </Dialog>
      </ModalContext.Provider>
    );
  },
);

export default WrappedDialog;
