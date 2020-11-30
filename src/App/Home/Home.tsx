import React, {Component, SyntheticEvent} from 'react'
import {Link} from 'react-router-dom'

import fs from 'fs'
import os from 'os'
import path from 'path'

import { mkLibrary } from './mkLibrary'

import TestComponent from "../TestComponent";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
    appPath: string,
    libraryList: string[],
    newLibraryName: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface Props {
//
// }


export default class extends Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            appPath: '',
            libraryList: [],
            newLibraryName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount(): Promise<void> {
        try {
            await this.fetch()
        } catch (e) {
            console.error(e)
        }
    }

    async handleSubmit(event: any): Promise<void> {
        event.preventDefault();
        console.log('submitted: ', this.state.newLibraryName)
        if (!this.state.newLibraryName) {
            return Promise.resolve()
        }
        try {
            await mkLibrary(this.state.newLibraryName)
            await this.fetch()
        } catch (e) {
            console.error(e)
        }
    }
    handleChange(event: any) {
        // console.log(event)
        this.setState({newLibraryName: event.target.value});
    }
    async fetch (): Promise<void> {
        const homeDir = os.homedir();
        const appPath = path.join(homeDir, 'Pie')
        let libraryList: string[]
        try {
            libraryList = await fs.promises.readdir(appPath)
        } catch (error) {
            console.error('Could not get libraries')
            libraryList = []
        }
        this.setState({
            appPath,
            libraryList,
            newLibraryName: ''
        })
    }
    render() {
        const ListItem = (lib: string, index: number) => {
            // const libPath = btoa(path.join(this.state.appPath, lib))
            return <li key={index}><Link to={`/level-list/${lib}`}>{lib}</Link></li>;
        }
        const libraries = this.state.libraryList.map(ListItem);
        return (
            <div className={'cf bg-black h-100'}>
                <ul>
                    { libraries }
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.newLibraryName} onChange={this.handleChange} />        </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
