Ext.define('LWD.view.regionen.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.regionen',
	
	store: 'Regionen',
	
    title : 'Alle Regionen',

    initComponent: function() {
        this.columns = [
            {header: 'Reg.',  dataIndex: 'region',  flex: 1},
            {header: 'Profilort', dataIndex: 'profilort', flex: 1},
            {header: 'Datum', dataIndex: 'datum', flex: 1},
            {header: 'Seeh&ouml;he', dataIndex: 'seehoehe', flex: 1},
            {header: 'Exp.', dataIndex: 'exposition', flex: 1},
            {header: 'Typ', dataIndex: 'typ', flex: 1}
        ];

        this.callParent(arguments);
    }
});