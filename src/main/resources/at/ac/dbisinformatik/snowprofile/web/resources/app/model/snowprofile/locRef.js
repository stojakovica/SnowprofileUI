Ext.define('LWD.model.snowprofile.locRef', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.ObsPoint', name: 'ObsPoint', associationKey:'ObsPoint'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});