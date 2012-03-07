Ext.define('LWD.view.regionen.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.regionen',
	
	store: 'Regionen',
	
    title : 'Alle Regionen',

    initComponent: function() {
        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    }
});