import * as vscode from 'vscode';
import { WebViewProvider } from './webviewProvider';
import { refreshD, webPanelD, fileInterfaceD } from './commands';
import { connectMongoDB } from './connectMongoDB';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "workik-ai" is now active!');
    const connectAndRegister = async () => {
        try {
            const db = await connectMongoDB();
            const provider = new WebViewProvider(context, db);
            vscode.window.registerWebviewViewProvider('workik', provider, {
                webviewOptions: { retainContextWhenHidden: true }
            });
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
        }
    };    
    connectAndRegister();
	context.subscriptions.push(refreshD, webPanelD, fileInterfaceD);
}

export function deactivate() {}


