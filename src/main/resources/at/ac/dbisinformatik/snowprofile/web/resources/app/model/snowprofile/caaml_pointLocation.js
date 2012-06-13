Ext.define('LWD.model.snowprofile.caaml_pointLocation', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.gml_Point', name: 'gml_Point', associationKey:'gml_Point'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_ObsPoint'
});