$(document).ready(function() {
    hideTabs();
    $("#play-now").show();
    $("#b1").click(function(){
    	hideTabs();
    	$("#play-now").show();
    });
    $("#b2").click(function(){
    	hideTabs();
    	$("#how-to-play").show();
    });
    $("#b3").click(function(){
    	hideTabs();
    	$("#leaderboard-section").show();
		$.get("mostleader.json", function(data){
			var html = "<tr><th>Position</th><th>Name</th><th>Wins</th></tr>";
			$.each(data, function(index, val){
				html+="<tr class ='info'><td>"+(index+1)+"</td><td>"+val.name+"</td><td>"+val.wins+"</td></tr>";
			});
			$("#most-leader-table").html(html);
		});$.get("longestleader.json", function(data){
			var html = "<tr><th>Position</th><th>Name</th><th>Wins</th></tr>";
			$.each(data, function(index, val){
				html+="<tr class ='success'><td>"+(index+1)+"</td><td>"+val.name+"</td><td>"+val.wins+"</td></tr>";
			});
			$("#longest-leader-table").html(html);
		});

    });
});


function hideTabs(){
	$("#play-now").hide();
	$("#how-to-play").hide();
	$("#leaderboard-section").hide();
}


