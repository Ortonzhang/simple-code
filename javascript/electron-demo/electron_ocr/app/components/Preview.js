import React, { Component } from 'react'
import { Button } from '@material-ui/core';
const {clipboard} = require('electron').remote
import { Link } from 'react-router-dom'
import { imgOCR, getRadio } from '../util'
export default class Preview extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: this.props.location.file,
      preview: this.props.location.preview || 'blob:file:///74de1cb9-06f4-41cd-a9c7-24a45ea2c77b',
      message: '',
    }

    this.click = this.click.bind(this)
  }
  
  click(){
    this.props.history.push({pathname: '/'})
  }

  async test(){
    let mp3 = await getRadio(this.state.message)
    this.setState({mp3})
  }

  componentDidMount(){
    this.state.file && imgOCR(this.state.file).then(message => {
      this.setState({
        message
      })
      new Notification('成功', {
        body: '文本已经复制，赶紧去粘贴吧'
      })
      clipboard.writeText(message)
    })
  }

  render(){

    return(
     <div className="preview-box">
      <div className="preview-body">
        <img src={this.state.preview} alt=""/>
        {
          this.state.message && <p className="message">
          { this.state.message }
          </p>
        }
      </div>
      <div className="preview-footer">
        <Button 
          variant="contained"
          color="secondary" 
          component={Link} to="/"
          >
          重新选择
        </Button>
        <Button color="primary" variant="contained" onClick={this.test.bind(this)}>语音播报</Button>
      </div>
      <audio src={this.state.mp3} autoPlay></audio>
     </div>
    )
  }
}