import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Alert, Container, Button, FormGroup, Form, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/profileSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await Auth.signUp(email, password);
            dispatch(signIn(user));
        } catch (error) {
            setHasError(true);
        }
    };

    return (
        <Container className="mt-5 text-center">
            <h1>Sign up for your Account</h1>
            {hasError && <Alert color="danger">Invalid email or password</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" color="primary">
                    Sign In
                </Button>
            </Form>
        </Container>

    );
};

export default SignIn;