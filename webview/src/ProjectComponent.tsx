import { useState } from "react";
import './vscode';


const Project = () => {
    const [token, setToken] = useState('');
    const handleClick = () => {
        vscode.postMessage({command: 'getToken'});
    }

    const messageListener = (event: MessageEvent) => {
        const message = event.data; 
        setToken(message.token);
    };

    window.addEventListener('message', messageListener);
    return ( 
        <>
            <h1>This is project component</h1>
            <button onClick={handleClick}>Get Token</button>
            <p>${token}</p>
        </>
     );
}
 
export default Project;