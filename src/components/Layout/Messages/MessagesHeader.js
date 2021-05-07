import { Header, Segment, Icon } from 'semantic-ui-react';

const MessagesHeader = () => {
    return ( 
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                <span>
                Group
                <Icon name={"star outline"} color="black" />
                </span>
                <Header.Subheader>2 Users</Header.Subheader>
            </Header>
        </Segment>
     );
}

export default MessagesHeader;