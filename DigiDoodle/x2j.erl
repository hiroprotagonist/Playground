%%%-------------------------------------------------------------------
%%% File    : x2j.erl
%%% Author  : Stefan Gebhardt <stefan.gebhardt@abas.de>
%%% Description : Transform Abas XML to JSON 
%%%
%%% Created :  20 Oct 2011 <>
%%%-------------------------------------------------------------------
-module(x2j).
-include_lib("xmerl/include/xmerl.hrl").
-import(xmerl_xs, 
	[ xslapply/2, value_of/1, select/2, built_in_rules/2 ]).
-export([process_xml/1,process_to_file/2,process_to_file/1]).
process_xml(Doc) ->
    template(Doc).
process_to_file(FileName) ->
    process_to_file(FileName,'products.xml').
process_to_file(FileName,XMLDoc) ->
    case file:open(FileName,[write]) of
	{ok,IOF} ->
	    {XMLContent,_} = xmerl_scan:file(XMLDoc,[{validation,false}]),
	    TransformedXML=process_xml(XMLContent),
		io:format(IOF,"~s",[lists:flatten(TransformedXML)]),
		io:format("~s", [lists:flatten(TransformedXML)]),
	    file:close(IOF);
	{error,Reason} ->
	    io:format("could not open file due to ~p.~n",[Reason])
    end.

%%% templates
template(E = #xmlElement{name='ABASData'}) ->
        xslapply(fun template/1,select("RecordSet",E));
template(E = #xmlElement{name='RecordSet'}) ->
	[	"[",
		xslapply(fun template/1,select("Record",E)),
		"]"];
template(E = #xmlElement{name='Record'}) ->
	[	"{",
		xslapply(fun template/1, select("Head", E)),
		",\n rows: [",
		[xslapply(fun template/1, select("Row", E))],
		"]},"];
template(E = #xmlElement{name='Head'}) ->
	[	"head : {",
       	xslapply(fun template/1, select("Field", E)),
		"}"];
template(E = #xmlElement{name='Row'}) ->
	[	"{",
		xslapply(fun template/1, select("Field", E)),
		"},"];
template(E = #xmlElement{name='Field'}) ->
	"'" ++ xslapply(fun template/1, select("@name", E)) ++ "': '" ++ value_of(E) ++ "',\n";

template(E) -> built_in_rules(fun template/1, E).


























