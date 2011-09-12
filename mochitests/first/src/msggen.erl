-module(msggen).
-export([start/3]).

start(0, _, _) -> ok;
start(Num, Interval, Max) ->
	Id = random:uniform(Max),
	router:send(Id, "Fake message Num =" ++ Num),
	receive after Interval -> start(Num -1, Interval, Max) end.
