import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';
import { BrowserRouter, Switch, Route, useHistory, withRouter } from 'react-router-dom';

const Root = () => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/");
      }
    })
  }, [history])

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>,
  document.getElementById('root')
);
