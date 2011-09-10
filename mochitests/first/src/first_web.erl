%% @author Mochi Media <dev@mochimedia.com>
%% @copyright 2010 Mochi Media <dev@mochimedia.com>

%% @doc Web server for first.

-module(first_web).

-export([start/1, stop/0, loop/2]).

%% External API

start(Options) ->
	{DocRoot, Options1} = get_option(docroot, Options),
	Loop = fun (Req) ->
				   ?MODULE:loop(Req, DocRoot)
		   end,
	% set maximum parallel connections to 1mio
	mochiweb_http:start([{max, 1000000}, {name, ?MODULE}, {loop, Loop} | Options1]).

stop() ->
	mochiweb_http:stop(?MODULE).

loop(Req, DocRoot) ->
	"/" ++ Path = Req:get(path),
	try
		case Req:get(method) of
			Method when Method =:= 'GET'; Method =:= 'HEAD' ->
				case Path of
					"test/" ++ Id ->
						Response = Req:ok({"text/html; charset=utf-8",
										 [{"Server","Mochiweb-Test"}],
										 chunked}),
						{IdInt, _} = string:to_integer(Id),
						router:login(IdInt, self()),
						feed(Response, IdInt, 1);
					_ ->
						Req:serve_file(Path, DocRoot)
				end;
			'POST' ->
				case Path of
					_ ->
						Req:not_found()
				end;
			_ ->
				Req:respond({501, [], []})
		end
	catch
		Type:What ->
			Report = ["web request failed",
					  {path, Path},
					  {type, Type}, {what, What},
					  {trace, erlang:get_stacktrace()}],
			error_logger:error_report(Report),
			%% NOTE: mustache templates need \ because they are not awesome.
			Req:respond({500, [{"Content-Type", "text/plain"}],
						 "request failed, sorry\n"})
	end.

%%% Hier ist das Problem.
feed(Response, Id, N) ->
	receive
	{router_msg, Msg} ->
			Html = io:format("Msg #~w: '~s'", [N, Msg]),
			Response:write_chunk(Html)
	end,
	feed(Response, Id, N+1).

%% Internal API

get_option(Option, Options) ->
	{proplists:get_value(Option, Options), proplists:delete(Option, Options)}.

%%
%% Tests
%%
-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").

you_should_write_a_test() ->
	?assertEqual(
	   "No, but I will!",
	   "Have you written any tests?"),
	ok.

-endif.
