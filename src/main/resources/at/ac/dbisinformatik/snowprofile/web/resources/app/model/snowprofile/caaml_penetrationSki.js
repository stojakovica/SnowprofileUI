Ext.define('LWD.model.snowprofile.caaml_penetrationSki', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});