Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
	    'Snowprofile',
	    'Schichtprofil'
	],
	models: [
        'Snowprofile',
        'snowprofile.AspectPosition',
        'snowprofile.Components',
        'snowprofile.contentUomModel',
        'snowprofile.densityLayer',
        'snowprofile.densityMeasurement',
        'snowprofile.densityProfile',
        'snowprofile.depthTop',
        'snowprofile.ElevationPosition',
        'snowprofile.grainSize',
        'snowprofile.hardnessLayer',
        'snowprofile.hardnessProfile',
        'snowprofile.hIN',
        'snowprofile.hN24',
        'snowprofile.hS',
        'snowprofile.impurityMeasurement',
        'snowprofile.locRef',
        'snowprofile.lwcProfile',
        'snowprofile.MeasurementComponents',
        'snowprofile.Measurements',
        'snowprofile.MetaData',
        'snowprofile.microPenResProfile',
        'snowprofile.Obs',
        'snowprofile.ObsPoint',
        'snowprofile.Point',
        'snowprofile.pointLocation',
        'snowprofile.ProfMetaData',
        'snowprofile.SnowProfileMeasurements',
        'snowprofile.snowProfileResultsOf',
        'snowprofile.specSurfAreaProfile',
        'snowprofile.stratLayer',
        'snowprofile.stratProfile',
        'snowprofile.tempProfile',
        'snowprofile.ThinknessPosition',
        'snowprofile.TimeInstant',
        'snowprofile.TimePeriod',
        'snowprofile.validDepositionTime',
        'snowprofile.validElevation',
        'snowprofile.validThickness',
        'snowprofile.validTime',
        'snowprofile.windDir'
	],
	
	views: [
        'snowprofile.kopf',
        'snowprofile.kopfreadonly',
        'snowprofile.schichtprofil',
        'snowprofile.schneetemperatur',
        'graph.Graph'
    ],

    init: function() {
        console.log('Snowprofile loaded!');
    }
});