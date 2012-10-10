Ext.define('LWD.model.Metadata', {
	extend: 'Ext.data.Model',
	fields: [
	    { mapping: "name", name:"name" },
	    { mapping: "profildatum", name:"profildatum" },
	    { mapping: "zeit", name:"zeit" },
	    { mapping: "region", name:"region" },
	    { mapping: "hoehe", name:"hoehe" },
	    { mapping: "profilort", name:"profilort" },
	    { mapping: "utmKoordinaten", name:"utmKoordinaten" },
	    { mapping: "hangneigung", name:"hangneigung" },
	    { mapping: "hangneigungCheck", name:"hangneigungCheck" },
	    { mapping: "exposition", name:"exposition" },
	    { mapping: "windgeschwindigkeit", name:"windgeschwindigkeit" },
	    { mapping: "windrichtung", name:"windrichtung" },
	    { mapping: "lufttemperatur", name:"lufttemperatur" },
	    { mapping: "niederschlag", name:"niederschlag" },
	    { mapping: "intensitaetDesNS", name:"intensitaetDesNS" },
	    { mapping: "bewoelkung", name:"bewoelkung" },
	    { mapping: "sonstiges", name:"sonstiges" },
	    { mapping: "onlineCheck", name:"onlineCheck" }
	]
});