#!/usr/bin/env sh
echo "Running conformance tests."

echo "Starting the server on port $EXPRESS_PORT."
npm start &

echo "Removing clients and creating a new client."
mongo learninglocker_v2 --eval 'db.client.remove({})'
mongo learninglocker_v2 --eval 'db.client.insert({"createdAt":ISODate("2017-10-25T14:39:44.962Z"),"updatedAt":ISODate("2017-10-25T14:39:58.376Z"),"organisation":ObjectId("58fe13e34effd3c26a7fc4b6"),"lrs_id":ObjectId("5901bc9c81a4a731c2dec4f0"),"title":"Conformance Tests","scopes":["xapi/all","all"],"isTrusted":true,"authority":"{\"objectType\":\"Agent\",\"name\":\"New Client\",\"mbox\":\"mailto:hello@learninglocker.net\"}","api":{"basic_secret":"BBB","basic_key":"AAA"}})'

echo "Installing and running the ADL conformance test suite."
npm i --no-save git+https://ryansmith94@github.com/ryansmith94/lrs-conformance-test-suite#patch-1
node ./node_modules/lrs-conformance-tests/bin/console_runner.js -e "http://localhost:$EXPRESS_PORT/data/xAPI" -a -u "AAA" -p "BBB"

echo "Stopping the server."
ps aux | grep [p]hp | awk '{print $2}' | xargs kill

echo "Completed conformance tests."
