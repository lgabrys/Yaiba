import cp from 'child_process';
async function elementaryOS () {
  let cmd = 'cat /etc/os-release <(lsb_release -d) | grep \\"elementary OS\\"';
  cmd = '/bin/bash -c "' + cmd + '"';
  return await new Promise((resolve, reject) => {
    cp.exec(cmd, (err, stdout, stderr) => resolve(!!err));
  });
}
