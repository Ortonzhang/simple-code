import React, {Component} from 'react'
import style from './index.scss'
import { dataURLtoBlob } from '../../utils'
export default class Drop extends Component {
  constructor(props){
    super(props)
    this.state = {
      src: '',
    }
  }

  click = () => {
    if(!this.state.src){
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = (event) => {
        let file = event.target.files[0]


        // let blob = URL.createObjectURL(file)
        // console.log(blob)

        // this.setState({ src: blob })
        let render = new FileReader()
        render.readAsDataURL(file)

        render.onload = () => {
          // console.log(render.result)
          let data = dataURLtoBlob(render.result)
          console.log(data)
          this.setState({src: render.result})
        }
      }
      input.click()
    }
  }

 

  remove = () => {
    this.setState({src: ''})
  }

  preventDefault = (event) => {
    event.preventDefault()
  }

  dorp = (event) => {
    event.preventDefault()
    let files =  event.dataTransfer.files
    let blob = URL.createObjectURL(files[0])
    this.setState({
      src: blob
    })
    
    
  }

  render(){
    
    return(
      <div onClick={this.click}  className={style['box']} onDrop={this.dorp} onDragOver={this.preventDefault} >
        {
          this.state.src ? 
          <div className={style['img-box']}>
            <img src={this.state.src} alt=""/>
            <div className={style['mask']}>
              <i className={style['icon']} onClick={this.remove}>&#xe609;</i>
            </div>
          </div>
          :
          'hello parcel'
        }
        
      </div>
    )
  }
}