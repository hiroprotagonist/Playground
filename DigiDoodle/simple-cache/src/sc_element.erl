-module(sc_element).

-behaviour(gen_server).

-export([
				start_link/2,
				create/2,
				create/1,
				fetch/1,
				replace/2,
				delete/1
		]).

-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
		terminate/2, code_change/3]).

-define(SERVER, ?MODULE).
-define(DEFAULT_LEASE_TIME, (60 * 60 *24)).

-record(state, {value, lease_time, start_time}).

%%% API section
start_link(Value, LeaseTime) ->
		gen_server:start_link(?MODULE, [Value, LeaseTime], []).

create(Value, LeaseTime) ->
		sc_sup:start_child(Value, LeaseTime).

create(Value) ->
		create(Value, ?DEFAULT_LEASE_TIME).

fetch(Pid) ->
		gen_server:call(Pid, fetch).

replace(Pid, Value) ->
		gen_server:cast(Pid, {replace, Value}).

delete(Pid) ->
		gen_server:cast(Pid, delete).

%%% Callback section



