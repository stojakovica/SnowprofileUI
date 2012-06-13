Ext.define('LWD.model.snowprofile.caaml_validElevation', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_ElevationPosition', name: 'caaml_ElevationPosition', associationKey:'caaml_ElevationPosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_ObsPoint'
});