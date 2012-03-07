Ext.define('LWD.controller.Users', {
    extend: 'Ext.app.Controller',
	stores: [
		'Users'
	],
	models: [
		'User'
	],
	
	views: [
        'user.List',
        'user.Edit'
    ],

    init: function() {
        this.control({
            'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
            	click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
    	console.log('test');
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