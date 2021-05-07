import { Header, Segment } from 'semantic-ui-react';

const MessagesHeader = () => {
    return ( 
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                <span>
                Group
                
                </span>
                {/* <Header.Subheader>2 Users</Header.Subheader> */}
            </Header>
        </Segment>
     );
}

export default MessagesHeader;