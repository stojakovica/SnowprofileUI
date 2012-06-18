Ext.define('LWD.model.snowprofile.Point', {
	extend: 'Ext.data.Model',
	fields: [
       'description',
       'id',
       'pos',
       'srsName'
    ],
    belongsTo: 'LWD.model.snowprofile.pointLocation'
});