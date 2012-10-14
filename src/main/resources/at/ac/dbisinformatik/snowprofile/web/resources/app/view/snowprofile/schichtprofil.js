Ext.define('LWD.view.snowprofile.schichtprofil' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schichtprofil',
	itemId: 'schichtprofilGrid',
    store: 'Schichtprofil',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neues Schichtprofil',
        iconCls: 'icon-add',
        handler: function(){
    		var grid = this.up("grid");
    		var rowEditing = grid.getPlugin("rowplugin");
    		grid.getStore().insert(0, new LWD.model.LayerProfile());
    		rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        iconCls: 'icon-delete',
        handler: function(){
    		var grid = this.up("grid");
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection) {
            	grid.getStore().remove(selection);
            	grid.getStore().fireEvent("dataupdate", grid.getStore());
            }
        }
    }],
    plugins:[Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        pluginId:'rowplugin'
    })],
    
    columns: [
		{
			header: 'Von Höhe[cm]',
			id: 'depthTop_content',
			dataIndex: 'depthTop_content',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	            allowBlank: false,
	            minValue: 0,
			}
		},
		{
            header: 'Kornform 1',
            dataIndex: 'grainFormPrimary',
            flex: 1,
            typeAhead: true,
            field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['PP','Neuschnee'],
					['DF','filziger Schnee'],
					['RG','rundkörniger Schnee'],
					['FC','kantigförmiger Schnee'],
					['FCxr','kantig abgerundet'],
					['DH','Schwimmschnee'],
					['MF','Schmelzform'],
					['MFcr','Schneekruste'],
					['IF','Eislamelle'],
					['SH','Oberflaechenreif'],
					['PPgp','Graupel']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Kornform 2',
			dataIndex: 'grainFormSecondary',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['PP','Neuschnee'],
					['DF','filziger Schnee'],
					['RG','rundkörniger Schnee'],
					['FC','kantigförmiger Schnee'],
					['FCxr','kantig abgerundet'],
					['DH','Schwimmschnee'],
					['MF','Schmelzform'],
					['MFcr','Schneekruste'],
					['IF','Eislamelle'],
					['SH','Oberflaechenreif'],
					['PPgp','Graupel']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Grösse[D][mm] avg',
			dataIndex: 'grainSize_Components_avg',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Grösse[D][mm] avg max',
			dataIndex: 'grainSize_Components_avgMax',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Härte[K]',
			dataIndex: 'hardness',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['F','FA - sehr weich'],
					['F-4F','F-4F'],
					['4F','4F - weich'],
					['4F-1F','4F-1F'],
					['1F','1F - mittelhart'],
					['1F-P','1F-P'],
					['P','B - hart'],
					['P-K','P-K'],
					['K','M - sehr hart'],
					['I','Eis - kompakt']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Feuchte',
			dataIndex: 'lwc_content',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['D','trocken'],
					['M','schwach feucht'],
					['W','feucht'],
					['V','nass'],
					['S','sehr nass']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		}
	],
	
    initComponent: function() {
		this.on('edit', this.commit);
        this.callParent(arguments);
    },
    
    commit: function(edit, e) {
    	this.getStore().fireEvent("dataupdate", this.getStore());
    }
});