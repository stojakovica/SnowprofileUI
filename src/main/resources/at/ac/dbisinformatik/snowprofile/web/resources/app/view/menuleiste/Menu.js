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
	  		  text: 'Datei laden',
	  		  itemId: 'dataLoad'
	  	  },
	  	  {
	  		  text: 'Datei speichern',
	  		  itemId: 'dataSave'
	  	  }],
	      reorderable: false,
	    },
	    {
	  	  text: 'Optionen',
	  	  iconCls: 'add16',
	  	  menu: [{text: 'Eigenschaften'}],
		  reorderable: false
	    },
	    {
	    	text: 'Login',
	    	iconCls: 'add16',
	    	reorderable: false
	    }
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});