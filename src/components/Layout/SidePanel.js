import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';

const SidePanel = (props) => {
    const {currentUser} = props

    return ( 
        <Menu size="small" inverted fixed="left" vertical className="menu">
            <UserPanel currentUser={currentUser} />
        </Menu>
     );
}

export default SidePanel;