-module(road).
-export([main/0]).

main() ->
	{ok, Binary} = file:read_file(road.txt),
	Roadmap = parse_bin(Binary).


parse_bin(Binary) when is_binary(Binary) ->
	parse_bin(binary_to_list(Binary));
parse_bin(Str) when is_list(Str) ->
	Integers = [list_to_integer(I) || I <- string:tokens(Str, "\r\n")],
	tripels(Integers).

%% Extract road tripels a well formed list of integers
tripels(List) ->
	tripels(List, []).

tripels([], Acc) ->
	lists:reverse(Acc);
tripels([A,B,X|Rest], Acc) ->
	tripels(Rest, [{A,B,X}|Acc]).
