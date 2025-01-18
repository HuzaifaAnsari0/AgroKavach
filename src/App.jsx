import {BrpwserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

function App() {
 
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
