Ext.define('LWD.model.snowprofile.stratLayer', {
	extend: 'Ext.data.Model',
	fields: [
       'depthTop_content',
	   'grainFormPrimary',
	   'grainFormSecondary',
	   'grainSize_Components_avg',
	   'grainSize_Components_avgMax',
	   'hardness',
	   'lwc_content'
	],
    belongsTo: 'LWD.model.snowprofile.stratProfile'
});