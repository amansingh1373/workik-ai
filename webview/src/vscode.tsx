
interface message {
    [key: string]: string;
}

interface vscode {
    postMessage(message: message): void;
}
declare const vscode: vscode;