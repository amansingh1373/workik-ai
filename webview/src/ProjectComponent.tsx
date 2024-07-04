import { useState } from 'react';
import './vscode';


const Project = () => {
    const [version, setVersion] = useState('');
    const getUserExtensionVersion = () => {
        vscode.postMessage({command:'getExtensionVersion'});
    }
    const updateExtension = () => {
        vscode.postMessage({command:'updateExtension'});
    }
    const messageListener = (event: MessageEvent) => {
        const message = event.data;
        console.log(message);
        if (message.command === 'UserVersion') {
            setVersion(message.version);
        }
    };

    window.addEventListener('message', messageListener);

    return ( 
        <>
            <h1>This is project component</h1>
            <button onClick={getUserExtensionVersion}>get User Version</button>
            <button onClick={updateExtension}>update extension</button>
            <p>version:{version}</p>
        </>
     );
}
 
export default Project;