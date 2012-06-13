Ext.define('LWD.model.snowprofile.caaml_snowHeight', {
	extend: 'Ext.data.Model',
	fields: [
        'content',
        'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Components'
});