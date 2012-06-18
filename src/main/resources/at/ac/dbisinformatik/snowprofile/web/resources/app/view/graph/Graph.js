var drawComponent = Ext.create('Ext.draw.Component', 
	drawGraph()
), surface = drawComponent.surface;

Ext.define('LWD.view.graph.Graph', {
	extend: 'Ext.form.Panel',
	alias: 'widget.graph',
	
	store: 'Users',
	
	initComponent: function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');
		
		//store.on('load', this.refresh, this);
		//store.on('update', this.refresh, this);
		
		this.items = drawComponent;
		
		this.callParent(arguments);
    },
    
    refresh: function(store) {
    	var snowprofileData = store.proxy.reader.jsonData;
    	console.log(store);
    	
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
    	var schichtprofilData = snowprofileData.caaml_SnowProfile.caaml_snowProfileResultsOf.caaml_SnowProfileMeasurements.caaml_layerProfile.caaml_Layer;
    	var width = 0;

    	// Höhenkontrollen
    	for(var i=schichtprofilData.length; i>0; i--) {
			if(i < schichtprofilData.length) {
    			if(schichtprofilData[i].vonHoehe > schichtprofilData[i-1].bisHoehe) {
    				schichtprofilData[i-1].vonHoehe = schichtprofilData[i].bisHoehe;
    			}
    		}
    		if(i > 1) {
    			if(schichtprofilData[i-2].vonHoehe <= schichtprofilData[i-1].vonHoehe) {
    				schichtprofilData[i-1].vonHoehe = schichtprofilData[i-2].vonHoehe - 1;
    			}
    			if(schichtprofilData[i-2].bisHoehe < schichtprofilData[i-1].vonHoehe) {
    				schichtprofilData[i-2].bisHoehe = schichtprofilData[i-1].vonHoehe;
    			}
    		}
    	}
    	for(var i = schichtprofilData.length; i > 0; i--) {
    		var height = (84 * (schichtprofilData[i-1].vonHoehe / schichtprofilData[0].vonHoehe)) - (84 * (schichtprofilData[i-1].bisHoehe / schichtprofilData[0].vonHoehe));
    		var y = 100 - (84 * (schichtprofilData[i-1].vonHoehe / schichtprofilData[0].vonHoehe));
    		
    		if(Ext.isArray(schichtprofilData[i-1].haerte)) {
    			var haerte = schichtprofilData[i-1].haerte[0];
    		}
    		else {
    			var haerte = schichtprofilData[i-1].haerte;
    		}
    		switch (haerte) { 
	            case '1': width = 1; break; 
	            case '1-2': width = 2; break; 
	            case '2': width = 4; break; 
	            case '2-3': width = 8; break; 
	            case '3': width = 12; break; 
	            case '3-4': width = 16; break; 
	            case '4': width = 20; break; 
	            case '4-5': width = 24; break; 
	            case '5': width = 28; break; 
	            case '6': width = 32; break; 
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
    		var text = "";
    		if(Ext.isArray(schichtprofilData[i-1].kornform)) {
    			var kornform = schichtprofilData[i-1].kornform[0];
    		}
    		else {
    			var kornform = schichtprofilData[i-1].kornform;
    		}
    		switch (kornform) { 
	            case '1-1-1': text = "+ + +"; y = (y+(y+height))/2; break;
	            case '2-2-2': text = "/ / /"; y = (y+(y+height))/2; break;  
	            case '3-3-3': text = "o o o"; y = (y+(y+height))/2; break;  
	            case '4-4-4': text = "[] [] []"; y = (y+(y+height))/2; break;  
	            case '6-4-4': text = "o [] []"; y = (y+(y+height))/2; break;  
	            case '6-6-6': text = "* * *"; y = (y+(y+height))/2; break;  
			}
    		
    		x = "60%";
    		
    		surface.add({
    			type: 'text',
    			text: text,
    			fill: '#000',
    			font: '8px Arial',
    			x: x,
    			y: y+"%",
    			group: 'text'
    		});
    		
    		// Text zu Durchmesser
    		if(Ext.isArray(schichtprofilData[i-1].groesse)) {
    			var groesse = schichtprofilData[i-1].groesse[0];
    		}
    		else {
    			var groesse = schichtprofilData[i-1].groesse;
    		}
    		
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
    		if(Ext.isArray(schichtprofilData[i-1].feuchte)) {
    			var feuchte = schichtprofilData[i-1].feuchte[0];
    		}
    		else {
    			var feuchte = schichtprofilData[i-1].feuchte;
    		}
    		
    		x = "71.25%";
    		
    		switch (feuchte) { 
	            case '1': text = "-"; break;
	            case '2': text = "|"; break;
	            case '3': text = "||"; x = "71%"; break;
	            case '4': text = "|||"; x = "70.8%"; break;
	            case '5': text = "||||"; x = "70.6%"; break;
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
    	var schneetemperaturData = snowprofileData.schneetemperatur;
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
});