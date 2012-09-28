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
	
	tbar: [
	    {
	  	  text: 'Datei',
	  	  iconCls: 'add16',
	  	  menu: [{
	  		  text: 'Neu',
	  		  itemId: 'newData'
	  	  },{
	  		  text: 'Datei laden',
	  		  itemId: 'loadData'
	  	  },{
	  		  text: 'Datei speichern',
	  		  itemId: 'saveData'
	  	  }],
	      reorderable: false,
	    },
	    {
	    	text: 'Logout',
	    	itemId: 'logout',
	    	iconCls: 'add16',
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