Ext.define('LWD.model.snowprofile.caaml_validThickness', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_ThinknessPosition', name: 'caaml_ThinknessPosition', associationKey:'caaml_ThinknessPosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});