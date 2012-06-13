Ext.define('LWD.model.snowprofile.gml_Point', {
	extend: 'Ext.data.Model',
	fields: [
       'gml_description',
       'gml_id',
       'gml_pos',
       'srsName'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_pointLocation'
});