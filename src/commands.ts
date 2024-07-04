import * as vscode from 'vscode';

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

    panel.webview.html = getWebviewContent("https://workik.com/");
});

function getWebviewContent(externalUrl: string) {
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