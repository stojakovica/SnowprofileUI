Ext.define('LWD.model.snowprofile.caaml_validAspect', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_AspectPosition', name: 'caaml_AspectPosition', associationKey:'caaml_AspectPosition'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_ObsPoint'
});