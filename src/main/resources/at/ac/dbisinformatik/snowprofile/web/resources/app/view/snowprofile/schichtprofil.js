Ext.define('LWD.view.snowprofile.schichtprofil' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schichtprofil',
	itemId: 'schichtprofilGrid',
    store: 'Schichtprofil',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neue Schicht',
        handler: function(){
    		var grid = this.up("grid");
    		var rowEditing = grid.getPlugin("rowplugin");
    		grid.getStore().insert(0, new LWD.model.LayerProfile());
    		rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
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
	            minValue: 0
			}
		},
		{
			header: 'Feuchte',
			dataIndex: 'lwc_content',
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				switch(value) {
					case "D":
						return "trocken";
						break;
					case "M":
						return "schwach feucht";
						break;
					case "W":
						return "feucht";
						break;
					case "V":
						return "nass";
						break;
					case "S":
						return "sehr nass";
						break;
				}
			},
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
		},
		{
            header: 'Kornform 1',
            sortable: false,
            dataIndex: 'grainFormPrimary',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				switch(value) {
					case "PP":
						return "Neuschnee";
						break;
					case "DF":
						return "filziger Schnee";
						break;
					case "RG":
						return "rundkörniger Schnee";
						break;
					case "FC":
						return "kantigförmiger Schnee";
						break;
					case "FCxr":
						return "kantig abgerundet";
						break;
					case "DH":
						return "Schwimmschnee";
						break;
					case "MF":
						return "Schmelzform";
						break;
					case "MFcr":
						return "Schneekruste";
						break;
					case "IF":
						return "Eislamelle";
						break;
					case "SH":
						return "Oberflächenreif";
						break;
					case "PPgp":
						return "Graupel";
						break;
				}
			},
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
					['SH','Oberflächenreif'],
					['PPgp','Graupel']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Kornform 2',
			dataIndex: 'grainFormSecondary',
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				switch(value) {
					case "PP":
						return "Neuschnee";
						break;
					case "DF":
						return "filziger Schnee";
						break;
					case "RG":
						return "rundkörniger Schnee";
						break;
					case "FC":
						return "kantigförmiger Schnee";
						break;
					case "FCxr":
						return "kantig abgerundet";
						break;
					case "DH":
						return "Schwimmschnee";
						break;
					case "MF":
						return "Schmelzform";
						break;
					case "MFcr":
						return "Schneekruste";
						break;
					case "IF":
						return "Eislamelle";
						break;
					case "SH":
						return "Oberflächenreif";
						break;
					case "PPgp":
						return "Graupel";
						break;
				}
			},
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
					['SH','Oberflächenreif'],
					['PPgp','Graupel']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Größe[D][mm] avg',
			dataIndex: 'grainSize_Components_avg',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Größe[D][mm] avg max',
			dataIndex: 'grainSize_Components_avgMax',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Härte[K]',
			dataIndex: 'hardness',
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				switch(value) {
					case "F":
						return "FA - sehr weich";
						break;
					case "F-4F":
						return "F-4F";
						break;
					case "4F":
						return "4F - weich";
						break;
					case "4F-1F":
						return "4F-1F";
						break;
					case "1F":
						return "1F - mittelhart";
						break;
					case "1F-P":
						return "1F-P";
						break;
					case "P":
						return "B - hart";
						break;
					case "P-K":
						return "P-K";
						break;
					case "K":
						return "M - sehr hart";
						break;
					case "I":
						return "Eis - kompakt";
						break;
				}
			},
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