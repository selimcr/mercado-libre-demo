// node_modules
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TimeMe from 'timeme.js';
import 'normalize.css';
import './styles/fonts.scss';
import './styles/global.scss';

// local components
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import ProductView from './pages/ProductView';
import SearchResult from './pages/SearchResult';
import SettingsContextProvider from './contexts/settingsContextProvider';

const IDLE_TIME = 15;

class App extends Component {

  componentDidMount() {
    TimeMe.startTimer('app', IDLE_TIME);
  };

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  };

  onUnload = () => {
    TimeMe.stopTimer('app');
  }

  render() {
    return (
      <Router>
        <SettingsContextProvider>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" exact component={SearchResult} />
              <Route path="/items/:id" exact component={ProductView} />
              <Redirect from='*' to='/' />
            </Switch>
          </Layout>
        </SettingsContextProvider>
      </Router>
    )
  }
}

export default App;
