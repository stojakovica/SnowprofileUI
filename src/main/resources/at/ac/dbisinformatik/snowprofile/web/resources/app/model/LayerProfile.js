Ext.define('LWD.model.LayerProfile', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "depthTop_content", name:"depthTop" },
	    { name:"thickness", convert: function(v, record) {
	    	var thickness;
	    	if(Ext.isDefined(record.data.thickness)) {
	    		thickness = record.data.thickness.content;
	    	}
	    	return thickness;
	      } 
	    },
	    { mapping: "grainFormPrimary", name:"grainFormPrimary" },
	    { mapping: "grainFormSecondary", name:"grainFormSecondary" },
	    { name:"kornform", convert: function(v, record) {
	    	return record.data.grainFormPrimary+" - "+record.data.grainFormSecondary;
	      } 
	    },
	    { mapping: "grainSize_Components_avg", name:"grainSize_Components_avg" },
	    { mapping: "grainSize_Components_avgMax", name:"grainSize_Components_avgMax" },
	    { name:"groesse", convert: function(v, record) {
	    	return record.data.grainSize_Components_avg+" - "+record.data.grainSize_Components_avgMax;
	    } 
	    },
	    { mapping: "hardness", name:"hardness" },
	    { mapping: "lwc_content", name:"lwc" }
	]
});