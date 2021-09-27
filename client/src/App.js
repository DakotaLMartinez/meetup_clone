import './App.css';
import GroupsContainer from './components/GroupsContainer'
import EventsContainer from './components/EventsContainer'
import { Switch, Route, NavLink, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <NavLink to="/groups">Groups</NavLink>{" - "}
        <NavLink to="/events">Events</NavLink>
        <Switch>
          <Route path="/groups">
            <GroupsContainer />
          </Route>
          <Route path="/events">
            <EventsContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
