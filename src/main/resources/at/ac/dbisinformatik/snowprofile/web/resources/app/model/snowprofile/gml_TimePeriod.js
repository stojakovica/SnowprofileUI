Ext.define('LWD.model.snowprofile.gml_TimePeriod', {
	extend: 'Ext.data.Model',
	fields: [
       'gml_beginPosition',
       'gml_endPosition',
       'gml_id'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_validDepositionTime'
});