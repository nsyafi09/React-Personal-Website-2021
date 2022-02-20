// Summer Project
// Muhammad Syafi Nurhakim

import Nav from './Nav';
import Home from './Home';
import Stories from './Stories';
import NewPost from './NewPost';
import About from './About';
import Container from './Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';


const App = () => {
  return (
   <Router>
    <Nav/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/Container" exact>
          <Container/>
        </Route>
        <Route path="/Stories" exact>
          <Stories/>
        </Route>
        <Route path="/NewPost" exact>
          <NewPost/>
        </Route>
        <Route path="/About" exact>
          <About/>
        </Route>
      </Switch>
   </Router>
  );
}

export default App;