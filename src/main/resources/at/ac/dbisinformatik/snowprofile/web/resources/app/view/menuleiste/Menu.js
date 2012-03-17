Ext.define('LWD.view.menuleiste.Menu' ,{
	extend: 'Ext.toolbar.Toolbar',
	alias : 'widget.menu',
	
	initComponent: function() {
		this.items = [
              {
            	  xtype:'splitbutton',
            	  text: 'Menu Button',
            	  iconCls: 'add16',
            	  menu: [{text: 'Menu Item 1'}],
            	  reorderable: false
              },
              {
            	  xtype:'splitbutton',
            	  text: 'Cut',
            	  iconCls: 'add16',
            	  menu: [{text: 'Cut Menu Item'}]
              },
              {
            	  text: 'Copy',
            	  iconCls: 'add16'
              },
              {
            	  text: 'Paste',
            	  iconCls: 'add16',
            	  menu: [{text: 'Paste Menu Item'}]
              },
              {
            	  text: 'Format',
            	  iconCls: 'add16'
              }
		];
		
		this.callParent(arguments);
	}
});