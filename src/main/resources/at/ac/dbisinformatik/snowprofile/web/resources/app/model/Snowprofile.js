Ext.define('LWD.model.Snowprofile', {
	extend: 'Ext.data.Model',
	fields: [
	    'id',
	    'xmlns_caaml',
	    'xmlns_gml',
	    'xmlns_xlink',
	    'xmlns_xsi',
	    'xsi_schemaLocation'
	],
	associations: [
        {type: 'hasMany', model: 'LWD.model.snowprofile.locRef',    name: 'locRef', associationKey:'locRef'},
        {type: 'hasMany', model: 'LWD.model.snowprofile.snowProfileResultsOf', name: 'snowProfileResultsOf', associationKey:'snowProfileResultsOf'},
        {type: 'hasMany', model: 'LWD.model.snowprofile.validTime', name: 'validTime', associationKey:'validTime'}
    ]
});