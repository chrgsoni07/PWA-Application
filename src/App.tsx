import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Items from './component/Items';
import NavigationBar from './component/Navbar/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Customers from './component/Customers';
import Bills from './component/Bills';
import Rates from './component/Rates';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/customers">
          <Customers />
        </Route>
        <Route path="/bills">
          <Bills />
        </Route>
        <Route path="/rates">
          <Rates />
        </Route>
        <Route path="/">
          <Items />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
