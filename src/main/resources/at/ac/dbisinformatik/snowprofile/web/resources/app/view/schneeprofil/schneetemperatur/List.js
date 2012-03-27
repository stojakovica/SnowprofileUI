Ext.define('LWD.view.schneeprofil.schneetemperatur.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schneetemperaturlist',
	
	store: 'schneeprofil.Schneetemperatur',
	
	height: '100%',
	
	features: [{
        ftype: 'grouping'
    }],
	
    initComponent: function() {
        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Sport', dataIndex: 'sport', flex: 1}
        ];

        this.callParent(arguments);
    }
});