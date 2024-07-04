import * as vscode from 'vscode';
import * as path from 'path';

type uriMap = {
    [key: string]: vscode.Uri;
};

 export class WebViewProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;

    constructor(private readonly context: vscode.ExtensionContext) {}

    resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
        this._view = webviewView;

        this._view.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'webview'))],
        };
        
        const scriptUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath( this.context.extensionUri, "webview", "build", "assets", "index.js",)); 
        const styleUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath( this.context.extensionUri, "webview", "build", "assets", "index.css",)); 
        const uris: uriMap = {
            "script": scriptUri,
            "style": styleUri
        };
        this._view.webview.html = this.getWebviewContent(uris);

        this._view.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'signin': 
                        vscode.commands.executeCommand('workik.openURL');
                        break;
                    case 'getToken':
                        const jwtToken = this.context.globalState.get('jwtToken');
                        this._view?.webview.postMessage({command: 'token', token: jwtToken});
                        break;
                    default:
                        vscode.window.showInformationMessage(`Unknown command: ${message.command}`);
                        break;
                }
            },
            undefined,
            this.context.subscriptions
        );
    }

    private getWebviewContent(uris: uriMap): string { 
        return /*html*/`
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Workik</title>
                <script type="module" crossorigin src="${uris['script']}"></script>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
                 <link rel="stylesheet" href="${uris['style']}" /> 
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }
                </style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    const vscode = acquireVsCodeApi();
                    
                    /*window.addEventListener('message', event => {
                        const message = event.data;
                        console.log(message);
                        vscode.postMessage(message);
                    });*/
                      
                    
                </script>
            </body>
            </html>
        
        `;
    }

    public sendMessage(message: any) {
        vscode.window.showWarningMessage(`${message}`);
        if (this._view) {
            this._view.webview.postMessage(message);
        }
    }
}