/*
*** Please do not remove this notes. ***
Simple Dictionary by Zofia Kreasi
June 9 2018
Created by Habibie (Zofia Kreasi)
habibieamrullah@gmail.com
http://zofiakreasi.com/
*/

//Credit note (Unless you are my supporter on Patreon, please do not modify this variable)
var credit = "Created with love by Habibie (Zofia Kreasi)";

//Info notes to be displayed to users
var info = "<h2>Simple JS Dictionary</h2><p>Simple JavaScript based dictionary app that runs on a web browser locally without any server or internet connection needed.</p><p>As default, this dictionary app contains English-Indonesia vocabularies. To modify the word list, please watch related video tutorial about this product.</p><p>Visit <a href='http://store.zofiakreasi.com/index.php/product/simple-js-dictionary/'>this link</a> for more information.</p>";

//General app info
var title = "Simple JS Dictionary";

//Share link
var shareLink = function(){
	return "http://store.zofiakreasi.com/index.php/product/simple-js-dictionary/";
}

//Share text 
var shareText = function(){
	return "Simple JS Dictionary";
}

//When document is ready...
var context;
var instance;
$(document).ready(function(){
	//Rename app's title
	$("title").html(title);
	$("#apptitle").html(title);
	
	resizeEl();
	putCredit();
	listWords('en', 'a');
	context = document.getElementById("main");
	instance = new Mark(context);
});

//When user's window is resized...
$(window).resize(function() {
	resizeEl();
});

//FUNCTIONS

//listing words grouped based on its first letter. Replace "id" and "en" to anything you wish, in my case "id" = Indonesian and "en" = English.
function listWords(lang, letter){
	$("#main").html("");
	
	//Populate alphabet buttons
	$("#main").append("<div class='ll' style='text-align: center; margin: 10px;'></div>");
	
	$("#main").append("<h2>Letter \""+letter.toUpperCase()+"\"</h2>");
	
	//Loop based on current defined first letter
	var hasresult = false;
	for(var i = 0; i < definitions.length; i++){
		var curdef;
		if(lang === "en")
			curdef = definitions[i].en[0].toLowerCase();
		else
			curdef = definitions[i].id[0].toLowerCase();
		if(curdef === letter){
			if(lang === "en"){
				hasresult = true;
				$("#main").append("<div class='wlist'><b>" + definitions[i].en + "</b> : " + definitions[i].id + "</div>");
			}else{
				hasresult = true;
				$("#main").append("<div class='wlist'><b>" + definitions[i].id + "</b> : " + definitions[i].en + "</div>");
			}
		}
	}
	if(!hasresult){
		$("#main").append("<p style='color: #afafaf;'>Nothing found.</p>");
	}else{
		sortWordList("main");
	}
	
	//Populate alphabet buttons
	$("#main").append("<div class='ll' style='text-align: center; margin: 10px;'></div>");
	for(var i = 65; i <= 90; i++){
		$(".ll").append("<div class='letterlist' onclick='listWords(\""+lang+"\", \""+String.fromCharCode(i).toLowerCase()+"\");'>" + String.fromCharCode(i) + "</div>");
	}
	
	$("#main").fadeIn().scrollTop(0);
	$("#main").animate({ "scrollTop" : $("h2").offset().top - 100 });
	//if list is too long, show scroll to bottom button
	showScrollBottom();
}

//Resizing elements to fit current screen
function resizeEl(){
	$("#drawer").css({ "top" : ($("#appbar").outerHeight() + 1) + "px" });
	$("#main").css({ "height" : (innerHeight - 80 - 1 - $("#appbar").outerHeight()) + "px" });
	$("#credits").css({ "width" : $("#drawer").outerWidth() - (parseInt($("#credits").css("padding"))*2) });
}

//Toggling visibility of Navigation Drawer
function toggleDrawer(){
	$("#drawer").fadeToggle();
}

//Showing Quick Find page
function showQf(){
	var qf = "<h2>Quick find</h2><input id='qf' onkeyup='qf()' placeholder='Type something...'><div id='sresult'></div>";
	$("#main").hide().html(qf).show();
	showScrollBottom();
}

//Showing info notes
function showInfo(){
	$("#main").hide().html(info).fadeIn();
	showScrollBottom();
}

//Puting credits note on this app
function putCredit(){
	$("#credits").html(credit);
}

//Quick find function
var qftimeout;
function qf(){
	var kwrd = $("#qf").val().toLowerCase();
	if(kwrd.length > 2){
		clearTimeout(qftimeout);
		$("#sresult").html("Searching...");
		qftimeout = setTimeout(function(){
			var sresult = "";
			for(var i = 0; i < definitions.length; i++){
				if(definitions[i].en.toLowerCase().indexOf(kwrd) > -1 || definitions[i].id.toLowerCase().indexOf(kwrd) > -1){
					sresult += "<div class='wlist'><b>" + definitions[i].en + "</b> : " + definitions[i].id + "</div>";
				}
			}
			$("#sresult").html(sresult);
			sortWordList("sresult");
			$("#qf").val("");
			
			//Highlighting searched keyword
			instance.mark(kwrd);
		}, 1500);
	}
}

//Sorting word lists
function sortWordList(id){
	$(".wlist").sort(function(a, b) {
		if (a.textContent.toLowerCase() < b.textContent.toLowerCase()) {
			return -1;
		} else {
			return 1;
		}
	}).appendTo("#" + id);
}

//Showing scroll to bottom button
function showScrollBottom(){
	if($("#main")[0].scrollHeight > innerHeight)
		$("#scrollbtm").show();
	else
		$("#scrollbtm").hide();
}

//Scroll to bottom
function scrollToBottom(){
	$("#main").scrollTop($("#main")[0].scrollHeight);
}