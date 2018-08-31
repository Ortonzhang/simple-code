import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Style from './index.scss'
import TextField from '@material-ui/core/TextField'
import { fileToBlob } from '../../utils'
export default class Paste extends Component{
  constructor(props){
    super(props)
    this.state = {
      src: '',
      open: false
    }
  }

  paste = async (e) => {
    e.preventDefault()
    let file = e.clipboardData.files[0]
    
    if(file){
      let src = await fileToBlob(file)
      this.setState({ src })
    } else {
      this.setState({open: true})
    }
  }

  handleClose = () =>{
    this.setState({open: false})
  }

  render(){
    return(
      <div className={Style['box']}>
        <TextField
          id="search"
          label="来来来,粘贴图片来这里"
          margin="normal"
          multiline
          onPaste={this.paste}
        />
        <div className={Style['img-box']}>
          <img src={this.state.src} alt=""/>
        </div>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          message="只能粘贴图片哦"
          autoHideDuration={1000}
          anchorOrigin={{vertical:'top', horizontal: 'center'}}
        />
      </div>
    )
  }
}