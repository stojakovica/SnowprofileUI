Ext.define('LWD.model.snowprofile.pointLocation', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.Point', name: 'gml_Point', associationKey:'gml_Point', getterName: 'getPoint'}
    ],
    belongsTo: 'LWD.model.snowprofile.ObsPoint'
});