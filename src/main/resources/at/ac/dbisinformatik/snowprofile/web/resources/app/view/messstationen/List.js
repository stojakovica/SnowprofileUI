Ext.define('LWD.view.messstationen.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.messstationen',
	
	store: 'Messstationen',
	
    title : 'Alle Messstationen',

    initComponent: function() {
        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    }
});