chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var srv = details.responseHeaders.filter(function(header){
		return header.name === 'Server-Name';
	}).map(function(header){
		return header.value;
	}).shift();

	if(srv) {		
		var badge = srv.toLowerCase().replace('srv', '');
		if(badge === 'drum') badge = 'd';

		chrome.browserAction.setIcon({path: 'icon.png'});
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 255]});
		chrome.browserAction.setBadgeText({text:badge});
		chrome.browserAction.setTitle({title:srv});
	}
},
{
	urls: [
		"*://rabota.ua/*",
		"*://*.rabota.ua/*",
		"*://rabota.com.ua/*",
		"*://*.rabota.com.ua/*"
	],
	types: ["main_frame"]
}, ["responseHeaders"]);



chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.browserAction.setIcon({path: 'disabled.png'});
	chrome.browserAction.setBadgeText({text: ''});
	chrome.browserAction.setTitle({title: 'Only for rabota.ua'});
});