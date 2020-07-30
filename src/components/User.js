import React, { useState, useEffect } from 'react'
import { useDatas } from '../context/DataContext'
import userRoundedSvg from '../svg/userrounded.svg'
import sidebarToggleSvg from '../svg/sidebartogglebtn.svg'
import { useQuery } from '@apollo/client'
import {addAllCategoriesQuery} from '../query/query'
import '../css/usermain.css'
import {
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"
import Shedule from './Shedule'


export default function User({match}) {
    const [sidebar, setSidebar] = useState(false)
    const { data: {datas: { username, login: isLoggedIn }}, addAllCategories } = useDatas()
    const { loading, error, data } = useQuery(addAllCategoriesQuery)
    useEffect(() => {
        if(!loading) {
            addAllCategories(data.categories)
        }
    }, [data])
    const toggleSidebar = () => {
        setSidebar((sidebar)=> !sidebar)
    }
    if(!isLoggedIn) return <Redirect to="/login"/>
    return (
        <div id="user-component">
            {sidebar && <div className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to={`${match.url}/shedule`}><span>Shedule appointment</span></Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/pendings`}><span>Pending appointments</span></Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/rejected`}><span>Rejected appointments</span></Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/appointments`}><span>My appointments</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>}
            <div className={'main-section'}>
                <header>
                    <div className="inner">
                        <div className="sidebar-toggle-button"><img src={sidebarToggleSvg} onClick={toggleSidebar} alt={'IMG'}/></div>
                        <div className="logo">Appointment Scheduler App</div>
                    </div>
                    <div className="inner">
                        <div className="username"><div>Welcome</div> <div>{username}</div></div>
                        <div className="userimage"><img src={userRoundedSvg} alt={'IMG'}/></div>
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route
                            path={`${match.path}/shedule`}
                            component={Shedule}
                        />
                        <Route
                            path={`${match.path}/pendings`}
                            render={()=><h1>Welecome to  pendings page</h1>}
                        />
                        <Route
                            path={`${match.path}/rejected`}
                            render={()=><h1>Welecome to  rejected page</h1>}
                        />
                        <Route
                            path={`${match.path}/appointments`}
                            render={()=><h1>Welecome to  appointments page</h1>}
                        />
                    </Switch>
                </main>
            </div>
        </div>
    )
}
