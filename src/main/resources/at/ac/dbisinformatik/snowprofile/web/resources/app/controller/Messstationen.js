Ext.define('LWD.controller.Messstationen', {
    extend: 'Ext.app.Controller',
	stores: [
		'Messstationen'
	],
	models: [
		'Messstation'
	],
	
	views: [
        'messstationen.List'
    ],

    init: function() {
        this.control({
            'viewport > messstationen': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
            	click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var view = Ext.widget('useredit');
        
        view.down('form').loadRecord(record);
    },
    
    updateUser: function(button) {
    	var win = button.up('window'),
    		form = win.down('form'),
    		record = form.getRecord(),
    		values = form.getValues();
    		
    	record.set(values);
    	win.close();
    }
});