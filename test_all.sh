#!/bin/bash

#espresso doesn't work right for me if I run all the tests at once. 
#it runs slightly slower than, running one at a time and things timeout, i think.

expresso test/bidirectional.js
expresso test/broadcast.js
expresso test/circular.js
expresso test/double.js
expresso test/emit.js
expresso test/error.js
expresso test/events.js
expresso test/nested.js
expresso test/obj.js
expresso test/ping.js
expresso test/refs.js
expresso test/self-referential.js
expresso test/simple.js
expresso test/single.js
expresso test/stream.js
expresso test/unicode.js
expresso test/webevent.js
expresso test/call_end_twice.js
node test/asynct/error.asynct.js
node test/asynct/parse_args.asynct.js
node test/asynct/scrubber.asynct.js
node test/asynct/scrubber_function_properties.asynct.js

