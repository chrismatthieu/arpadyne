const { get, set, remove } = require("ipts")

const express = require('express')
const app = express()
app.use(express.static('public'))

app.get('/ipts/:domain', async (req, res) => {
  // console.log(req.params.domain);
  const ipts = await get(req.params.domain)
  res.send(ipts.hash)
})

// app.listen(3000, () => console.log('Example app listening on port 3000!'))
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
