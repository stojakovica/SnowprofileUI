Ext.define('LWD.model.snowprofile.caaml_ObsPoint', {
	extend: 'Ext.data.Model',
	fields: [
        'caaml_description',
        'caaml_incline',
        'caaml_name',
        'caaml_obsPointSubType',
        'gml_id'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_pointLocation',    name: 'caaml_pointLocation', associationKey:'caaml_pointLocation'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_validAspect', name: 'caaml_validAspect', associationKey:'caaml_validAspect'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_validElevation', name: 'caaml_validElevation', associationKey:'caaml_validElevation'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_locRef'
});