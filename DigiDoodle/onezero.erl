%%% Playing, Learning Erlang

-module(onezero).
-export([reverse/1]).

reverse(List) ->
		reverse(List, []).

reverse([], Accu) ->
		Accu;
reverse([First|Rest], Accu) ->
		reverse(Rest, [First|Accu]).
