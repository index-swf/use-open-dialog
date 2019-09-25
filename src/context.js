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

import React from 'react';


// for private use
export const OpenDialogContext = React.createContext();

// for public use
export const ModalContext = React.createContext();
