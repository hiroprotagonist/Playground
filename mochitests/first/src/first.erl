%% @author Mochi Media <dev@mochimedia.com>
%% @copyright 2010 Mochi Media <dev@mochimedia.com>

%% @doc first.

-module(first).
-author("Mochi Media <dev@mochimedia.com>").
-export([start/0, stop/0]).

ensure_started(App) ->
    case application:start(App) of
        ok ->
            ok;
        {error, {already_started, App}} ->
            ok
    end.


%% @spec start() -> ok
%% @doc Start the first server.
start() ->
    first_deps:ensure(),
    ensure_started(crypto),
    application:start(first).


%% @spec stop() -> ok
%% @doc Stop the first server.
stop() ->
    application:stop(first).
