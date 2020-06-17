import React from 'react'
import Group from "react-bootstrap/FormGroup"
import { connect, MapDispatchToProps } from "react-redux";

import { updateCurrentUser } from "../../store/User/actions";

import * as P from './parts'
import { CurrentUserState } from 'frontend/store/User/store';

interface LoginViewActionProps {
    updateCurrenUser: (user: Partial<CurrentUserState>) => void
}

const LoginView: React.FC<LoginViewActionProps> = () => {

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

const mapDispatchToProps: MapDispatchToProps<LoginViewActionProps, {}> = (dispatch) => ({
    updateCurrenUser: user => {
        dispatch(updateCurrentUser(user));
    }
})

export default connect(null, mapDispatchToProps)(LoginView);
