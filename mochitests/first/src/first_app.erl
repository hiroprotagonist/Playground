%% @author Mochi Media <dev@mochimedia.com>
%% @copyright first Mochi Media <dev@mochimedia.com>

%% @doc Callbacks for the first application.

-module(first_app).
-author("Mochi Media <dev@mochimedia.com>").

-behaviour(application).
-export([start/2,stop/1]).


%% @spec start(_Type, _StartArgs) -> ServerRet
%% @doc application start callback for first.
start(_Type, _StartArgs) ->
    first_deps:ensure(),
    first_sup:start_link().

%% @spec stop(_State) -> ServerRet
%% @doc application stop callback for first.
stop(_State) ->
    ok.
