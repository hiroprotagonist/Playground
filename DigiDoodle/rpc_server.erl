-module(rpc_server).

-behaviour(gen_server).

-export([start_link/0]).
-export([init/1, code_change/3, handle_call/3]).
-export([echo/1]).

-define(SERVER, ?MODULE).

-record(state, {}).

start_link() ->
	gen_server:start_link({local, ?SERVER}, ?SERVER, [], []).

init( _Whatever) ->
	{ok, #state{}}.

code_change(_OldSvn, State, _Extra) ->
	io:format("code change recieved~n", []),
	{ok, State}.

echo(Message) ->
	gen_server:call(?SERVER, {echo, Message}).

handle_call({echo, Message}, From, State) ->
	io:format("Message [~w] recieved from:  ~w~n", [Message, From]),
	{reply, Message, State}.


