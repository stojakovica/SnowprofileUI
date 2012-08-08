Ext.define('LWD.model.LayerProfile', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "depthTop_content", name:"depthTop_content" },
	    { mapping: "hardness", name:"hardness" },
	    { name:"thickness", convert: function(v, record) {
	    	var thickness;
	    	if(Ext.isDefined(record.data.thickness)) {
	    		thickness = record.data.thickness.content;
	    	}
	    	return thickness;
	    } }
	]
});