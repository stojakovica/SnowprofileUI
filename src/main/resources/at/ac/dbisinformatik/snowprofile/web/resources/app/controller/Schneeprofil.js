Ext.define('LWD.controller.Schneeprofil', {
    extend: 'Ext.app.Controller',
	stores: [
		'Schneeprofile',
		'schneeprofil.Schichtprofile'
	],
	models: [
		'Schneeprofil',
		'schneeprofil.Schichtprofil'
	],
	
	views: [
        'schneeprofil.kopf',
        'schneeprofil.schichtprofil.List',
        'schneeprofil.schichtprofil.Edit'
    ],

    init: function() {
        this.control({
            'panel > schichtprofillist': {
                itemdblclick: this.edit
            },
            'schichtprofiledit button[action=save]': {
            	click: this.update
            }
        });
        console.log('Schneeprofil loaded!');
    },

    edit: function(grid, record) {
        var view = Ext.widget('schichtprofiledit');
        console.log(grid.getXTypes());
        view.down('form').loadRecord(record);
    },
    
    update: function(button) {
    	var win = button.up('window'),
    		form = win.down('form'),
    		record = form.getRecord(),
    		values = form.getValues();
    		
    	record.set(values);
    	win.close();
    }
});