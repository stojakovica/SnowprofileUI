function getJSON(store, pdfFlag, drawComponent)  {
	// Initialize JSONArray 
	var items = new Array();
	
	// Define standard values
	// Define components dimensions
	var tempMax = 26;
	var snowTopValue = 250;
	if(pdfFlag) {
		componentHeight = 1500;
		componentWidth = 1500;
	}
	else {
		componentWidth = drawComponent.getWidth();
		componentHeight = componentWidth / Math.sqrt(2);
		componentWidth = componentWidth - (componentWidth*0.11);
		componentHeight = componentHeight - (componentHeight*0.11);
	}
	var fontSize = Math.round(componentWidth * 0.01);
	var pdfMarginY = 0;
	var pdfMarginX = 0;
	
	var widthImage = componentWidth * 0.012;
	var heightImage = widthImage;
	var yLegendFirstRow = 2.27;
	var yLegendSecondRow = 4.8;
	var yLegendFirstRowImage = 1.55;
	var yHardnessText = 11.5;
	var yDescriptionText = 9;
	var yLegendFirstRowRec = 1;
	var yLegendSecondRowRec = 3.5;
	var yGraphMainArea = 10;
	var heightMainArea = 90;
	
	items.push(drawRectangle(componentHeight, componentWidth, (componentHeight*0.005), (componentWidth*0.005), 1, "#000000", "#ffffff", 1));
	
	return items;
}

function roundUp(num) {
	var returnNum = Math.ceil(num/100);
	return returnNum * 100;
}

function drawText(text, x, y, rotate, fill, fontSize) {
	if(rotate > 0) {
		return {
			type: 'text',
	        text: text,
	        fill: fill,
	        font: fontSize+'px Arial',
	        x: x,
	        y: y,
	        rotate: {
                degrees: 270
            },
            group: 'snowprofile'
		}
	}
	else {
		return {
			type: 'text',
			text: text,
			fill: fill,
			font: fontSize+'px Arial',
			x: x,
			y: y,
			group: 'snowprofile'
		}
	}
}

function drawPath(startx, starty, endx, endy, stroke_width, stroke, fill) {
	return {
		type: "path",
		path: "M "+startx+" "+starty+" L "+endx+" "+endy,
		"stroke-width": stroke_width,
		stroke: stroke,
		fill: fill,
		group: 'snowprofile'
    }
}

function drawRectangle(width, height, x, y, stroke_width, stroke, fill, opacity) {
	return {
		type: "rect",
		width: width,
		height: height,
		x: x,
		y: y,
		"stroke-width": stroke_width,
		stroke: stroke,
		fill: fill,
		opacity: opacity,
		group: 'snowprofile'
	}
}

function drawImage(width, height, x, y, src, pdfFlag) {
	if(pdfFlag) {
		return {
			type: 'image',
			width: width+"px",
			height: height+"px",
			x: x,
			y: y,
			src: src
		};
	}
	else {
		return Ext.create('Ext.draw.Sprite', {
			type: 'image',
			width: width,
			height: height,
			x: x,
			y: y,
			src: src,
			group: 'snowprofile'
		});
	}
}

function checkObjectDraw(object) {
	if(Object.prototype.toString.call( object ) === '[object Object]' )
		return "";
	else
		return object;
}

function showLoadingMask(loadingMessage) {
	if (Ext.isEmpty(loadingMessage))
		loadText = 'Loading... Please wait';
	else 
		loadText = loadingMessage;
	Ext.Ajax.on('beforerequest', function() {
		Ext.getBody().mask(loadText, 'loading')
	}, Ext.getBody());
	Ext.Ajax.on('requestcomplete', Ext.getBody().unmask, Ext.getBody());
	Ext.Ajax.on('requestexception', Ext.getBody().unmask, Ext.getBody());
}

function getLocationHash() {
	var hashString = location.hash;
    var nvPairs = hashString.split("#");
    var nvPair = new Array();
    for(var i=1; i<=nvPairs.length; i++) {
    	if(nvPairs[i] != null) {
    		temp = nvPairs[i].split("=");
    		nvPair.push(temp);
    	}
    }
    return nvPair
}

function checkObject(object) {
	if(Ext.isObject(object))
		return "";
	else
		return object;
}

function checkDir(object) {
	if(object == "top down")
		return "on";
	else
		return "";
}