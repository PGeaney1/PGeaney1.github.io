//
//Originally Created by LunaMetrics http://www.lunametrics.com @lunametrics 
//and Sayf Sharif @sayfsharif
//Modified by Daniel Alvarado to work with both Universal and Classic Analytics
//Most Comments removed, but original work credit is provided. 
//
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
var youtubeScriptNode = firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
if (youtubeScriptNode != null) {
	console.log("Tag insert successful");
}
var isApiReadyBeforeIframesLoad = false;
//key arrays
//Hold video references
var videoArray = new Array();
//Hold playere references
//Each player handles it's own callbacks. 
var playerArray = new Array();
//Event Codes for switch statement
var PLAYING = 0;
var PAUSE = 1;
var ENDED = 2;
var BUFFERING = 3;
var CUED = 4;
//Fill your own values here. 
//The Category for the event
var eventCategory = 'Video';
//The Action For Play Events
var actionPlay = 'Play';
//The Action For Pause Events
var actionPause = 'Pause';
//The Action For Ended Events 
//(Video finished playing)
var actionEnded = 'Watch to End';
//The Action For Buffering Events
var actionBuffering = 'Buffering';
//The Action For Cueing Events
var actionCueing = 'Cued';
//The Action for Mishandled events
var actionUnknown = 'Undefined Action';
//The following booleans decide whether or not 
//X event should be tracked.
//All events are tracked by default
var trackPlayEvent = true;
var trackPauseEvent = true;
var trackWatchToEndEvent = true;
var trackBufferingEvent = false;
var trackCueingEvent = false;
//Are you using Universal Analytics or Standard Analytics?
//By default I assume you are on the latest, meaning Universal. 
var useStandardAnalytics = false;
//The actual Google Analytics Tracking Snippet
function sendTrackingEvent(eventCode, videoArrayNumber) {	
	var trackingEventAction = actionUnknown;
	switch (eventCode) {
		case PLAYING:
			trackingEventAction = actionPlay;
			break;
		case PAUSE:
			trackingEventAction = actionPause;
			break;
		case ENDED:
			trackingEventAction = actionEnded;
			break;
		case BUFFERING:
			trackingEventAction = actionBuffering;
			break;
		case CUED:
			trackingEventAction = actionCueing;
			break;	
		default:
			break;
	}
	console.log('Tracking ' + trackingEventAction + ' Event');
	if (useStandardAnalytics === true) {
		//Classic Analytics (gaq.js)
		_gaq.push(['_trackEvent', eventCategory, trackingEventAction, videoArray[videoArrayNumber]]);
	}
	else {
		//Classic Analytics (analytics.js)
		ga('send', 'event', eventCategory, trackingEventAction, videoArray[videoArrayNumber]);		
	}

}
//Find all iframes within the doc
(function($) {
	function trackYouTube()
	{		
		//Keep count of amount of videos on the page
		var i = 0;
		
		jQuery('iframe').each(function() {			
			var video = $(this);
			//Does it have an 'src' attribute?
			if(video.attr('src')===undefined){
				var vidSrc = "";
				console.log('iframe has an undefined src attribute');
			}else{
				//Get the link, as we'll test it against a regex later
				var vidSrc = video.attr('src');
			}
			//Nicole did deliver this
			//Upon the comments
			//http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/
			//Use a regex to avoid tracking non-youtube vids
			var regex = /\/\/www\.youtube\.com\/embed\/([\w-]{11})(?:\?.*)?/;
			var matches = vidSrc.match(regex);			
			if(matches && matches.length > 1){
					//Store the video id on the appropriate array position
					videoArray[i] = matches[1];
					//Set the id for this item to be the same as the video id
					$(this).attr('id', matches[1]);
					//Video was added to the array, count it. 
					i++;		
					console.log('Video matches regex, addeded to tracking array');
			}			
		});	
		console.log(videoArray.length + ' YouTube videos being tracked');
		if (isApiReadyBeforeIframesLoad == true) {
			//Since the API had loaded 
			//before we could know how many videos
			//we were to track
			//create the array until now. 
			createPlayersArray();
		}
	}
	//Here's the starting point of the script. 
	$(document).ready(function() {
		//Check if page uses classic or universal analytics
		checkAnalyticsType();
		//Find all iframes with embedded YouTube videos.
		trackYouTube();
	});
})(jQuery);
function checkAnalyticsType() {
	if (typeof(ga) == 'undefined') {
		useStandardAnalytics = true;
	}
}
//YouTube callbacks. 
function onYouTubeIframeAPIReady() {
	//Fill the video player arrays
	//with new YT.Player objects per each
	//video on the videoArray
	console.log("YouTube Iframe API is ready");
	if (videoArray.length == 0) {
		//For some reason sometimes the API
		//is ready before we run trackYouTube()
		isApiReadyBeforeIframesLoad = true;
	}
	else {
		createPlayersArray();
	}
}
function createPlayersArray() {
	for (var i = 0; i < videoArray.length; i++) {
		playerArray[i] = new YT.Player(videoArray[i], {
			events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
			}
		});		
	}
}
//Unused for Analytics Tracking purposes. 
function onPlayerReady(event) {
	//event.target.playVideo();
}
//Chris Green
//upon the blog comments at
//http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/
//suggested a pause flag to prevent spammy pause events 
//when a visitor drags the slide bar on the player
var _pauseFlag = false;
//handle state changes
function onPlayerStateChange(event) { 
	console.log("Play State Changed");
	//event.target.id returns a number higher
	//than what stored on the array. 
	//Math stops the out of bounds index exception
	videoarraynum = event.target.id - 1;
	
	if (event.data ==YT.PlayerState.PLAYING){
		if (trackPlayEvent == true) {
		sendTrackingEvent(PLAYING, videoarraynum);
		}		
		_pauseFlag = false;
	} 
	if (event.data ==YT.PlayerState.ENDED){
		if (trackWatchToEndEvent == true) {
		sendTrackingEvent(ENDED, videoarraynum);
		}		
	} 	
	if (event.data ==YT.PlayerState.PAUSED && _pauseFlag == false){
		if (trackPauseEvent == true) {
		sendTrackingEvent(PAUSE, videoarraynum);	
		}		
		_pauseFlag = true;
	}
	if (event.data ==YT.PlayerState.BUFFERING){
		if (trackBufferingEvent == true) {
		sendTrackingEvent(BUFFERING, videoarraynum);	
		}		
	}	
	if (event.data ==YT.PlayerState.CUED){
		if (trackCueingEvent == true) {
		sendTrackingEvent(CUED, videoarraynum);
		}		
	} 
} 
//the end