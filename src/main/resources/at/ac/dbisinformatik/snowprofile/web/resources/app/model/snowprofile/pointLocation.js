Ext.define('LWD.model.snowprofile.pointLocation', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.Point', name: 'Point', associationKey:'Point'}
    ],
    belongsTo: 'LWD.model.snowprofile.ObsPoint'
});