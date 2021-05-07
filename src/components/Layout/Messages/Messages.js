import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import firebase from '../../../firebase';

const Messages = (props) => {
    const [group] = useState(props.currentGroup)
    const [user] = useState(props.currentUser)
    const [messages, setMessages] = useState([])
    const [messagesLoading, setMessagesLoading] = useState(true)
    const messagesRef = firebase.database().ref('messages')
    // const [messagesRef] = useState(firebase.database().ref('messages'))


    const addMessageListener = useCallback((groupId) => {
        let loadedMessages = [];
        messagesRef.child(groupId).on("child_added", snap => {
          loadedMessages.push(snap.val());
          console.log(loadedMessages)
          setMessages(loadedMessages)
          setMessagesLoading(false)
        })
    }, [])

    // const addListeners = useCallback((groupId) => {
    //     addMessageListener(groupId)
    // }, [addMessageListener])

    useEffect(() => {
        if(group && user) {
            addMessageListener(group.id)
        }
    },[])


    
    const displayMessages = (messages) => {
        messages.length > 0 && messages.map((message) => (
            <Message key={message.timestamp} message={message} user={user} />
        ))
        console.log(messages)
    }

    // const displayMessages = (messages) => {
    //     messages.length > 0 && messages.map((message) => {
    //         return(
    //             <Message key={message.timestamp} message={message} user={user} />
    //         )
    //     })
    // }



    return ( 
        <Fragment>
            <MessagesHeader />

            <Segment>
                <Comment.Group className="messages">
                    {displayMessages(messages)}
                </Comment.Group>
            </Segment>

            <MessageForm messagesRef={messagesRef} currentGroup={group} currentUser={user}/>
        </Fragment>
     );
}

export default Messages;