import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { 
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Preview from './components/preview'
import Upload from './components/Upload'


class MainWindow extends Component {
  constructor(props){
    super(props)
    this.setState = {

    }
  }

  render(){
    return(
      <Router>
          <Switch>
            <Route path="/" exact component={ Upload}/>
            <Route path="/preview"  component={Preview}/>
            <Redirect to="/" />
          </Switch>
      </Router>
    )
  }

}

ReactDOM.render(<MainWindow/>, document.querySelector('#app'))