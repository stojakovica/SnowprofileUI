Ext.define('LWD.model.snowprofile.caaml_depthTop', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});