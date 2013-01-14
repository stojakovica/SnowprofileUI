Ext.define('LWD.view.snowprofile.snowprofilePreview' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.snowprofilepreview',
	itemId: 'snowprofilePreviewGrid',
    store: 'SnowprofilePreview',
	
	border: false,
	height: '100%',

    tbar: [{
        text: 'Neues Schneeprofil',
        handler: function(){
        	var newToken = "action=create";
            Ext.History.add(newToken);
        }
    }, "-" ,{
    	text: 'XML-Import',
    	reorderable: false,
    	id: 'importXML'
    }
    , '-', {
        itemId: 'edit',
        text: 'Bearbeiten',
        handler: function(){
	    	var grid = this.up("grid");
	        var selection = grid.getView().getSelectionModel().getSelection()[0];
	        if (selection) {
	        	var newToken = "action=edit#id="+selection.data.rid.substring(1);
	            Ext.History.add(newToken);
	        }
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        handler: function(){
        	showLoadingMask("Löschen...");
    		var grid = this.up("grid");
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection) {
            	selection.data.id = selection.data.rid.substring(1);
            	grid.getStore().remove(selection);
            }
        }
    }, "-", {
    	itemId: 'logout',
    	text: 'Logout',
    	handler: function() {
    		window.location.href="/lwd/static/1.0.0.0/login.html";
    	}
    }],
    
    listeners: {
        itemdblclick: function(view){
            var selection = view.getSelectionModel().getSelection()[0];
            if (selection) {
                var newToken = "action=edit#id="+selection.data.rid.substring(1);
                Ext.History.add(newToken);
            }
        }
    },

    columns: [
		{
			header: 'Name',
			dataIndex: 'name',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	            allowBlank: false,
	            minValue: 0
			},
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				return store.getAt(rowIndex).raw.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name;
			}
		},
		{
            header: 'Ort',
            dataIndex: 'ort',
            flex: 1,
            editor: {
                allowBlank: false
            },
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				return store.getAt(rowIndex).raw.locRef.ObsPoint.name;
			}
		},
		{
			header: 'Datum',
			dataIndex: 'datum',
			flex: 1,
			editor: {
				allowBlank: false
			},
			format: "d.m.Y",
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				date = new Date(store.getAt(rowIndex).raw.validTime.TimeInstant.timePosition);
				return date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
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