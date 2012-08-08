var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToEdit: 1
})

Ext.define('LWD.view.snowprofile.snowtemperature' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.snowtemperature',
		
    store: 'Snowtemperature',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neue Schneetemperatur',
        iconCls: 'icon-add',
        handler: function(){
    		this.store.insert(store.getCount(), new LWD.model.snowprofile.stratLayer());
            rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        iconCls: 'icon-delete',
        disabled: true,
        handler: function(){
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection) {
                store.remove(selection);
            }
        }
    }],
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1
    })],
    
    columns: [
		{
			header: 'Von Höhe[cm]',
			dataIndex: 'depth',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	             allowBlank: false,
	             minValue: 0,
	             maxValue: 700
			}
		},
		{
			header: 'Temperatur[°C]',
			dataIndex: 'snowTemp',
			flex: 1,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minValue: 0,
				maxValue: 700
			}
		}
	],
	
    initComponent: function() {
    	/*this.columns = [
			{
				header: 'Von Höhe[cm]',
				dataIndex: 'depthTop',
				flex: 1,
				editor: {
				    xtype: 'numberfield',
	                allowBlank: false,
	                minValue: 0,
	                maxValue: 700
				}
			},
			{
				header: 'Bis Höhe[cm]',
				dataIndex: 'depthTop',
				flex: 1,
				editor: {
					xtype: 'numberfield',
	                allowBlank: false,
	                minValue: 0,
	                maxValue: 700
				}
			},
			{
				header: 'Kornform[F]',
				dataIndex: 'kornform',
		        width: 130,
	            editor: new Ext.form.field.ComboBox({
	                typeAhead: true,
	                triggerAction: 'all',
	                selectOnTab: true,
	                store: [
	                    ['1-1-1','1-1-1'],
	                    ['2-2-2','2-2-2'],
	                    ['3-3-3','3-3-3'],
	                    ['4-4-4','4-4-4'],
	                    ['6-4-4','6-4-4'],
	                    ['6-6-6','6-6-6']
	                ],
	                lazyRender: true,
	                listClass: 'x-combo-list-small'
	            })
			},
			{
	            header: 'Grösse[D][mm]',
	            dataIndex: 'groesse',
	            flex: 1,
	            editor: {
	                allowBlank: false
	            }
			},
			{
				header: 'Härte[K]',
				dataIndex: 'haerte',
		        width: 130,
	            editor: new Ext.form.field.ComboBox({
	                typeAhead: true,
	                triggerAction: 'all',
	                selectOnTab: true,
	                store: [
	                    ['1','1 (FA - sehr schwach)'],
	                    ['1-2','1-2'],
	                    ['2','2 (4F - weich)'],
	                    ['2-3','2-3'],
	                    ['3','3 (1F - mittelhart)'],
	                    ['3-4','3-4'],
	                    ['4','4 (B - hart)'],
	                    ['4-5','4-5'],
	                    ['5','5 (M - sehr hart)'],
	                    ['6','6 (Eis - kompakt)']
	                ],
	                lazyRender: true,
	                listClass: 'x-combo-list-small'
	            })
			},
			{
				header: 'Feuchte',
				dataIndex: 'feuchte',
				width: 130,
				editor: new Ext.form.field.ComboBox({
					typeAhead: true,
					triggerAction: 'all',
					selectOnTab: true,
					store: [
				        ['1','(1) trocken'],
				        ['2','(2) schwach feucht'],
				        ['3','(3) feucht'],
				        ['4','(4) nass'],
				        ['5','(5) sehr nass']
	        		],
	        		lazyRender: true,
	        		listClass: 'x-combo-list-small'
				})
			}
			
        ];*/
    	
        /*this.getSelectionModel().on('selectionchange', function(selModel, selections){
        	//this.down('#delete').setDisabled(selections.length === 0);
        });*/
        
        this.callParent(arguments);
    }
});