Ext.define('LWD.model.snowprofile.AspectPosition', {
	extend: 'Ext.data.Model',
	fields: [
       'position'
    ],
    belongsTo: 'LWD.model.snowprofile.windDir'
});