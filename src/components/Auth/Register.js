import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import firebase from '../../firebase';
import md5 from 'md5';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const usersRef = firebase.database().ref('users')

    const isPasswordValid = () => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        }else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isPasswordValid()) {
            setError('')
            setIsLoading(true)

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    console.log(createdUser)
                    setError('')
                    setIsLoading(false)
                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(() => {
                        // setIsLoading(false)
                        saveUser(createdUser).then(() => {
                            console.log('user saved')
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        setError(`${err}`)
                        setIsLoading(false)
                    })
                })
                .catch(err => {
                    console.error(err)
                    setError(`${err}`)
                    setIsLoading(false)
                })
        }else {
            return setError('Invalid Password')
        }
    }

    const saveUser = (createdUser) => {
        return usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column className="register-column">
                <Header as="h2" textAlign="center">
                    Sign Up
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>

                        <Form.Input name="username" icon="user" iconPosition="left" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} type="text" required />

                        <Form.Input name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />

                        <Form.Input name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />

                        <Form.Input name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} type="password" required />

                        <Button disabled={isLoading} className={isLoading ? 'loading' : ''} color="blue" fluid size="large">Register</Button>
                    </Segment>
                </Form>
                {error.length > 0 && <Message error>{error}</Message>}
                <Message>Already a user? <NavLink to="/login">Login</NavLink> </Message>

            </Grid.Column>
        </Grid>
    );
}

export default Register;