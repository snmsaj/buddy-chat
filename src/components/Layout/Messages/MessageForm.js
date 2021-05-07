import { useState } from 'react';
import firebase from '../../../firebase';
import { Segment, Button, Input } from 'semantic-ui-react';

const MessageForm = (props) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [group] = useState(props.currentGroup)
    const [user] = useState(props.currentUser)

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const createMessage = () => {
        const userMessage = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            },
            content: message
        }
        return userMessage
    }

    const sendMessage = () => {
        const {messagesRef} = props

        if (message) {
            setLoading(true)
            messagesRef
                .child(group.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setLoading(false)
                    setMessage('')
                    setErrors([])
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                    setErrors(errors.concat(err))
                })
        } else {
            setErrors(errors.concat({message:'Add a message'}))
        }
    }



    return (
        <Segment className="message-form">
            <Input
                fluid
                onChange={handleChange}
                name="message"
                value={message}
                style={{ marginBottom: "0.7em" }}
                label={<Button 
                    icon={"paper plane"} 
                    color="teal" 
                    disabled={loading}
                    onClick={sendMessage} />}
                labelPosition="right"
                className={errors.some(error => error.message.includes('message')) ? 'error' : ''}
                placeholder="Message your buddies"
            />
            {/* <Button animated='vertical' color="teal">
                <Button.Content hidden>Reply</Button.Content>
                <Button.Content visible>
                    <Icon name='paper plane' />
                </Button.Content>
            </Button> */}
        </Segment>
    );
}

export default MessageForm;