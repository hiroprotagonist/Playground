-module(router).
-behaviour(gen_server).
-export([start_link/0]).


-record(state, {pid2id, id2pid}).
% Lookup the registry for a server named after this module
% which is the server spawned here :-)
-define(SERVER, global:whereis_name(?MODULE)).

% My API goes here
send(Id, Msg) ->
		gen_server:call(?SERVER, {send, Id, Msg}).

login(Id, Pid) when is_pid(Pid) ->
		gen_server:call(?SERVER, {login, Id, Pid}).

logout(Pid) when is_pid(Pid) ->
		gen_server:call(?SERVER, {logout, Pid}).

% OTP Contract goes here
start_link() ->
		gen_server:start_link({global, ?MODULE}, ?MODULE, [], []).

handle_call({login, Id, Pid}, From, State) when is_pid(Pid) ->
		ets:insert(State#state.pid2id, {Pid, Id}),
		ets:insert(State#state.id2pid, {Id, Pid}),
		link(Pid),
		io:format("~w logged in as ~w\n", [Pid, Id]),
		{reply, ok, State};

handle_call({logout, Pid}, From, State) when is_pid(Pid) ->
		unlink(Pid),
		PidRows = ets:lookup(State#state.pid2id, Pid),
		case PidRows of 
				[] ->
						ok;
				_ ->
						% One Pid to n Id's
						IdRows = [{I,P} || {P,I} <- PidRows],
						% delete pid->id
						ets:delete(State#state.pid2id, Pid),
						% and all id -> pid etries
						[ets:delete_object(State#state.id2pid, Obj) || Obj <- IdRows]
		end,
		io:format("pid ~w logged out\n", [Pid]),
		{reply, ok, State};

handle_call({send, Id, Msg}, From, State) ->
		Pids = [Pid || {_, Pid} <- ets:lookup(State#state.id2pid, Id)],
		M = {router_msg, Msg},
		[Pid ! M || Pid <- Pids],
		{reply, ok, State}.

init([]) ->
		process_flag(trap_exit, true),
		{ok, #state{
						pid2id = ets:new(?MODULE, [bag]),
						id2pid = ets:new(?MODULE, [bag])
				}
		}.

handle_info(Info, State) ->
		case Info of
				{'EXIT', Pid, _Reason} ->
						handle_call({logout, Pid}, chrashhandler, State);
				Wtf ->
						io:format("Caught unhandled message: ~w\n", [Wtf])
		end,
		{noreply, State}.

handle_cast(Msg, State) ->
		{noreply, State}.

terminate(Reason, State) ->
		ok.

code_change(Oldversion, State, Extra) ->
		{ok, State}.
