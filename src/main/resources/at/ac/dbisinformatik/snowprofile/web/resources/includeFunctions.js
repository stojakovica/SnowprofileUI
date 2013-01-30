function getJSON(store, pdfFlag, drawComponent)  {
	// Initialize JSONArray 
	var items = new Array();
	
	// Define standard values
	// Define components dimensions
	var tempMax = 26;
	var snowTopValue = 250;
	if(pdfFlag) {
		componentHeight = 1485;
		componentWidth = 1055;
		paperHeight = componentHeight - (componentHeight*0.01);
		paperWidth =  componentHeight / Math.sqrt(2);
		paperWidth = paperWidth - (paperWidth*0.01);
		xMargin = paperWidth * 0.01;
		yMargin = paperHeight * 0.01;
	}
	else {
		componentHeight = drawComponent.getHeight();
		componentWidth = drawComponent.getWidth();
		paperHeight = componentHeight - (componentHeight*0.01);
		paperWidth =  componentHeight / Math.sqrt(2);
		paperWidth = paperWidth - (paperWidth*0.01);
		xMargin = (componentWidth / 2) - (paperWidth / 2);
		yMargin = paperHeight * 0.01;
	}

	var fontSize = Math.round(paperWidth * 0.01);
	var pdfMarginY = 0;
	var pdfMarginX = 0;
	
	items.push(drawRectangle(paperWidth * 0.99, paperHeight * 0.99, xMargin, yMargin, 1, "#000000", "#ffffff", 1));
	
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