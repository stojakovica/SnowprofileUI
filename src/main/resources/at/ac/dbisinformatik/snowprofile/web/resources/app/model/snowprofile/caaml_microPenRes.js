Ext.define('LWD.model.snowprofile.caaml_microPenRes', {
	extend: 'Ext.data.Model',
	fields: [
       'caaml_position',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_MeasurementComponents'
});