import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
export default class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {

    }

    this.drag = this.drag.bind(this)
  }


  drag(files){
    let file = files[0]
    this.props.history.push({ pathname: '/preview', file, preview: file.preview })
  }


  render(){
    return(
      <div className="upload box" >
        <Dropzone  onDrop={this.drag} style={{width: '100%', height:'100%', border:'0'}}>
          <i className="iconfont">&#xe71a;</i>
          <p>拖拽文件或者点击上传</p>
        </Dropzone>
      </div>
    )
  }
}