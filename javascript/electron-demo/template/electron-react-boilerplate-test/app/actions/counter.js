// @flow
import { push } from 'react-router-redux'
import type { Dispatch } from '../reducers/types';
export const CREATE_FILE = 'CREATE_FILE';
export const CREATE_PREVIEW = 'CREATE_PREVIEW';


// 保存file对象
export function crearefile(file){
  return {
    type: CREATE_FILE,
    payload: {
      file
    }
  }
}

// 保存file对象的blob url格式
export function createimg(preview){
  return {
    type: CREATE_PREVIEW,
    payload: {
      preview
    }
  }  
}

export function previewLocation(preview) {
  return (dispatch: Dispatch) => {
    dispatch(createimg(preview));
    dispatch(push('/preview'))
  };
}
