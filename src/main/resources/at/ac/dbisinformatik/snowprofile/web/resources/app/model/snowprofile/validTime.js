Ext.define('LWD.model.snowprofile.validTime', {
	extend: 'Ext.data.Model',
    fields: ['id', 'timePosition'],
    
    belongsTo: 'LWD.model.Snowprofile'
});