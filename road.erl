-module(road).
-compile(export_all).

main([Filename]) ->
	{ok, Binary} = file:read_file(Filename),
	Roadmap = parse_bin(Binary),
	io:format("~p~n", [optimal_path(Roadmap)]),
	erlang:halt(0).

%% Transform a string into a readable map of triples
parse_bin(Binary) when is_binary(Binary) ->
	parse_bin(binary_to_list(Binary));
parse_bin(Str) when is_list(Str) ->
	Integers = [list_to_integer(I) || I <- string:tokens(Str, "\r\n")],
	tripels(Integers).

tripels(List) ->
	tripels(List, []).
tripels([], Acc) ->
	lists:reverse(Acc);
tripels([A,B,X|Rest], Acc) ->
	tripels(Rest, [{A,B,X}|Acc]).

%% Picks the best of all paths, woo!
optimal_path(Map) ->
	{A,B} = lists:foldl(fun shortest_step/2, {{0,[]}, {0,[]}}, Map),
	{_Dist,Path} = if hd(element(2,A)) =/= {x,0} -> A;
						hd(element(2,B)) =/= {x,0} -> B
					end,
	lists:reverse(Path).
 
%% actual problem solving
%% change triples of the form {A,B,X}
%% where A,B,X are distances and a,b,x are possible paths
%% to the form {DistanceSum, PathList}.
shortest_step({A,B,X}, {{DistA,PathA}, {DistB,PathB}}) ->
	OptA1 = {DistA + A, [{a,A}|PathA]},
	OptA2 = {DistB + B + X, [{x,X}, {b,B}|PathB]},
	OptB1 = {DistB + B, [{b,B}|PathB]},
	OptB2 = {DistA + A + X, [{x,X}, {a,A}|PathA]},
	{erlang:min(OptA1, OptA2), erlang:min(OptB1, OptB2)}.
