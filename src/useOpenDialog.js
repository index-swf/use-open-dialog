/**
 * @ Author: CaoYunyang
 * @ Create Time: 2019-09-25 10:49:58
 * @ Modified by: CaoYunyang
 * @ Modified time: 2019-09-25 10:53:47
 * @ Description:
 */

import { useContext } from 'react';
import { OpenDialogContext } from './context';


const useOpenDialog = () => {
  const { openDialog } = useContext(OpenDialogContext);

  return openDialog;
};

export default useOpenDialog;
