const { exec } = require('child_process');

const nigga = function(cmd){
exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
}

module.exports = nigga