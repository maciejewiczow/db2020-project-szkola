import React from 'react'
import styled, { css } from 'styled-components'
import Form from "react-bootstrap/Form"
import BsButton from "react-bootstrap/Button"

import background from '../../assets/loginBack.jpg'

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: url('${background}') no-repeat;
    background-size: cover;
    background-position: center center;
`

export const ModalForm = styled(Form)`
    background: rgba(4%, 6.3%, 9.7%, 0.8);
    box-shadow: 0 10px 12px 1px rgba(0,0,0,0.6);

    backdrop-filter: saturate(70%) blur(8px);

    border-radius: 2px;

    min-width: 370px;

    display: flex;
    flex-flow: column nowrap;
    color: white;
    padding: 32px 32px;

    justify-content: space-between;

    & > * {
        margin-bottom: 38px;
    }

    & > :last-child {
        margin-bottom: 0;
    }

    @media(max-width: 370px) {
        width: 100%;
        height: 100%;
    }
`

export const Title = styled.span`
    font-size: 24px;
`

export const Label = styled(Form.Label)`
    font-weight: 100;
    color: #6c757d;
`

interface InputProps {
    hasError: boolean
}

// spread operator trick to avoid prop passing error
export const Input = styled(({ hasError, ...rest }) => <Form.Control {...rest} />)<InputProps>`
    background: transparent;
    transition: background 0.15s ease-in-out;

    border-width: 0;
    border-bottom: 2px solid rgba(255,255,255,0.3);
    border-radius: 0;

    ${({hasError}) => hasError && css`
        border-color: rgba(86.3%, 20.8%, 27.1%, 0.7);
    `}

    padding: 1px 2px;
    height: auto;

    font-weight: 200;

    color: white;

    &:focus {
        background: rgba(255,255,255,0.1);
        border-bottom-color: rgba(255,255,255,0.5);
        color: white;
    }
`

export const Button = styled(BsButton)`
    border-radius: 2px;
    background: #2F4A69;
    border-width: 0;

    &:focus, &:hover {
        background: #225DA1;
    }
`

export const ErrorLabel = styled.span`
    margin-top: 2px;
    color: #dc3545;
    display: inline-block;
`
