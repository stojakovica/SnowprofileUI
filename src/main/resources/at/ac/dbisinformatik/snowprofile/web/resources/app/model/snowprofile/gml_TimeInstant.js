Ext.define('LWD.model.snowprofile.gml_Point', {
	extend: 'Ext.data.Model',
	fields: [
       'gml_id',
       'gml_timePosition'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_validTime'
});