Ext.define('LWD.model.snowprofile.caaml_locRef', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_ObsPoint', name: 'caaml_ObsPoint', associationKey:'caaml_ObsPoint'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});