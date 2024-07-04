import * as vscode from 'vscode';
import { WebViewProvider } from './webviewProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "workik-ai" is now active!');

	let disposable = vscode.commands.registerCommand('workik-ai.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from workik-AI!');
	});
	
    let provider = new WebViewProvider(context);
    vscode.window.registerWebviewViewProvider('workik', provider, {webviewOptions: {retainContextWhenHidden: true}});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
