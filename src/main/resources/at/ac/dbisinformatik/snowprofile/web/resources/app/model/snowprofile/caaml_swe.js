Ext.define('LWD.model.snowprofile.caaml_swe', {
	extend: 'Ext.data.Model',
	fields: [
        'content',
        'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Components'
});