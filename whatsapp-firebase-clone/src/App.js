import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user ? <Login /> : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId" component={Chat} />
              <Route path="/" component={Chat} />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
