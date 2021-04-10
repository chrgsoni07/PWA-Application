import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Items from './component/Items/Items';
import NavigationBar from './component/Navbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Customers from './component/Customers';
import Bills from './component/Bills';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/bills">
            <Bills />
          </Route>
          <Route path="/">
            <Items />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
