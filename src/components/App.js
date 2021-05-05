import './App.css';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './Layout/ColorPanel';
import SidePanel from './Layout/SidePanel';
import Messages from './Layout/Messages';
import MetaPanel from './Layout/MetaPanel';

const App = ({currentUser}) => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />
      <SidePanel currentUser={currentUser} />

      <Grid.Column style={{marginLeft:320}}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStatetoProps = (state) => {
  return {
      currentUser: state.user.currentUser
  }
}

export default connect(mapStatetoProps)(App);
