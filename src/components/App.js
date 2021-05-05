import './App.css';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './Layout/ColorPanel';
import SidePanel from './Layout/SidePanel';
import Messages from './Layout/Messages';
import MetaPanel from './Layout/MetaPanel';

const App = () => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />
      <SidePanel />

      <Grid.Column style={{marginLeft:320}}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

export default App;
