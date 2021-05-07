import './App.css';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import SidePanel from './Layout/SidePanel/SidePanel';
import Messages from './Layout/Messages/Messages';

const App = ({ currentUser, currentGroup }) => {
  return (
    <Grid className="app">
      <Grid.Column width="4">
        <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
      </Grid.Column>
      <Grid.Column width="12">
        <Messages key={currentGroup && currentGroup.id} currentGroup={currentGroup} currentUser={currentUser}/>
      </Grid.Column>
    </Grid>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    currentGroup: state.group.currentGroup
  }
}

export default connect(mapStatetoProps)(App);
