#!/bin/sh
# NOTE: mustache templates need \ because they are not awesome.
exec erl -pa ebin edit deps/*/ebin -boot start_sasl \
    -sname n1 \
    -s first \
    -s reloader \
	+K true \
	+P 134217727
