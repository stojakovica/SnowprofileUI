function drawRectangle(width, height, x, y, stroke_width) {
	return {
    	type: "rect",
    	width: width,
    	height: height,
    	x: x,
    	y: y,
    	"stroke-width": stroke_width,
    	stroke:"#000000",
    	fill:"#ffffff",
    	group: 'rectangles'
    }
}

function drawText(text, x, y, rotate) {
	if(rotate > 0) {
		return {
			type: 'text',
	        text: text,
	        fill: '#000',
	        font: '8px Arial',
	        x: x,
	        y: y,
	        rotate: {
                degrees: 270
            },
	        group: 'text'
		}
	}
	else {
		return {
			type: 'text',
			text: text,
			fill: '#000',
			font: '8px Arial',
			x: x,
			y: y,
			group: 'text'
		}
	}
}

function initGraph() {
	return {
		xtype: 'draw',
		viewBox: true,
		autoSize: true,
		flex: 1,
		width: "100%",
		height: "100%",
		renderTo: document.body
	}
}

function drawGraph(store, surface) {
	//var snowprofileData = store.data.items[0];
	var snowprofileData = store.data.getAt(0);
	
	// LÖSCHEN UM GRAFIK NEU ZU ZEICHNEN
	surface.removeAll();
	
	// GRUNDGERÜST ZEICHNEN
	surface.add([
		drawRectangle("70%", "99%", "15%", "1%", 1),
		drawRectangle("70%", "5%", "15%", "1%", 1),
		drawRectangle("70%", "10%", "15%", "6%", 1),
		drawRectangle("3%", "10%", "55%", "6%", 1),
		drawRectangle("3%", "84%", "55%", "16%", 1),
		drawRectangle("3%", "10%", "70%", "6%", 1),
		drawRectangle("3%", "84%", "70%", "16%", 1),
		drawRectangle("40%", "0.5", "15%", "11%", "0.25"),
		drawRectangle("0.5", "91%", "64%", "10%", "0.25"),
		drawText("+ Neuschnee", "16%", "2.3%", 0),
		drawText("< Schwimmschnee", "16%", "4.7%", 0),
		drawText("/ filzig", "29%", "2.3%", 0),
		drawText("o Schmelzform", "29%", "4.7%", 0),
		drawText("o rundkörnig", "42%", "2.3%", 0),
		drawText("> Oberflächenreif", "42%", "4.7%", 0),
		drawText("o kantig", "56%", "2.3%", 0),
		drawText("- Eislamelle", "56%", "4.7%", 0),
		drawText("o Graupel", "70%", "2.3%", 0),
		drawText("Feuchte", "70%", "11%", 270),
		drawText("Kristalle", "62.5%", "7.5%", 0),
		drawText("Form", "60%", "14%", 0),
		drawText("Durchm.", "65.5%", "14%", 0),    
		drawText("Rutschblock", "77%", "14%", 0)       
	]);
	
	// ZEICHNEN DES SCHICHTPROFILS
	//var schichtprofilData = snowprofileData.snowProfileResultsOfStore.data.items[0].SnowProfileMeasurementsStore.data.items[0].stratProfileStore.data.items[0].LayerStore.data.items;
	var schichtprofilData = snowprofileData.snowProfileResultsOf().data.getAt(0).SnowProfileMeasurements().data.getAt(0).stratProfile().data.getAt(0).Layer().data;
	var width = 0;

	// Höhenkontrollen
	/*
	for(var i=schichtprofilData.length; i>0; i--) {
		if(i < schichtprofilData.length) {
			if(schichtprofilData[i].depthTopStore.data.items[0].content + schichtprofilData[i].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].position > schichtprofilData[i-1].depthTop.data.items[0].content) {
				schichtprofilData[i-1].depthTopStore.data.items[0].content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].position = schichtprofilData[i].depthTop.data.items[0].content;
			}
		}
		if(i > 1) {
			if(schichtprofilData[i-2].depthTopStore.data.items[0].data.content + schichtprofilData[i-2].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position <= schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position) {
				schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position = schichtprofilData[i-2].depthTopStore.data.items[0].data.content + schichtprofilData[i-2].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position - 1;
			}
			if(schichtprofilData[i-2].depthTop.data.items[0].data.content < schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position) {
				schichtprofilData[i-2].depthTop.data.items[0].data.content = schichtprofilData[i-1].depthTopStore.data.items[0].data.content + schichtprofilData[i-1].validThicknessStore.data.items[0].ThinknessPositionStore.data.items[0].data.position;
			}
		}
	}
	*/
	
	var vonHoehe0 = schichtprofilData.getAt(0).depthTop().data.getAt(0).data.content;
	for(var i = 0; i < schichtprofilData.items.length; i++) {
		var vonHoehe = schichtprofilData.getAt(i).depthTop().data.getAt(0).data.content;
		var thickness = schichtprofilData.getAt(i).thickness();
		if(Ext.isObject(thickness.data.getAt(0))) {
			var bisHoehe = vonHoehe - schichtprofilData.getAt(0).thickness().data.getAt(0).data.content;
		}
		else {
    		if(Ext.isObject(schichtprofilData.getAt(i+1)))
    			var bisHoehe = schichtprofilData.getAt(i+1).depthTop().data.getAt(0).data.content;
    		else 
    			var bisHoehe = 0;
		}
		var kornform1 = schichtprofilData.getAt(i).data.grainFormPrimary;
		var kornform2 = schichtprofilData.getAt(i).data.grainFormSecondary;
		var haerte = schichtprofilData.getAt(i).data.hardness;
		var groesse = schichtprofilData.getAt(i).grainSize().data.getAt(0).Components().data.getAt(0).data.avg + "-" + schichtprofilData.getAt(i).grainSize().data.getAt(0).Components().data.getAt(0).data.avgMax;
		var feuchte = schichtprofilData.getAt(i).lwc().data.getAt(0).data.content;

		var height = (84 * (vonHoehe / vonHoehe0)) - (84 * (bisHoehe / vonHoehe0));
		var y = 100 - (84 * (vonHoehe / vonHoehe0));
		
		switch (haerte) { 
            case 'F': width = 1; break; 
            case 'F-4F': width = 2; break; 
            case '4F': width = 4; break; 
            case '4F-1F': width = 8; break; 
            case '1F': width = 12; break; 
            case '1F-P': width = 16; break; 
            case 'P': width = 20; break; 
            case 'P-K': width = 24; break; 
            case 'K': width = 28; break; 
            case 'I': width = 32; break; 
		}
		
		x = 55 - width;
		
		// Schicht
		surface.add({
	    	type: "rect",
	    	width: width+"%",
	    	height: height+"%",
	    	x: x+"%",
	    	y: y+"%",
	    	"stroke-width": 2,
	    	stroke:"#1C86EE",
	    	fill:"#1C86EE",
	    	group: 'rectangles',
	    	opacity: 0.2
	    });
		
		// Details Rechteck für Form, Durchmesser und Feuchte
		surface.add({
			type: "rect",
			width: "12%",
			height: height+"%",
			x: "58%",
			y: y+"%",
			"stroke-width": 1,
			stroke:"#000",
			fill:"#FFF",
			group: 'rectangles',
			opacity: 0.2
		});
		
		// Text zu Form
		x = "60%";
		x_circle = "60.3%";
		y = (y+(y+height))/2; 
		var text = "";
		switch (kornform1) { 
    		case 'PP': 
    			surface.add({
        			type: 'text',
        			text: "+",
        			fill: '#000',
        			font: '8px Arial',
        			x: x,
        			y: y+"%",
        			group: 'text'
        		});
    			break;
    		case 'DF':  
    			surface.add({
    				type: 'text',
    				text: "/",
    				fill: '#000',
    				font: '8px Arial',
    				x: x,
    				y: y+"%",
    				group: 'text'
    			});
    			break;
    		case 'RG': 
    			surface.add({
    				type: 'circle',
    		        radius: "0.3%",
    				fill: '#000',
    				x: x_circle,
    				y: y+"%",
    				group: 'text'
    			});
    			break;
    		case 'FC': 
    			surface.add(
    				drawRectangle("0.6%", "0.6%", x, y+"%", 1)
    			);
    			break;
    		case 'FCxr':
    			surface.add({
	    				type: 'circle',
	    				radius: "0.3%",
	    				fill: '#fff',
	    				x: x_circle,
	    				y: (y-0.15)+"%",
	    				"stroke-width": 1,
	    		    	stroke:"#000000",
	    				group: 'text'
    				},
    					drawRectangle("0.6%", "0.6%", x, y+"%", 1)
    			);
    			break;
    		case 'DH': 
    			break;
    		case 'MF':
    			surface.add({
    				type: 'circle',
    				radius: "0.3%",
    				fill: '#fff',
    				x: x_circle,
    				y: y+"%",
    				"stroke-width": 1,
    				stroke:"#000000",
    				group: 'text'
    			});
    			break;
    		case 'MFcr':
    			break;
    		case 'IF':
    			surface.add({
    		    	type: "rect",
    		    	width: "0.5%",
    		    	height: "0.3%",
    		    	x: x,
    		    	y: y,
    		    	"stroke-width": 1,
    		    	stroke:"#000000",
    		    	fill:"#000000",
    		    	group: 'rectangles'
    		    });
    			break;
    		case 'SH':
    			break;
    		case 'PPgp':
    			var spriteImg = Ext.create('Ext.draw.Sprite', {
    			      type: 'image',
    			      width: 16,
    			      height: 16,
    			      x: 500,
    			      y: 500,
    			      src: "data/img/plus.jpg",
    			      group: 'rectangles'
    	         });
    			surface.add(spriteImg);
    			break;
		}
		
		// Text zu Durchmesser
		x = "65.5%";
		
		surface.add({
			type: 'text',
			text: groesse,
			fill: '#000',
			font: '8px Arial',
			x: x,
			y: y+"%",
			group: 'text'
		});
		
		// Feuchte
		x = "71.25%";
		
		switch (feuchte) { 
            case 'D': text = "-"; break;
            case 'M': text = "|"; break;
            case 'W': text = "||"; x = "71%"; break;
            case 'V': text = "|||"; x = "70.8%"; break;
            case 'S': text = "||||"; x = "70.6%"; break;
		}
		
		
		surface.add({
			type: 'text',
			text: text,
			fill: '#000',
			font: '8px Arial',
			x: x,
			y: y+"%",
			group: 'text'
		});
	}
	
	// ZEICHNEN DER SCHNEETEMPERATUR
	var schneetemperaturData = snowprofileData.snowProfileResultsOf().data.getAt(0).SnowProfileMeasurements().data.getAt(0).tempProfile().data.getAt(0).Obs().data;
	surface.add({
		type: "path",
        path: "M -0 -0 L 100 100",
        "stroke-width":"1",
        stroke:"#F00",
        fill:"#fff",
        group: 'paths'
    });
	
	// ZEICHNEN DES MASSSTABS
	for(var j=0; j < 85; j=j+5) {
		var y = 100 - j;
		
		// links
		surface.add({
			type: "rect",
			width: "0.5%",
			height: "0.5",
			x: "15%",
			y: y+"%",
			"stroke-width": "0.25",
			stroke:"#000",
			fill:"#000",
			group: 'rectangles',
		});
		
		// rechts
		surface.add({
			type: "rect",
			width: "0.5%",
			height: "0.5",
			x: "55%",
			y: y+"%",
			"stroke-width": "0.25",
			stroke:"#000",
			fill:"#000",
			group: 'rectangles',
		});
	}
	
	text = surface.getGroup('text');
	rectangles = surface.getGroup('rectangles');
	paths = surface.getGroup('paths');
	text.show(true);
	rectangles.show(true);
	paths.show(true);
}