Ext.define('LWD.model.snowprofile.caaml_penetrationRam', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});