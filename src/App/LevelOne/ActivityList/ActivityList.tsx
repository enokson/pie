import React from "react";
import {Link, Redirect, useParams} from 'react-router-dom'
import fs from 'fs'
import * as pathBuilder from '../../pathBuilder'

interface State {
    levelPath: string,
    activityList: string[],
    redirect: {
        activity: string | null,
        index: number | null
    }
}

export default class extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        // const params = useParams() as { libraryPath: string };
        this.state = {
            levelPath: '',
            activityList: [],
            redirect: {
                activity: null,
                index: null
            }
        }
    }
    componentDidMount() {
        // const libraryPath = atob(this.props.match.params.libraryPath);
        // const levelPath = path.join(libraryPath, 'Level 1');
        const libPath = pathBuilder.getLibraryPath(pathBuilder.getAppPath())(this.props.match.params.library)
        const levelPath = pathBuilder.getLevel1Path(libPath)
        fs.promises.readdir(levelPath).then(activityList => {
            this.setState({
                levelPath,
                activityList
            })
        }).catch(error => {
            console.error(error)
        })
    }
    render() {
        const library = this.props.match.params.library
        const listItems = this.state.activityList.map((item: string, index: number) => {
            return <li key={index} className={'h3 pa2'}>
                <Link to={`/level-one-activity/${library}/${item}/${index}`}><h3>{item}</h3></Link>
            </li>
        })
        if (this.state.redirect.activity && this.state.redirect.index) {
            const { activity, index } = this.state.redirect
            return <Redirect to={`/level-one-activity/${library}/${activity}/${index}`} />
        } else {
            return (
                <div className={'cf h-100 bg-black'}>
                    <div className={'flex flex-wrap justify-center items-center'}>
                        {listItems}
                    </div>
                </div>
            )
        }

    }
}
