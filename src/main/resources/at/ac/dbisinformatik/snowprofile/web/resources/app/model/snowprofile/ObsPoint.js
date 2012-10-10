Ext.define('LWD.model.snowprofile.ObsPoint', {
	extend: 'Ext.data.Model',
	fields: [
        'description',
        'incline',
        'name',
        'obsPointSubType',
        'gml_id'
    ],
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.pointLocation',    name: 'pointLocation', associationKey:'pointLocation'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.validAspect', name: 'validAspect', associationKey:'validAspect'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.validElevation', name: 'validElevation', associationKey:'validElevation'}
    ],
    belongsTo: 'LWD.model.snowprofile.locRef'
});