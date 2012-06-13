Ext.define('LWD.model.snowprofile.caaml_ObsPoint', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.gml_TimeInstant', name: 'gml_TimeInstant', associationKey:'gml_TimeInstant'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});