Ext.define('LWD.view.schneeprofil.schichtprofil.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schichtprofillist',
	
	store: 'schneeprofil.Schichtprofile',
	
	height: '100%',
	
    initComponent: function() {
        this.columns = [
            {header: 'Von Höhe[cm]',  dataIndex: 'vonHoehe',  flex: 1},
            {header: 'Bis Höhe[cm]', dataIndex: 'bisHoehe', flex: 1},
            {header: 'Kornform[F]', dataIndex: 'kornform', flex: 1},
            {header: 'Grösse[D][mm]', dataIndex: 'groesse', flex: 1},
            {header: 'Härte[K]', dataIndex: 'haerte', flex: 1},
            {header: 'Feuchte', dataIndex: 'feuchte', flex: 1}
        ];

        this.callParent(arguments);
    }
});