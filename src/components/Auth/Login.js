import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import firebase from '../../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid(email, password)) {
            setError('')
            setIsLoading(true)

            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(signedInUser => {
                console.log(signedInUser)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err);
                setError(`${err}`)
                setIsLoading(false)
            })
            
        }else {
            return setError('Invalid Password')
        }
    }

    const isFormValid = (email, password) => email && password;


    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column className="register-column">
                <Header as="h2" textAlign="center">
                    Sign In
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>

                        <Form.Input name="email" icon="mail" iconPosition="left" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />

                        <Form.Input name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />

                        <Button disabled={isLoading} className={isLoading ? 'loading' : ''} color="blue" fluid size="large">Login</Button>
                    </Segment>
                </Form>
                {error.length > 0 && <Message error>{error}</Message>}
                <Message>Don't have an account? <NavLink to="/register">Sign Up</NavLink> </Message>

            </Grid.Column>
        </Grid>
    );
}

export default Login;