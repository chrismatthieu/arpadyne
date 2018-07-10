'use strict'

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
let db, dns
var path = window.location.pathname.substr(1)
if (path){
  loadIframe("content", "/waiting.html")
}
function repo () {
  return 'ipfs/arpadyne'
}
const ipfs = new IPFS({
  repo: repo(),
  start: true,
  EXPERIMENTAL: { pubsub: true },
  config: {
    Addresses: {
      Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
    }
  }
})
ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }

  console.log('IPFS node ready with address ' + info.id)
  // ipfs.swarm.connect("/dns4/philes.co/tcp/4017/wss/ipfs/QmcmpPQ3JckMMLTVRcCpwvM75vm43i78D7Vbxs7bNRj1dH", (err) => {
  //   if (err) {
  //     return console.error(err)
  //   }
  //   console.log("connected to swarm via relay");
  // })

  const orbitdb = new OrbitDB(ipfs)
  const initDB = async () => {
    // Create / Open a database
    db = await orbitdb.keyvalue('domains')
    await db.load()

    // Listen for updates from peers
    db.events.on('replicated', (address) => {
      console.log("replicated", address);
    })

    // Add bootstrap domains
    await db.set('computes.a', { hash: 'QmXABAmjhBX4q9niDidia1wJFiZkhCr6NVYfeJmWtfUQ1z' })
    await db.set('thinclient.a', { hash: 'QmVJXh4Jfi8Joq3Xgwx9znsj9EjsYDLApWcfZXk8nFFjsN' })
    await db.set('ipfs.a', { hash: 'QmRowFj747ccnyZjmjsB8ngpzSDjPeuT2RgA2MYGRZhWdm' })
    await db.set('ipld.a', { hash: 'QmSvCiezPhnGaVnFgzPXhr28bxUW6XALHrSoJV14gitEgy' })
    await db.set('filecoin.a', { hash: 'QmYGTBsF1nyKBDdMWBQMoU6FhZVBPzqtN8EH7e9Pya9JnE' })
    console.log("Bootstrap domains loaded.");
    $("#addLink").show()

    if (path){
      $("#search").val(path)
      go(path)
    }
    $(function() {
      $("#AddDomain").submit(function($event2) {
        $event2.preventDefault()
        db.set($("#domain").val(), { hash: $("#hash").val()})
        console.log($("#domain").val());
        console.log($("#hash").val());
        console.log("Domain added");
        $("#addModal .close").click()
      })
    })

  }

  initDB()

}))

function loadIframe(iframeName, url) {
  var $iframe = $("#" + iframeName)
  if ($iframe.length) {
    $iframe.attr("src", url)
    return false
  }
  return true
}
function go(domain) {
  if(domain == undefined){
    domain = $("#search").val()
  }

  dns = db.get(domain)
  console.log("dns", dns);

  if (dns == undefined){
    loadIframe("content", "/404.html")
  } else {
    loadIframe("content", "https://ipfs.io/ipfs/" + dns.hash)
  }

}
$(function() {
  $("#myform").submit(function($event) {
    $event.preventDefault()
    loadIframe("content", "/waiting.html")
    go()
  })
})
