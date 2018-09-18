// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone'
type Props = {
  history: {}
};

export default class Home extends Component<Props> {
  props: Props;

  drag = (files) => {
    const { crearefile, previewLocation } = this.props
    const file = files[0]
    crearefile(file)
    previewLocation(file.preview)
  }

  render() {
    return (
      <div className="upload box" >
        <Dropzone  onDrop={this.drag} style={{width: '100%', height:'100%', border:'0'}}>
          <i className="iconfont">&#xe71a;</i>
          <p>拖拽文件或者点击上传</p>
        </Dropzone>
      </div>
    );
  }
}
