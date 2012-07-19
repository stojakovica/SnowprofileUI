function getDataFromRecord(record, rowIndex, dataIndex) {
	/*
	var path = dataIndex.split(".");
	var fn = "record."+path[0]+"().data.getAt(0)";
	for(var i = 1; i < path.length - 1; i++) {
		if(path[i] == "Layer") 
			fn = fn+"."+path[i]+"().data.getAt(rowIndex)";
		else 
			fn = fn+"."+path[i]+"().data.getAt(0)";
	}
	fn = fn+".get('"+path[path.length-1]+"')";
	return eval(fn);
	*/
	
	return "222";
	
	//return record.snowProfileResultsOf().data.getAt(0).SnowProfileMeasurements().data.getAt(0).stratProfile().data.getAt(0).Layer().data.getAt(rowIndex).get('grainFormPrimary');
}