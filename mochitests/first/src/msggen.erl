-module(msggen).
-export([start/3]).

start(0, _, _) -> ok;
start(Num, Interval, Max) ->
	Id = random:uniform(Max),
	Msg = io_lib:format("Fake message #~w", [Num]),
	router:send(Id, Msg),
	receive after Interval -> start(Num -1, Interval, Max) end.
