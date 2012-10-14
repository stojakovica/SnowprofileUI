Ext.define('LWD.model.StabilityProfile', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "depth", name:"depth" },
	    { mapping: "test", name:"test" },
	    { mapping: "belastungsstufe", name:"belastungsstufe" },
	    { mapping: "bruchart", name:"bruchart" },
	    { mapping: "bruchflaeche", name:"bruchflaeche" }
	]
});