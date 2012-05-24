var drawComponent = Ext.create('Ext.draw.Component', 
	drawGraph()
), surface = drawComponent.surface;

Ext.define('LWD.view.graph.Graph', {
	extend: 'Ext.form.Panel',
	alias: 'widget.graph',
	
	store: 'schneeprofil.Schichtprofile',
	
	initComponent: function() {
		var store = Ext.data.StoreManager.lookup('schneeprofil.Schichtprofile');
		
		store.on('load', this.refresh, this);
		store.on('update', this.refresh, this);
		
		this.items = drawComponent;
		
		this.callParent(arguments);
    },
    
    refresh: function(store) {
    	surface.removeAll();
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
			drawText("Durchm.", "65.5%", "14%", 0)       
    	]);
    	var schichtprofilData = Ext.pluck(store.data.items, 'data');
    	console.log(schichtprofilData);
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
    	}
    	
    	text = surface.getGroup('text');
    	rectangles = surface.getGroup('rectangles');
    	text.show(true);
    	rectangles.show(true);
    }
});