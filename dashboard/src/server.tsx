import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import {readFile} from 'fs';
import {promisify} from 'util';

const app = express();
const port = process.env.PORT || 3000;
const webDir = process.env.WEB_PATH || path.join(__dirname, 'web');
const apiHost = process.env.API_SERVER || 'http://localhost:5000';

console.log(`Serving from ${webDir} on port ${port}, API address: ${apiHost}`);

const readFileAsync = promisify(readFile);

async function readIndexFile(): Promise<string>
{
    const html = await readFileAsync(path.join(webDir, 'index.html'));
    return html.toString().replace('{{API_HOST}}', apiHost);
}

const indexFile = readIndexFile();

app.use(expressStaticGzip(webDir, {
    index: false,
    indexFromEmptyFile: false
}));
app.get('/*', async (req, res) =>
{
    const index = await indexFile;
    res.send(index);
});

app.listen(port);
