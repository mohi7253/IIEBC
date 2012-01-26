function clearFind() {        
	var emptyData = {
	identifier: "objectid",  //This field needs to have unique values
	label: "objectid", //Name field for display. Not pertinent to a grid but may be used elsewhere.
	items: []
	};
	var clearStore = new dojo.data.ItemFileReadStore({ data:emptyData });
	grid.setStore(clearStore);
	map.graphics.clear();
	map.infoWindow.hide();
		if (foundGraphic==1) {
			findGraphics.clear();
			foundGraphic=0;
			}
		if (highlightedGraphic==1) {
			highlightedGraphics.clear();
			highlightedGraphic=0;
			}
	dojo.byId("findField").value="";
		if (panelToggled==1) {
		toggleFindBox();
		}
	map.setExtent(customExtentAndSR);	
	
}

function toggleFindBox() {
	if (panelToggled==1) {
		document.getElementById('findTable').style.visibility='hidden';
		panelToggled=0;
	}
	else if (panelToggled==0) {
		document.getElementById('findTable').style.visibility='visible';
		panelToggled=1;
	}
}

function changeMap(theme, layerId) {
	layerName=layerId;
	dojo.byId("selectedMap").innerHTML = layerName;

	//map.infoWindow.hide();
	resultsLayer.setVisibleLayers([theme]);

	mapTheme=layerId;
	setupQuery();
	
	if (mapTheme=="Voter Turnout"){
		dojo.byId("legendBox").innerHTML = "<img src='appFiles/graphics/ballot.gif'>";
	}
	else {
	dojo.byId("legendBox").innerHTML = "<img src='appFiles/graphics/Winning.gif'>";
	}
	
	if (eventListenerType==1) {
	featureQuery(eventListener);
	}
	else if (eventListenerType==2) {
	onRowClickHandler(eventListener);	
	}
	else if (eventListenerType==3) {
	executeQueryTask(eventListener);	
	}
}

function findAddress() {
	map.infoWindow.hide();
	if (foundGraphic==1) {
		findGraphics.clear();
		foundGraphic=0;
	}
	var query = dojo.byId("findField").value;
	veGeocoder.addressToLocations(query);
}


function findConst() {
	map.infoWindow.hide();
	
	basicStandby1.show();
	
	fielded = "CONSTITUENCIES";

	if (foundGraphic==1) {
		findGraphics.clear();
		foundGraphic=0;
	}
	var queryStr = (dojo.byId("findField").value);
	
	var queryStrSpl = (dojo.byId("findField").value).split(" ");
	var space = " ";
	
	if (queryStrSpl[1]!=null && queryStrSpl[1].length==1) {
	  for (var i=0, il=10; i<il; i++) {
		  if (queryStrSpl[1].match(i)) {
			  var query = queryStrSpl[1].replace(i, "0"+i);
			  var query = queryStrSpl[0].concat(space, query);
		  }
	  }
	}
	else { var query=queryStr }
	
	if(query == null || query == "" || query == " ")
	{
		alert("Kindly fill in the constituency you wish to search for!");
		basicStandby1.hide();
		map.setExtent(customExtentAndSR);
		clearFind();
	}
	else
	{
		findParams2.searchText = query;
		findTask.execute(findParams2,findResults);
		if (highlightedGraphic==1) {
			highlightedGraphics.clear();
			highlightedGraphic=0;
		}
	}
	
	
}

function watermark(inputId,text){
	var inputBox = document.getElementById(inputId);
	if(inputBox.value.length > 0){
		if(inputBox.value == text)
			inputBox.value = '';
			}
		else
		{
			inputBox.value = text;
		}
}

function findVariable() {
	var pangash = (document.getElementById('droplist').value);
	if(pangash == "Ward")
	{
		alert("Ward data not present!");
		basicStandby1.hide();
	}
	else if(pangash == "Constituency")
	{
		findConst();
	}
	else if(pangash == "County")
	{
		findCounst();
	}
	else
	{
		alert("Please select an area of interest which yo wish to search!");
		basicStandby1.hide();
	}
}

