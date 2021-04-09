import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/component/Header/Header';
import Items from '../src/component/Items/Items';
import NavigationBar from './component/Navbar/NavigationBar';

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <Items />      
     
    </div>
  );
}

export default App;
