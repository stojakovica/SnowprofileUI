Ext.define('LWD.model.snowprofile.validAspect', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.AspectPosition', name: 'AspectPosition', associationKey:'AspectPosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.ObsPoint'
});