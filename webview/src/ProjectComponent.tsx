import { useState } from 'react';
import './vscode';


const Project = () => {
    const [version, setVersion] = useState('');
    const [mongoData, setMongoData] = useState('');
    const [postgresData, setPostgresData] = useState('');
    const getUserExtensionVersion = () => {
        vscode.postMessage({command:'getExtensionVersion'});
    }
    const updateExtension = () => {
        vscode.postMessage({command:'updateExtension'});
    }

    const fetchMongoData = () => {
        vscode.postMessage({command:"fetchMongoData"});
    }
    const fetchPostgresData = () => {
        vscode.postMessage({command:"fetchPostgresData"});
    }

    const messageListener = (event: MessageEvent) => {
        const message = event.data;
        console.log(message);
        if (message.command === 'UserVersion') {
            setVersion(message.version);
        } else if(message.command === 'mongoData') {
            setMongoData(message.data);
        } else if(message.command === 'postgresData') {
            setPostgresData(message.data);
        }
    };

    window.addEventListener('message', messageListener);

    return ( 
        <>
            <h1>This is project component</h1>
            <div>
                <button onClick={updateExtension}>update extension</button>
            </div>
            <div>
                <button onClick={getUserExtensionVersion}>get User Version</button>
            </div>
            <p>version:{version || "null"}</p>
            <div>
                <button onClick={fetchMongoData}>Fetch Data from MongoDB</button>
            </div>
            <div id="mongo-data">
                {typeof(mongoData) || "No Data to show"}
            </div>
            <div>
                <button onClick={fetchPostgresData}>Fetch Data from Postgres</button>
            </div>
            <div id="postgres-data">
                {typeof(postgresData) || "No Data to show"}
            </div>
        </>
     );
}
 
export default Project;