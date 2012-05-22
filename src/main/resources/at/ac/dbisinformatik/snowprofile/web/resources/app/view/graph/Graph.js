Ext.define('LWD.view.graph.Graph', {
	extend: 'Ext.form.Panel',
	alias: 'widget.graph',
	
	initComponent: function() {
		var drawComponent = Ext.create('Ext.draw.Component', 
			drawGraph()
		), surface = drawComponent.surface;
/*
		surface.add([
	        drawRectangle("70%", "99%", "15%", "1%", 1),
	        drawText("Durchm.", "65.5%", "14%", 0)
        ]);
		// Get references to my groups
		text = surface.getGroup('text');
		rectangles = surface.getGroup('rectangles');
	
		text.show(true);
		rectangles.show(true);
 */
		
		this.items = drawComponent;
		
		this.callParent(arguments);
    }
});