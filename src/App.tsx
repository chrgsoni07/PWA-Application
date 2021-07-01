import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Items from "./component/Items";
import NavigationBar from "./component/Navbar/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from "./component/Customers";
import Bills from "./component/Bills";
import Rates from "./component/Rates";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/customers">
          <Customers />
        </Route>
        <Route path="/rates">
          <Rates />
        </Route>
        <Route path="/items">
          <Items />
        </Route>
        <Route path="/">
          <Bills />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
