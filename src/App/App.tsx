import React from 'react';
import ReactDOM from 'react-dom'
import {MemoryRouter as Router, Route, Switch} from 'react-router'
import { hot } from 'react-hot-loader';
import Home from './Home/Home'
import LevelList from "./LevelList/LevelList";
import Level1ActivityList from './LevelOne/ActivityList/ActivityList'
import Level1Activity from './LevelOne/Activity/Activity'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route path={'/level-list/:library'} component={LevelList}/>
                <Route path={'/level-one-activity-list/:library'} component={Level1ActivityList}/>
                <Route path={'/level-one-activity/:library/:activity/:index'} component={Level1Activity}/>
            </Switch>
        </Router>
    )
}

export default hot(module)(App);