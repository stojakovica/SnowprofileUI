Ext.define('LWD.model.TempProfile', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "depth", name:"depth" },
	    { mapping: "snowTemp", name:"snowTemp" },
	    { name:"temp", convert: function(v, record) {
	    	return record.data.snowTemp/10;
	      } 
	    }
	]
});