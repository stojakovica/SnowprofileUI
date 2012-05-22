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
	  	  text: 'Login',
	  	  iconCls: 'add16',
	  	  reorderable: false
	    },
	    {
	  	  text: 'Bearbeiten',
	  	  iconCls: 'add16',
	  	  menu: [{text: 'Datei laden'},{text: 'Datei speichern'}],
	      reorderable: false
	    },
	    {
	  	  text: 'Optionen',
	  	  iconCls: 'add16',
	  	  menu: [{text: 'Eigenschaften'}],
		  reorderable: false
	    }
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});