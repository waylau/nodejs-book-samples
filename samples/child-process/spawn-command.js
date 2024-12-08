const { spawn } = require('node:child_process');
const childProcess = spawn('node', ['-v']);

childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});