const { get, set, remove } = require("ipts")

const express = require('express')
const app = express()
app.use(express.static('public'))

app.get('/ipts/:domain', async (req, res) => {
  // console.log(req.params.domain);
  const ipts = await get(req.params.domain.toLowerCase())
  if (ipts == null){
    var hash = "404"
  } else {
    var hash = ipts.hash
  }
  res.send(hash)
})

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// app.listen(3000, () => console.log('Example app listening on port 3000!'))
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
