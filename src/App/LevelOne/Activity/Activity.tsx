import React from "react";
import { Link, Redirect } from 'react-router-dom'
import fs from 'fs'
import os from 'os'
import path from 'path'
import Mousetrap from "mousetrap";

import './Activity.css'

function shuffle(array: any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function transformArr (arr: string[]) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push({ id: i, src: arr[i] })
    }
    return newArr
}

const Img = (props: any) => {
    return (
        <div className={'cf h5'}>
            <div className={'cf h-100 ma2'}>
                <img className={'h-100 ba br3'} onClick={props.handleClick} draggable={false} src={props.src}/>
            </div>
        </div>
    )
}

interface State {
    activityPath: string,
    imagePath: string,
    statementsPath: string,
    testPath: string,
    images: {id: number, src: string}[],
    statements: string[],
    test: string[],
    playing: HTMLAudioElement | null,
    currentTest: number,
    redirectUp: boolean,
    lateralRedirect: { redirect: boolean, activity: string, toIndex: number }
}

export default class extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            activityPath: '',
            imagePath: '',
            statementsPath: '',
            testPath: '',
            images: [],
            statements: [],
            test: [],
            playing: null,
            currentTest: 0,
            redirectUp: false,
            lateralRedirect: { redirect: false, activity: '', toIndex: 0 }
        }
        this.handleImgClick = this.handleImgClick.bind(this)
    }
    async componentDidMount() {
        Mousetrap.bind('q', () => this.handleQ())
        Mousetrap.bind('s', () => this.handleS())
        Mousetrap.bind('w', () => this.handleW())
        Mousetrap.bind('d', () => this.handleD())
        Mousetrap.bind('a', () => this.handleA())
        try {
            await this.fetch(this.props)
        } catch (error) {
            console.log(error)
        }
    }
    componentWillUnmount() {
        Mousetrap.reset()
    }
    async componentDidUpdate(oldProps: any) {
        if (this.props.match.params.index !== oldProps.match.params.index) {
            try {
                await this.fetch(this.props)
            } catch (error) {
                console.log(error)
            }

        }
    }
    async fetch(props: any) {
        const { library, activity } = props.match.params
        const appPath = path.join(os.homedir(), 'Pie')
        const libraryPath = path.join(appPath, library)
        const activityPath = path.join(libraryPath, 'Level 1', activity)
        const imagePath = path.join(activityPath, 'images')
        const statementsPath = path.join(activityPath, 'statements')
        const testPath = path.join(activityPath, 'test')
        const r = await Promise.all([
            fs.promises.readdir(imagePath).catch(() => {
                // console.log('Image directory not found')
                return []
            }),
            fs.promises.readdir(statementsPath).catch(() => {
                // console.log('Statements directory not found')
                return []
            }),
            fs.promises.readdir(testPath).catch(() => {
                // console.log('Test directory not found')
                return []
            })
        ])
        const images = transformArr(r[0])
        const statements = r[1]
        const test = shuffle(r[2])
        this.setState({
            activityPath,
            imagePath,
            statementsPath,
            testPath,
            images,
            statements,
            test,
            currentTest: 0,
            lateralRedirect: {
                redirect: false,
                activity: '',
                toIndex: 0
            }
        })
    }
    handleImgClick(index: number) {
        const newUrl = this.state.statements[index]
        if (newUrl) {
            this.playAudio(path.join('file:', this.state.statementsPath, newUrl))
        }
    }
    handleQ() {
        const i = this.state.currentTest
        const newUrl = this.state.test[i]
        if (newUrl) {
            this.playAudio(path.join('file:', this.state.testPath, newUrl))
        } else {
            console.log('url not found for index: ', i)
        }
        let newIndex = i + 1;
        let newArr = this.state.test
        if (newIndex >= this.state.test.length) {
            newIndex = 0
            newArr = shuffle(newArr)
            console.log(newArr)
        }
        this.setState({
            currentTest: newIndex,
            test: newArr
        })
    }
    handleS() {
        const newArr = shuffle(this.state.images)
        this.setState({
            images: newArr
        })
    }
    handleW() {
        this.setState({
            redirectUp: true
        })
    }
    async handleD() {
        const { index, library } = this.props.match.params
        const appPath = path.join(os.homedir(), 'Pie')
        const libraryPath = path.join(appPath, library)
        const levelPath = path.join(libraryPath, 'Level 1')
        const activities = await fs.promises.readdir(levelPath)
        let newIndex = Number(index)
        newIndex++
        if (newIndex === activities.length) {
            newIndex = 0
        }
        this.setState({
            lateralRedirect: {
                redirect: true,
                activity: activities[newIndex],
                toIndex: newIndex
            }
        })
    }
    async handleA() {
        const { index, library } = this.props.match.params
        const appPath = path.join(os.homedir(), 'Pie')
        const libraryPath = path.join(appPath, library)
        const levelPath = path.join(libraryPath, 'Level 1')
        const activities = await fs.promises.readdir(levelPath)
        let newIndex = Number(index)
        newIndex--
        if (newIndex === -1) {
            newIndex = activities.length - 1
        }
        this.setState({
            lateralRedirect: {
                redirect: true,
                activity: activities[newIndex],
                toIndex: newIndex
            }
        })
    }
    playAudio(url: string) {
        if (this.state.playing) {
            this.state.playing.pause()
        }
        const newAudio = new Audio(url)
        newAudio.play()
        this.setState({
            playing: newAudio
        })
    }
    render() {
        const { library, activity } = this.props.match.params
        const images = this.state.images.map((obj: { id: number, src: string }, index: number) => {
            return <Img key={index} handleClick={() => this.handleImgClick(obj.id)} src={path.join('FILE:', this.state.imagePath, obj.src)}/>
        })
        if (this.state.redirectUp) {
            return <Redirect to={`/level-one-activity-list/${library}`} />
        } else if (this.state.lateralRedirect.redirect) {
            const { activity, toIndex } = this.state.lateralRedirect
            return <Redirect to={`/level-one-activity/${library}/${activity}/${toIndex}`} />
        } else {
            return (
                <div className={'cf h-100'}>
                    <div className={'cf white h-5 lh-title'}>
                        <h1 className={'h-100 pl2'}>
                            <Link to={'/'}>Home</Link><span className={'pl2 pr2'}>/</span>
                            <Link to={`/level-list/${library}`}>{library}</Link><span className={'pl2 pr2'}>/</span>
                            <Link to={`/level-one-activity-list/${library}`}>Level 1</Link><span className={'pl2 pr2'}>/</span>
                            {activity}
                        </h1>
                    </div>
                    <div className={'flex h-95 justify-center items-center flex-wrap'}>{images}</div>
                </div>)
        }
    }
}
