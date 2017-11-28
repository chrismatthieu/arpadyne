const { get, set, remove } = require("ipts")
const { exec } = require('child_process');
const domain = "computes.a"
const run = async () => {
  let hashObj = await get(domain)
  console.log(hashObj.hash)
  exec('open http://ipfs.io/ipns/' + hashObj.hash, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
run()
