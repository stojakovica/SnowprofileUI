Ext.define('LWD.model.snowprofile.caaml_Tortuosity', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});