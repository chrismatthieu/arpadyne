# Arpadyne Notes

This is a step-by-step guide to manually porting a website to Arpadyne.

## Download site
wget --wait=9 --recursive --level=7 https://computes.com

## IPFSify
ipfs add -r computes.com
https://gist.github.com/chrismatthieu/2cea6499e8465e5e84f6e21981540947
http://localhost:8080/ipfs/QmYRqJVbVD4eYdm6G7RKCTPrmmaGs7ErrupBrMXXFbwQXj/
http://ipfs.io/ipfs/QmYRqJVbVD4eYdm6G7RKCTPrmmaGs7ErrupBrMXXFbwQXj/


## IPNSify
ipfs name publish Qm-from-above
ipfs name publish QmYRqJVbVD4eYdm6G7RKCTPrmmaGs7ErrupBrMXXFbwQXj
Published to QmYHAswgHExLkr5mNSGPGsnBcgrpnkZRem2dZMLynEipzS: /ipfs/QmYRqJVbVD4eYdm6G7RKCTPrmmaGs7ErrupBrMXXFbwQXj

## Verify
https://ipfs.io/ipns/<peer-id>
localhost:8080/ipns/<peer-id>
localhost:8080/ipns/QmYHAswgHExLkr5mNSGPGsnBcgrpnkZRem2dZMLynEipzS
https://ipfs.io/ipns/QmYHAswgHExLkr5mNSGPGsnBcgrpnkZRem2dZMLynEipzS

## IPTSify
IPTS API - https://github.com/computes/tiny-tagging-service

curl -v \
  -X PUT \
  -H 'Content-Type: application/json' \
  'tiny-tagging-service.herokuapp.com/tags/computes.a' \
  -d '{"hash":"QmYRqJVbVD4eYdm6G7RKCTPrmmaGs7ErrupBrMXXFbwQXj"}'

^ Use IPNS hash

## Run
Update domain in index.js
node index.js

## Notes
https://gist.github.com/claus/1287f47b5fbaaea338ac8a04d02bf258
