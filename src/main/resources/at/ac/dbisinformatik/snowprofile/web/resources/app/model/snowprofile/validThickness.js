Ext.define('LWD.model.snowprofile.validThickness', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.ThinknessPosition', name: 'ThinknessPosition', associationKey:'ThinknessPosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.Layer'
});