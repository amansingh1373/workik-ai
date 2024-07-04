import * as vscode from 'vscode';
import { getAllFileContents, readFileContent } from './readFile';

export let refreshD = vscode.commands.registerCommand('workik.refresh', () => {
    vscode.commands.executeCommand('workbench.action.reloadWindow');
});

export let webPanelD = vscode.commands.registerCommand('workik.showWebPanel', () => {
    const panel = vscode.window.createWebviewPanel(
        'iframeView',
        'Workik',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            localResourceRoots: []
        }
    );

    panel.webview.html = getWebviewContentForMenuCommand("https://workik.com/");
});

export let fileInterfaceD = vscode.commands.registerCommand('workik.getFileInterface', () => {
    const panel = vscode.window.createWebviewPanel(
        'fileContentViewer',
        'File Content Viewer',
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    const workspaceFolders = vscode.workspace.workspaceFolders;
    const directoryPath = workspaceFolders ? workspaceFolders[0].uri.fsPath : '';

    panel.webview.html = getWebviewContentForReadingFiles();

    panel.webview.onDidReceiveMessage(
        async message => {
            if (message.command === 'fetchContent') {
                if (directoryPath) {
                    const fileContents = await getAllFileContents(directoryPath);
                    panel.webview.postMessage({ command: 'showContent', fileContents });
                } else {
                    panel.webview.postMessage({ command: 'showContent', fileContents: 'No workspace folder open' });
                }
            } else if (message.command === 'readFile') {
                const fileContent = await readFileContent(message.filePath);
                panel.webview.postMessage({ command: 'showContent', fileContents: fileContent });
            }
        },
        undefined
    );
});

function getWebviewContentForMenuCommand(externalUrl: string) {
    return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Webview</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="${externalUrl}"></iframe>
        </body>
        </html>
    `;
}

function getWebviewContentForReadingFiles(): string {
    return /*html*/`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Content Viewer</title>
            <style>
                .container {
                    overflow: auto;
                    height: 100%;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>File Content Viewer</h1>
                <button id="showContent">Show Content</button>
                <pre id="fileContents"></pre>
                <h1>Add file from another workspace</h1>
                <input type="file" id="getFile" />
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                document.getElementById('showContent').addEventListener('click', () => {
                    console.log('clicked');
                    vscode.postMessage({ command: 'fetchContent' });
                });
                document.getElementById('getFile').addEventListener('change', event => {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        vscode.postMessage({ command: 'readFile', filePath: file.path });
                    };
                    reader.readAsArrayBuffer(file);
                });
                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.command === 'showContent') {
                        document.getElementById('fileContents').innerHTML = message.fileContents;
                    }
                });
            </script>
        </body>
        </html>
    `;
}