Ext.define('LWD.model.snowprofile.caaml_Components_densityMeasurement', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_density_densityMeasurements', name: 'caaml_density_densityMeasurements', associationKey:'caaml_density'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});