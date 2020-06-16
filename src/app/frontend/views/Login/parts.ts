import styled from 'styled-components'
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

export const Modal = styled(Form)`
    background: rgba(4%, 6.3%, 9.7%, 0.8);
    box-shadow: 0 10px 12px 3px rgba(0,0,0,0.6);

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
`

export const Title = styled.span`
    font-size: 24px;
`

export const Label = styled(Form.Label)`
    font-weight: 100;
    color: #6c757d;
`

export const Input = styled(Form.Control)`
    background: transparent;

    border-width: 0;
    border-bottom: 2px solid rgba(255,255,255,0.3);
    border-radius: 0;
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
    background: rgb(18.5%, 29%, 41%);
    border-width: 0;

    &:focus, &:hover {
        background: rgb(13.2%, 36.5%, 63%);
    }
`
