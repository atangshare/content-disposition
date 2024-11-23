import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        const data = await fs.readFile(path.join(__dirname, 'public', 'index.html'));
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    } else if (req.url === '/preview') {
        const data = await fs.readFile(path.join(__dirname, 'public', 'sample.pdf'));
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline'
        });
        res.end(data);
    } else if (req.url === '/download') {
        const data = await fs.readFile(path.join(__dirname, 'public', 'sample.pdf'));
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="sample2.pdf"'
        });
        res.end(data);
    }
});

server.listen(3000, () => {
    console.log('Server is running on 3000');
});