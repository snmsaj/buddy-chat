import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';
import { BrowserRouter, Switch, Route, useHistory, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect, useDispatch } from 'react-redux';
import rootReducer from './reducers/userReducer';
import { setUser } from './actions/actionCreators';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Root = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
      }
    })
  }, [history, dispatch])

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}

const RootWithAuth = withRouter(connect(null, setUser)(Root));
// const RootWithAuth = withRouter(Root)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
