Ext.define('LWD.model.StabilityProfile', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "depthTop_content", name:"depthTop_content" },
	    { mapping: "grainFormPrimary", name:"grainFormPrimary" },
	    { mapping: "grainFormSecondary", name:"grainFormSecondary" },
	    { mapping: "grainSize_Components_avg", name:"grainSize_Components_avg" },
	    { mapping: "grainSize_Components_avgMax", name:"grainSize_Components_avgMax" },
	    { mapping: "hardness", name:"hardness" },
	    { mapping: "lwc_content", name:"lwc_content" }
	]
});