import * as vscode from 'vscode';
import { WebViewProvider } from './webviewProvider';
import { refreshD, webPanelD, fileInterfaceD } from './commands';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "workik-ai" is now active!');

    let provider = new WebViewProvider(context);
    vscode.window.registerWebviewViewProvider('workik', provider, {webviewOptions: {retainContextWhenHidden: true}});


	context.subscriptions.push(refreshD, webPanelD, fileInterfaceD);
}

export function deactivate() {}


