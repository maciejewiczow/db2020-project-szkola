import React from 'react'
import Group from "react-bootstrap/FormGroup"

import * as P from './parts'

const Login: React.FC = () => {


    return (
        <P.Wrapper>
            <P.Modal>
                <P.Title>Login</P.Title>
                <Group controlId="login-form-email">
                    <P.Label>E-mail</P.Label>
                    <P.Input type="email" />
                </Group>
                <Group controlId="login-form-pass">
                    <P.Label>Hasło</P.Label>
                    <P.Input type="password" />
                </Group>
                <P.Button>Zaloguj</P.Button>
            </P.Modal>
        </P.Wrapper>
    );
};

export default Login;
