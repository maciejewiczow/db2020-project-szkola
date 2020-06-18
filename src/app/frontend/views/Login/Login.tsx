import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Group from "react-bootstrap/FormGroup"
import { connect, MapDispatchToProps } from "react-redux";

import { updateCurrentUser } from "../../store/User/actions";

import * as P from './parts'
import { CurrentUserState } from 'frontend/store/User/store';
import { InteropService } from '../../../common/services';

interface LoginViewActionProps {
    updateCurrenUser: (user: Partial<CurrentUserState>) => void
}

const LoginView: React.FC<LoginViewActionProps> = ({ updateCurrenUser }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const history = useHistory();

    const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError("")
        try {
            const user = await InteropService.verifyCredentials(email, password);

            updateCurrentUser(user)
            history.push('/dashboard')
        } catch(e) {
            setError("Niepoprawne dane logowania")
        }
    }, [password, email])

    return (
        <P.Wrapper>
            <P.ModalForm onSubmit={onSubmit} >
                <P.Title>Login</P.Title>
                <Group controlId="login-form-email">
                    <P.Label>E-mail</P.Label>
                    <P.Input
                        hasError={error.length !== 0}
                        type="email"
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                </Group>
                <Group controlId="login-form-pass">
                    <P.Label>Hasło</P.Label>
                    <P.Input
                        hasError={error.length !== 0}
                        type="password"
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <P.ErrorLabel>{error}</P.ErrorLabel>
                </Group>
                <P.Button type="submit">Zaloguj</P.Button>
            </P.ModalForm>
        </P.Wrapper>
    );
};

const mapDispatchToProps: MapDispatchToProps<LoginViewActionProps, {}> = (dispatch) => ({
    updateCurrenUser: user => {
        dispatch(updateCurrentUser(user));
    }
})

export default connect(null, mapDispatchToProps)(LoginView);
