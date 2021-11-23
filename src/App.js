import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import { NotFound } from 'http-errors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route path="/cart" component={Cart}/>
          <Route exact path="/" component={Home}/>
          <Route path="/not-found" component={NotFound}/>
          <Redirect path="/not-found"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
