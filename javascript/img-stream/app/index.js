import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { 
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()
import Drop from './components/Drop'
import Paset  from './components/Paset'
import Menus from './components/Menu'

class App extends Component{
  render(){
    return(
      <Router>
          <div style={Style['box']}>
            <Menus css={Style['menu']} history={history}/>
            <Switch>
              <Route path="/" exact component={ Drop }/>
              <Route path="/paset"  component={Paset}/>
            </Switch>
          </div>
      </Router>
    )
  }
}


const Style = {
  box: {
    width: '100%',
    display: 'flex',
    ppsition: 'relative'
  },
  menu: {
    backgroundColor: 'lightblue',
    position: 'absolute',
    left: '50px',
    top: '30px',
    borderRadius: '50%'
  }

}


ReactDOM.render(<App/>, document.querySelector('#root'))