function findCounst() {
	//ShowLoadingMessage(dojo.byId("map"));
	map.infoWindow.hide();
	
	basicStandby1.show();
	
	fielded = "COUNTIES";
	
	if (foundGraphic==1) {
		findGraphics.clear();
		foundGraphic=0;
	}
	var queryStr = (dojo.byId("findField").value);
	var queryStrSpl = (dojo.byId("findField").value).split(" ");
	var space = " ";
	
	
	
	if (queryStrSpl[1]!=null && queryStrSpl[1].length==1) {
	  for (var i=0, il=10; i<il; i++) {
		  if (queryStrSpl[1].match(i)) {
			  var query = queryStrSpl[1].replace(i, "0"+i);
			  var query = queryStrSpl[0].concat(space, query);
		  }
	  }
	}
	else { var query=queryStr }
	
	if(query == null || query == "" || query == " ")
	{
		alert("Kindly fill in the County you wish to search for!");
		basicStandby1.hide();
		map.setExtent(customExtentAndSR);
		clearFind();
		return;
		
	}
	
	findParams3.searchText = query;
	findTask.execute(findParams3,findResults);
	if (highlightedGraphic==1) {
		highlightedGraphics.clear();
		highlightedGraphic=0;
	}
	
	HideLoadingMessage();
}


function findPrecinct() {
	//ShowLoadingMessage(dojo.byId("map"));
	map.infoWindow.hide();
	basicStandby1.show();
	fielded = "WARDS";

	if (foundGraphic==1) {
		findGraphics.clear();
		foundGraphic=0;
	}
	var queryStr = (dojo.byId("findField").value);
	var queryStrSpl = (dojo.byId("findField").value).split(" ");
	var space = " ";
	
	if (queryStrSpl[1]!=null && queryStrSpl[1].length==1) {
	  for (var i=0, il=10; i<il; i++) {
		  if (queryStrSpl[1].match(i)) {
			  var query = queryStrSpl[1].replace(i, "0"+i);
			  var query = queryStrSpl[0].concat(space, query);
		  }
	  }
	}
	else { var query=queryStr }
	
	findParams.searchText = query;
	findTask.execute(findParams,findResults);
	if (highlightedGraphic==1) {
		highlightedGraphics.clear();
		highlightedGraphic=0;
	}
	
	//HideLoadingMessage();
}


function closeIntro() {
		dojo.byId('splashScreen').style.visibility='hidden';
}


// number formatting function
// copyright Stephen Chapman 24th March 2006, 22nd August 2008
// permission to use this function is granted provided
// that this copyright notice is retained intact
function formatNumber(num,dec,thou,pnt,curr1,curr2,n1,n2) {var x = Math.round(num * Math.pow(10,dec));if (x >= 0) n1=n2='';var y = (''+Math.abs(x)).split('');var z = y.length - dec; if (z<0) z--; for(var i = z; i < 0; i++) y.unshift('0'); if (z<0) z = 1; y.splice(z, 0, pnt); if(y[0] == pnt) y.unshift('0'); while (z > 3) {z-=3; y.splice(z,0,thou);}var r = curr1+n1+y.join('')+n2+curr2;return r;}


//Do not edit below - contains configuration for the "Select Political Contest" button

var DDSPEED = 10;
var DDTIMER = 15;

// main function to handle the mouse events //
function ddMenu(id,d){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearInterval(c.timer);
  if(d == 1){
    clearTimeout(h.timer);
    if(c.maxh && c.maxh <= c.offsetHeight){return}
    else if(!c.maxh){
      c.style.top = '-' + c.offsetHeight + 'px';
      c.style.display = 'block';
      c.style.height = 'auto';
      c.maxh = c.offsetHeight;
      c.style.height = '0px';
    }
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }else{
    h.timer = setTimeout(function(){ddCollapse(c)},50);
  }
}

// collapse the menu //
function ddCollapse(c){
  c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}

// cancel the collapse if a user rolls over the dropdown cent //
function cancelHide(id){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearTimeout(h.timer);
  clearInterval(c.timer);
  if(c.offsetHeight < c.maxh){
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }
}

// incrementally expand/contract the dropdown and change the opacity //
function ddSlide(c,d){
  var currh = c.offsetHeight;
  var dist;
  if(d == 1){
    dist = (Math.round((c.maxh - currh) / DDSPEED));
  }else{
    dist = (Math.round(currh / DDSPEED));
  }
  if(dist <= 1 && d == 1){
    dist = 1;
  }
  c.style.top = parseInt(c.style.top.replace('px','')) - parseInt(dist * d) + 'px';
  c.style.height = currh + (dist * d) + 'px';
  c.style.opacity = currh / c.maxh;
  c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
  if((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)){
    clearInterval(c.timer);
  }
}