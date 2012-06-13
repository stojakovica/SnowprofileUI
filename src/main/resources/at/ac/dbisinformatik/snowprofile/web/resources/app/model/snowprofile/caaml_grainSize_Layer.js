Ext.define('LWD.model.snowprofile.caaml_grainSize_Layer', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});