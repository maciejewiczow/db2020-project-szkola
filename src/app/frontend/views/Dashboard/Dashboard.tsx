import React, { useState, useEffect } from 'react'
import { connect, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";

import * as P from './parts'
import { CurrentUserState } from 'frontend/store/User/store';
import { AppState } from 'frontend/store';
import { InteropService } from 'common/services';

type DashboardStateProps = CurrentUserState;

const Dashboard: React.FC<DashboardStateProps> = ({UserID, Name, Surname}) => {
    return (
        <P.Wrapper>
            <P.Sidebar>
                Witaj,
                <h2>{Name} {Surname}</h2>
                <P.LogoutLink>
                    <Link to="./">Wyloguj</Link>
                </P.LogoutLink>
            </P.Sidebar>
            <P.BackdropWrapper>
                <P.Content>
                    Oceny czy coś
                </P.Content>
            </P.BackdropWrapper>
        </P.Wrapper>
    )
}

const mapStateToProps: MapStateToProps<DashboardStateProps, {}, AppState> = (state) => ({
    ...state.currentUser
})

export default connect(mapStateToProps)(Dashboard);
