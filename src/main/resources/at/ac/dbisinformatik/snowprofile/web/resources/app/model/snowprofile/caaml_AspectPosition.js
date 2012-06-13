Ext.define('LWD.model.snowprofile.caaml_AspectPosition', {
	extend: 'Ext.data.Model',
	fields: [
       'caaml_position'
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_validAspect'
});