import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react';
import firebase from '../../../firebase';
import { useState } from 'react';

const UserPanel = (props) => {
    const [user] = useState(props.currentUser)

    const dropdownOptions = () => [
        {
            key: "signout",
            text: <span onClick={handleSignout}>Sign Out</span>,
        }
    ]

    const handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("Signed Out"))
    }


    return (

        <Grid className="user-panel" >
            <Grid.Column className="user-panel-column">
                <Grid.Row className="user-panel-row">
                    {/* App Header */}
                    <Header inverted floated="left" as="h3">
                        <Icon name="users" size="small" />
                        <Header.Content>Buddy Chat</Header.Content>
                    </Header>

                    {/* User Dropdown */}
                    <Header className="dropdown-header" as="h4" inverted>
                        <Dropdown
                            trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>}
                            options={dropdownOptions()} />
                    </Header>
                </Grid.Row>

            </Grid.Column>
        </Grid >
    );
}

export default UserPanel;