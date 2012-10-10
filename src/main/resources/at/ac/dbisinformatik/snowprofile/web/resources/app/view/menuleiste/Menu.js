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
//	    ,"-",{
//	    	text: 'Speichern',
//	    	itemId: 'saveData',
//	    	reorderable: false
//	    }
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