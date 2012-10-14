Ext.define('LWD.model.snowprofile.ExtColumnTest', {
	extend: 'Ext.data.Model',
	fields: [
	   'comment',
       'Layer_depthTop_content',
       'Layer_depthTop_uom',
       'Layer_grainFormPrimary',
       'Layer_grainFormSecondary',
       'Layer_grainSize_Components_avg',
       'Layer_grainSize_Components_avgMax',
       'Layer_grainSize_uom',
       'Layer_validFormationTime_TimeInstant_timePosition',
       'failedOn_Results_fractureCharacter',
       'failedOn_Results_releaseType',
       'failedOn_Results_testScore',
    ],
    belongsTo: 'LWD.model.snowprofile.stbTests'
});