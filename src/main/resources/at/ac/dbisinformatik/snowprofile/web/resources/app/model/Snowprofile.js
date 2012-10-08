Ext.define('LWD.model.Snowprofile', {
	extend: 'Ext.data.Model',
	proxy: {
        type: 'rest',
        url: '/lwd/snowprofile',
        reader: {
            type: 'json',
            root: 'SnowProfile'
        },
        writer: {
            type: 'json'
        }
    },
	fields: [
	    'id',
	    'xmlns_caaml',
	    'xmlns_gml',
	    'xmlns_xlink',
	    'xmlns_xsi',
	    'xsi_schemaLocation',
	    'rid'
	],
	associations: [
        {type: 'hasMany', model: 'LWD.model.snowprofile.locRef',    name: 'locRef', associationKey:'locRef'},
        {type: 'hasOne', model: 'LWD.model.snowprofile.snowProfileResultsOf', name: 'snowProfileResultsOf', associationKey:'snowProfileResultsOf', 
        	getterName: 'getSnowProfileData'},
        {type: 'hasMany', model: 'LWD.model.snowprofile.validTime', name: 'validTime', associationKey:'validTime'}
    ]
});