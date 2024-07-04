import * as vscode from 'vscode';

const extensionid = 'workik.workik-ai';

export function getUserExtensionVersion(): string {
    const currentExtension = vscode.extensions.getExtension('workik.workik-ai');
    if (currentExtension) {
        return currentExtension.packageJSON.version;
    }
    throw new Error('Extension not found');
}

export function updateExtension(): void {
    vscode.window.showInformationMessage(
        `An update for your extension is available!`,
        'Update Now'
    ).then(selection => {
        if (selection === 'Update Now') {
            vscode.commands.executeCommand('workbench.extensions.search', `@id:${extensionid}`);
        }
    });
}