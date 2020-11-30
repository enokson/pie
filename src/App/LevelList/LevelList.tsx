import React, { Component } from "react";
import { Link, useParams } from 'react-router-dom'

export default () => {
    const params = useParams() as { library: string };
    return (
        <div className={'cf bg-black h-100'}>
            <ul>
                <li><Link to={`/level-one-activity-list/${params.library}`}>Level 1</Link></li>
                <li><Link to='/'>Level 2 and 3</Link></li>
            </ul>
        </div>)
}