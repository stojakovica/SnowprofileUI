Ext.define('LWD.model.snowprofile.caaml_massFraction', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Components_impurityMeasurement'
});