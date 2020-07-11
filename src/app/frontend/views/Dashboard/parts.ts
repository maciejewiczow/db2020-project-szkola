import styled from 'styled-components'

import background from '../../assets/loginBack.jpg'

export const Wrapper = styled.div`
    display: flex;
    height: 100%;
    color: white;
    background: url('https://scx2.b-cdn.net/gfx/news/hires/2018/milkyway.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
`

export const BackdropWrapper = styled.div`
    width: 100%;
    background: rgba(9.8%, 10.1%, 13%, 0.8);
    backdrop-filter: saturate(60%) blur(6px);
`

export const Sidebar = styled(BackdropWrapper)`
    width: 450px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    padding: 10px;
`

export const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    height: 100%;
    background: rgba(15.7%, 17.3%, 20.4%, 1);

    padding: 40px;

    border-top-left-radius: 48px;
    border-bottom-left-radius: 48px;
`

export const LogoutLink = styled.div`
    justify-self: flex-end;
    display: block;
`
