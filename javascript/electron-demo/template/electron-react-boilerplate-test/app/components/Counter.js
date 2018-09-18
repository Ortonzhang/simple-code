// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import { imgOCR, getRadio } from '../utils'
const {clipboard} = require('electron').remote
type Props = {
  history: {},
  file: {},
  preview: string
};

export default class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: '',
      mp3: '',
    }
  }
  
  componentDidMount(){
    const { file } = this.props
    this.props.file && imgOCR(this.props.file).then((message) => {
      this.setState({
        message
      })
      new Notification('成功', {
        body: '文本已经复制，赶紧去粘贴吧'
      })
      clipboard.writeText(message)
    })
  }

  test = async () => {
    const mp3 = await getRadio(this.state.message)
    this.setState({mp3})
  }

  render() {
    const { preview } = this.props
    return (
      <div className="preview-box">
        <div className="preview-body">
          <img src={preview} alt=""/>
          {
            this.state.message && <p className="message">
            { this.state.message }
            </p>
          }
        </div>
        <div className="preview-footer">
          <button type="button" className="red">
            <Link to={routes.HOME}>
              重新选择
            </Link>
          </button>
          <button className="blue" type="button" onClick={this.test}>语音播报</button>
        </div>
        <audio src={this.state.mp3} autoPlay />
    </div>
    );
  }
}
