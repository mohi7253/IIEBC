function setConfigProperties() {

	//BING MAPS KEY
    bingMapsKeyCode = 'yourBingKeyCode';
	
	//INITIAL EXTENT AND SPATIAL REFERENCE
	customExtentAndSR=new esri.geometry.Extent(3774872.3832, -521229.627799999, 4664900.0361, 603594.547600001,new esri.SpatialReference({wkid:102100}));
	
	//MAP SERVICES
	//County boundary
	bottomURL = "http://<yourserver>/ArcGIS/rest/services/CountyBoundary/MapServer";
	
	//Election results
	serviceURL1 = "http://<yourserver>/ArcGIS/rest/services/ElectionResults/MapServer";
	
	//Building footprints
	middleURL = "http://<yourserver>/ArcGIS/rest/services/BuildingFootprints/MapServer";
	
	//Reference overlay
	topURL = "http://<yourserver>/ArcGIS/rest/services/ReferenceOverlay/MapServer";


	//FIND SERVICE AND LAYER ID (SEARCH BOX)
	//Find service
	findLayer=new esri.tasks.FindTask("http://10.20.1.55/ArcGIS/rest/services/Boundaries/Boundaries/MapServer");
	//Find layer ID
	findLayerID=0;
	//alert("niko hapa");
	
	
	//QUERY SERVICE AND LAYER IDS (POPUP)
	//Query service
	queryURL="http://10.20.1.55/ArcGIS/rest/services/Boundaries/Boundaries/MapServer/";
	
	//Query layer IDs
	//Presidential
	queryLayer1=queryURL+0;
	
}


//SPLASH SCREEN
//Edit this section to change the text that appears in the splash screen as well as the dimensions/position of the box
//function startSplashScreen() {
	//dojo.byId('splashScreen').style.width='400px';
	//dojo.byId('splashScreen').style.height='200px';
	//dojo.byId('splashScreen').style.margin='-100px 0px 0px -200px';
	//dojo.byId('splashTitle').innerHTML="IEBC Preliminary Boundary Report Viewer ";
	//dojo.byId('splashContent').innerHTML='Please select the political contest you are interested in. Then, search for a precinct or click on the map to see a summary of election results for a given precinct.';
//}


//OPTIONAL: Edit this section if you use a different type of map service than the default types (modify "Tiled"/"Dynamic")
function addLayers() {
		//alert("niko hapa");
        // countyLayer = new esri.layers.ArcGISTiledMapServiceLayer(bottomURL, {id: "countyLayer"});
        // map.addLayer(countyLayer);

        // resultsLayer = new esri.layers.ArcGISDynamicMapServiceLayer(serviceURL1, {"imageParameters":imageParameters, id: "resultsLayer"});
        // map.addLayer(resultsLayer);

        // buildingsLayer = new esri.layers.ArcGISTiledMapServiceLayer(middleURL, {id: "buildingsLayer", opacity:0.15});
        // map.addLayer(buildingsLayer);
		
        // referenceLayer = new esri.layers.ArcGISTiledMapServiceLayer(topURL, {id: "referenceLayer"});
        // map.addLayer(referenceLayer);
}