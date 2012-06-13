Ext.define('LWD.model.snowprofile.caaml_density', {
	extend: 'Ext.data.Model',
	fields: [
        'content',
        'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_MeasurementComponents'
});