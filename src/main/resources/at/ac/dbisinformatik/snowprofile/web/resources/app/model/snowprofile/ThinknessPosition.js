Ext.define('LWD.model.snowprofile.ThinknessPosition', {
	extend: 'Ext.data.Model',
	fields: [
       'position',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.validThickness'
});