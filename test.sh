#!/usr/bin/env sh
log () {
  echo "- XAPI SERVICE LOG: $1"
}

log "Running conformance tests."

log "Starting the server on port $EXPRESS_PORT."
yarn start &

log "Removing clients and creating a new client."
mongo learninglocker_v2 --eval 'db.client.remove({})'
mongo learninglocker_v2 --eval 'db.client.insert({"createdAt":ISODate("2017-10-25T14:39:44.962Z"),"updatedAt":ISODate("2017-10-25T14:39:58.376Z"),"organisation":ObjectId("58fe13e34effd3c26a7fc4b6"),"lrs_id":ObjectId("5901bc9c81a4a731c2dec4f0"),"title":"Conformance Tests","scopes":["xapi/all","all"],"isTrusted":true,"authority":"{\"objectType\":\"Agent\",\"name\":\"New Client\",\"mbox\":\"mailto:hello@learninglocker.net\"}","api":{"basic_secret":"BBB","basic_key":"AAA"}})'

log "Cloning the ADL conformance test suite."
git clone -b patch-1 https://github.com/ryansmith94/lrs-conformance-test-suite ../conformance
cd ../conformance

log "Installing dependencies for the ADL conformance test suite."
npm install

log "Running the ADL conformance test suite."
node bin/console_runner.js -e "http://localhost:$EXPRESS_PORT/data/xAPI" -a -u "AAA" -p "BBB"
exitCode=$?

log "Stopping the server."
ps aux | grep [n]ode\ dist\/server | awk '{print $2}' | xargs kill

log "Completed conformance tests."
exit $exitCode
