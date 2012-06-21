Ext.define('LWD.model.snowprofile.densityLayer', {
	extend: 'Ext.data.Model',
	fields: [
        'density',
        'depthTop',
        'thickness'
    ],
    belongsTo: 'LWD.model.snowprofile.densityProfile'
});