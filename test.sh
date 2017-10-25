#!/usr/bin/env sh
log () {
  echo "- XAPI SERVICE LOG: $1"
}

log "Running conformance tests."

log "Starting the server on port $EXPRESS_PORT."
npm start &

log "Removing clients and creating a new client."
mongo learninglocker_v2 --eval 'db.client.remove({})'
mongo learninglocker_v2 --eval 'db.client.insert({"createdAt":ISODate("2017-10-25T14:39:44.962Z"),"updatedAt":ISODate("2017-10-25T14:39:58.376Z"),"organisation":ObjectId("58fe13e34effd3c26a7fc4b6"),"lrs_id":ObjectId("5901bc9c81a4a731c2dec4f0"),"title":"Conformance Tests","scopes":["xapi/all","all"],"isTrusted":true,"authority":"{\"objectType\":\"Agent\",\"name\":\"New Client\",\"mbox\":\"mailto:hello@learninglocker.net\"}","api":{"basic_secret":"BBB","basic_key":"AAA"}})'

log "Installing the ADL conformance test suite."
npm install --no-save git+https://ryansmith94@github.com/ryansmith94/lrs-conformance-test-suite#patch-1
ls "$TRAVIS_BUILD_DIR/node_modules/lrs-conformance-tests/test"

log "Running the ADL conformance test suite."
node "$TRAVIS_BUILD_DIR/node_modules/lrs-conformance-tests/bin/console_runner.js" -e "http://localhost:$EXPRESS_PORT/data/xAPI" -a -u "AAA" -p "BBB"

log "Stopping the server."
ps aux | grep [n]ode\ dist\/server | awk '{print $2}' | xargs kill

log "Completed conformance tests."
