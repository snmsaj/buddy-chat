import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Groups from './Groups';

const SidePanel = (props) => {
    const {currentUser} = props

    return ( 
        <Menu size="small" inverted fixed="left" vertical className="menu">
            <UserPanel currentUser={currentUser} />
            <Groups currentUser={currentUser} />
        </Menu>
     );
}

export default SidePanel;