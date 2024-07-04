import * as fs from 'fs';
import * as path from 'path';

export async function getAllFileContents(dir: string): Promise<string> {
    let contents = '';

    async function readDirectory(directory: string) {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.lstatSync(filePath);

            if (stat.isDirectory()) {
                await readDirectory(filePath);
            } else {
                const ext = path.extname(file).toLowerCase();
                if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
                    const base64Image = fs.readFileSync(filePath, 'base64');
                    contents += `\n\n--- ${file} ---\n\n<img src="data:image/${ext.substring(1)};base64,${base64Image}" />\n\n`;
                } else {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    contents += `\n\n--- ${file} ---\n\n${content}`;
                }
            }
        }
    }

    await readDirectory(dir);
    return contents;
}

export async function readFileContent(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();
    let contents = '';

    if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
        const base64Image = fs.readFileSync(filePath, 'base64');
        contents += `\n\n--- ${path.basename(filePath)} ---\n\n<img src="data:image/${ext.substring(1)};base64,${base64Image}" />\n\n`;
    } else {
        const content = fs.readFileSync(filePath, 'utf-8');
        contents += `\n\n--- ${path.basename(filePath)} ---\n\n${content}`;
    }

    return contents;
}