Ext.require([
    'Ext.panel.*',
    'Ext.toolbar.*',
    'Ext.button.*',
    'Ext.container.ButtonGroup',
    'Ext.layout.container.Table'
]);

Ext.define('LWD.view.menuleiste.Menu' ,{
	extend: 'Ext.Panel',
	alias : 'widget.menuleiste',
	border: false,
	tbar: [
	    {
	    	text: 'Zurück',
	    	reorderable: false,
	    	handler: function() {
		    	// TODO: destroy Session
		    	window.location.href="/lwd/static/1.0.0.0/snowprofile.html";
		    }
	    }
	    ,"-",{
	    	text: 'PDF drucken',
	    	reorderable: false,
	    	id: 'printPDF'
	    }
	    ,"-",{
	    	text: 'XML Export',
	    	reorderable: false,
	    	handler: function() {
		    	// TODO: Export XML
		    }
	    }
	    ,"-",{
	    	text: 'XML Import',
	    	reorderable: false,
	    	handler: function() {
		    	// TODO: Export XML
		    }
	    }
	    ,"-",{
	    	text: 'Logout',
	    	itemId: 'logout',
	    	reorderable: false,
	    	handler: function() {
	    		// TODO: destroy Session
	    		window.location.href="/lwd/static/1.0.0.0/login.html";
	    	}
	    }
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});