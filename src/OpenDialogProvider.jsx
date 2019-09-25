/* eslint-disable react/prop-types */
/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-24 20:46:24
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 10:38:52
 * @ Description:
 */

import React, { useReducer } from 'react';
import WrappedDialog from './WrappedDialog';
import { OpenDialogContext } from './context';


const getNewId = () => new Date().valueOf() + Math.random();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'add':
      return [...state, payload];
    case 'remove':
      return state.filter(item => item.key !== payload);
    default:
      throw new Error(`unknown action type: ${type}`);
  }
};

const OpenDialogProvider = ({ children }) => {
  const [modalList, dispatch] = useReducer(reducer, []);
  const openDialog = (component, options) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'add',
        payload: {
          key: getNewId(),
          component,
          options,
          resolve,
          reject,
          dispatch,
        },
      });
    });
  };

  return (
    <OpenDialogContext.Provider value={{ openDialog }}>
      {children}
      {modalList.map(props => (
        <WrappedDialog {...props} />
      ))}
    </OpenDialogContext.Provider>
  );
};

export default OpenDialogProvider;
