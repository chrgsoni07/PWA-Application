import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Items from './component/Items/Items';
import NavigationBar from './component/Navbar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Items />
    </div>
  );
}

export default App;
