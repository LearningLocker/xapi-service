#!/usr/bin/env sh
log () {
  echo "- XAPI SERVICE LOG: $1"
}

log "Running conformance tests."

log "Starting the server on port $EXPRESS_PORT."
node dist/conformanceServer.js &

log "Cloning the ADL conformance test suite."
git clone -b patch-1 https://github.com/ryansmith94/lrs-conformance-test-suite ../conformance
cd ../conformance

log "Installing dependencies for the ADL conformance test suite."
npm install

log "Running the ADL conformance test suite."
node bin/console_runner.js -e "http://localhost:$EXPRESS_PORT/data/xAPI" -a -u "AAA" -p "BBB" -b
exitCode=$?

log "Stopping the server."
ps aux | grep [n]ode\ dist\/conformanceServer | awk '{print $2}' | xargs kill

log "Completed conformance tests."
exit $exitCode
