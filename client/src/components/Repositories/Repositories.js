import React, { Component } from 'react';

import Repository from './Repository/Repository';

class Repositories extends Component {

    constructor(props){
        super(props);
    }

    openChromeHandler(url) {
        const electron = window.require("electron");
        const ipcRenderer = electron.ipcRenderer;
        ipcRenderer.send('open-chrome', url);
    }

    openVSCodeHandler(url) {
        const electron = window.require("electron");
        const ipcRenderer  = electron.ipcRenderer;
        ipcRenderer.send('open-vs-code', url);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '20px'}}>
                {Array.from(this.props.userRepo.keys(), repo => {
                    let singleRepo = this.props.userRepo.get(repo);
                    return <Repository
                                name={singleRepo.name} 
                                url={singleRepo.url}
                                updated_at={singleRepo.updated_at}
                                lang={singleRepo.lang}
                                clone_url={singleRepo.clone_url}
                                fork_url={singleRepo.fork_url}
                                type={this.props.type}
                                openVSCode={this.openVSCodeHandler}
                                openChrome={this.openChromeHandler}
                                loadForkURL={this.forkURL} />
                })}
            </div>
        );
    }

}

export default Repositories;