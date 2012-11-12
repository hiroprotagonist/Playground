"use strict";
$(document).bind( 'mobileinit', function () {
	$.mobile.ajaxEnabled = false;
});
var ding;
var dueker = {
	init_lvchumlvers : function () {

		$('.dueker_lvchumlvers_page').live( "pageshow", function() {
			var dlg = $('.dueker_lvchumlvers_page_errorMsgDialog', this);
			ding = dlg;		
			console.log('ps dlg=' + dlg);
			
			if ( typeof dlg !== 'undefined' ) {
				$( dlg ).popup("open");
			}
		});

		$('#dueker_lvchumlvers_nve').live('change', function() {
			var submitForm = $('#dueker_lvchumlvers_umlagern_form')[0];
			var syncAction = document.createElement("INPUT");
			syncAction.type = "hidden";
			syncAction.name = "action:umlagern!changeNve";
			submitForm.appendChild(syncAction);
			$('#dueker_lvchumlvers_umlagern_form').submit();
		});
		$('#dueker_lvchumlvers_zuplatz').live('change', function() {
			var submitForm = $('#dueker_lvchumlvers_umlagern_form')[0];
			var syncAction = document.createElement("INPUT");
			syncAction.type = "hidden";
			syncAction.name = "action:umlagern!changeZuplatz";
			submitForm.appendChild(syncAction);
			$('#dueker_lvchumlvers_umlagern_form').submit();
		});
		$('#dueker_lvchumlvers_abplatz').live('change', function() {
			var submitForm = $('#dueker_lvchumlvers_umlagern_form')[0];
			var syncAction = document.createElement("INPUT");
			syncAction.type = "hidden";
			syncAction.name = "action:umlagern!changeAbplatz";
			submitForm.appendChild(syncAction);
			$('#dueker_lvchumlvers_umlagern_form').submit();
		});
	}
}

$(document).ready( function() {
	dueker.init_lvchumlvers();
});

