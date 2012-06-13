Ext.define('LWD.model.snowprofile.caaml_porosity', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});