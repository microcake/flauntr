

// img tags are clickable
$('img').live('click',function(event){
	var setid = $(this).attr('id');
	var type = $(this).attr('type');
});

/*http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)*/
$('a').live('click',function(event){
	var setid = $(this).attr('id');
	var type = $(this).attr('type');

// variables assigned to the tag-zone divs and each individual image
	var $tagZone = $( ".tag-zone" );
		$photo = $( ".scroll-content li");

// Function for when the images are added to the tag-zone
/* Source Code partially added from jQuery Photo Manager demo: 
	http://jqueryui.com/droppable/#photo-manager */
function addToZone( $item, $dest ) {
        var $list = $( "ul", $dest ).length ?
         	$( "ul", $dest ) :
			// Add the draggable photo into the destination that it's dropped into
            $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $dest );
				if($list.find('li[data-id="' + $item.data("id") + '"]').length > 0) {
					return False
				}
				// This will create a clone of the image that's being dragged
				var $clone = $item.clone();
				$clone.removeClass("ui-beingdragged")
					.appendTo( $list ).hide().fadeIn(function() {
                    $clone
						.animate( {width: "40px", height: "40px" })
						.find("div")
						.animate({ width: "40px", height: "40px" })
                        .find("img")
						.animate({ width: "40px", height: "40px" })
                });
			}

// This function will handle the tag-zones accepting photos
$(function() {
	$tagZone.droppable({
		// This will check to see if there are duplicates
		accept: function($item) {
    		return ($item.parent().hasClass("gallery") && $(this).find('li[data-id="'+$item.data("id")+'"]').length <= 0);
       	},
		// This actually handles the ability for our tag-zone to accept photos
        drop: function( event, ui ) {
        	addToZone( ui.draggable, $(this) )
		}
	});
});

alert("type alert");

if(type == "set") {
	// Delete all of the contents inside the container that WILL hold the photos
	$('.scroll-content').empty();
	// Insert an unordered list to the photo-holder container
	$('<ul class="gallery"></ul>').appendTo('.scroll-content');
	
	var url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=69ec61b6e4a407a91eb6946b224cb0e1&photoset_id="+setid+"&format=json&nojsoncallback=1";

	$.getJSON(url,function(data,status) {
	alert(data.stat);
	var pics = data.photoset.photo;
	var imgurl;
	// Generate the photos from each set
	for (var i = 0; i < pics.length; i++) {

		imgurl = "http://farm"+pics[i].farm+".staticflickr.com/"+pics[i].server+"/"+pics[i].id+"_"+pics[i].secret+".jpg";
		console.log("click"+imgurl);
		// Create a list item with an image from the set
		var target = '#' + i;
		$('<li data-id="' + i + '"><div id="'+i+'" class="scroll-content-item"><img src="'+imgurl+'" height="80" width="80"></div></li>')	
			.appendTo('.scroll-content ul').find('img').hide()
			// lets the gallery item be draggable
			/* Source Code partially added from jQuery Photo Manager demo: 
			http://jqueryui.com/droppable/#photo-manager */
			.draggable({
            	cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            	revert: "invalid", // when not dropped, the item will revert back to its initial position
            	containment: "document",
            	helper: "clone",
            	cursor: "move",
				start: function() {
					$(this).addClass("ui-being-dragged");
				},
				stop: function() {
					$(this).removeClass("ui-being-dragged"); 
				}
        	});
//		console.log($(target).on('ready',find('img')));
//		$(target).on('load'),console.log("hi"+i);

		}
return false;
	});
}

$(document).ready(function() {
	
    //get suggestive tags
	$('#gettags').click(function(event){
	$('#tag-finder ul').empty();
	var tag = $('#tag').val();
	var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=69ec61b6e4a407a91eb6946b224cb0e1&tag='+tag+'&format=json&nojsoncallback=1';
	$.getJSON(flickurl,function(data,status){
		var x = data.tags.tag;
		
		if(x.length>8){
			var limit = 10;
		}
		else
		{
			limit = x.length;
		}
		
		for (var i = 0; i < limit; i++) {
		// slice out the "tags:" portion of each tag
		$('<li></li>').html('<div class = "tagItem"> <a href="#" data-id="' + x[i]._content + '"class= "uibutton"># '+ x[i]._content +'</a></div>') 
		.appendTo('#tag-finder ul');				
		};
		
	});	

	return false;
	});	

	//get sets of a user 
	$('#getsets').click(function(event){
		$('#sets ul').empty();
	
		var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=69ec61b6e4a407a91eb6946b224cb0e1&user_id=18727743@N00&format=json&nojsoncallback=1';
		var x = $.getJSON(flickurl,function(data,status){

		var x = data.photosets.photoset;
		if(x.length>8){
			var limit = 10;
		}
		else
		{
			limit = x.length;
		}

		// http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)

		for (var i = 0; i < limit; i++) {
		//var imgurl = 'http://farm'+x[i].farm+'.staticflickr.com/'+x[i].server+'/'+x[i].id+'_'+x[i].secret';
		var imgstr = "http://farm"+x[i].farm+".staticflickr.com/"+x[i].server+"/"+x[i].primary+"_"+x[i].secret+".jpg";	
		
		$('<li></li>').html('<div class = "albumSet" id="' + x[i].title._content + '"><a><img src="'+imgstr+'" height="100" width="100" style=""></a><a href="#" id='+x[i].id+' type="set"><div id="davidbutton">'+x[i].title._content +'</div></a></div>') 
			.appendTo('#sets ul');
		};
	});	

		console.log(x);
		return false;
	});	
	
	return false;
});
	
