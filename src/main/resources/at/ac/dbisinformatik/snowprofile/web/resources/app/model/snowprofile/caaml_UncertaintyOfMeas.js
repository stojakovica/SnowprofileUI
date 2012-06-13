Ext.define('LWD.model.snowprofile.caaml_UncertaintyOfMeas', {
	extend: 'Ext.data.Model',
	fields: [
	   'content',
	   'uom'
	],
    belongsTo: 'LWD.model.snowprofile.caaml_ProfMetaData'
});