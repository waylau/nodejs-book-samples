const { exec } = require('node:child_process');

exec('node -v', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});