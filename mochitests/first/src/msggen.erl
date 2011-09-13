-module(msggen).
-export([start/3,massiveAttack/0,massiveAttack/1]).

start(0, _, _) -> ok;
start(Num, Interval, Max) ->
	Id = random:uniform(Max),
	Msg = io_lib:format("Fake message #~w", [Num]),
	router:send(Id, Msg),
	receive after Interval -> start(Num -1, Interval, Max) end.

massiveAttack() -> massiveAttack(100).

massiveAttack(Num) ->
	[ 
	spawn(fun() -> 
		msggen:start(1000000, 100, 10000)
	end)
	|| _ <- lists:seq(1,Num) 
	].
