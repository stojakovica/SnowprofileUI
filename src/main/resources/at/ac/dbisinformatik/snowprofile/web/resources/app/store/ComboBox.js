var himmelsrichtungen = [
    ['N', 'N'],
  	['NE', 'NE'],
  	['E', 'E'],
  	['SE', 'SE'],
  	['S', 'S'],
  	['SW', 'SW'],
  	['W', 'W'],
  	['NW', 'NW']
];

var windgeschwindigkeit = [
	['0', 'kein Wind (0 km/h)'],
	['1_20', 'schwacher Wind (1-20 km/h)'],
	['20_40', 'mäßiger Wind (20-40 km/h)'],
	['40_60', 'starker Wind (40-60 km/h)'],
	['60_100', 'stürmischer Wind (60-100 km/h)'],
	['100', 'schwerer Wind/Orkan (>100 km/h)']
];

var niederschlag = [
	['Nil', 'kein Niederschlag'],
	['SN', 'Schnee'],
	['GS', 'Graupel'],
	['RA', 'Regen']
];

var intensitaetNiederschlag = [
	['schwach', 'schwach'],
	['mittel', 'mittel'],
	['stark', 'stark']
];

var bewoelkung = [
	['CLR', 'wolkenlos (0/8)'],
	['FEW', 'leicht bewölkt (1/8 - 2/8)'],
	['SCT', 'bewölkt (3/8 - 4-8)'],
	['BKN', 'stark bewölkt (5/8 - 7/8)'],
	['OVC', 'bedeckt (8/8)'],
	['X', 'Nebel']
];

var regionen = [
	['Arlberg - Außerfern', 'R1 - Arlberg - Außerfern'],
	['Westliche Nordalpen', 'R2 - Westliche Nordalpen'],
	['Östliche Nordalpen', 'R3 - Östliche Nordalpen'],
	['Silvretta - Samnaun', 'R4 - Silvretta - Samnaun'],
	['Nördliche Ötztaler und Stubaier Alpen', 'R5 - Nördliche Ötztaler und Stubaier Alpen'],
	['Tuxer Alpen', 'R6 - Tuxer Alpen'],
	['Kitzbüheler Alpen', 'R7 - Kitzbüheler Alpen'],
	['Südliche Ötztaler und Stubaier Alpen', 'R8 - Südliche Ötztaler und Stubaier Alpen'],
	['Zillertaler Alpen', 'R9 - Zillertaler Alpen'],
	['Osttiroler Tauern', 'R10 - Osttiroler Tauern'],
	['Zentral Osttirol', 'R11 - Zentral Osttirol'],
	['Osttiroler Dolomiten', 'R12 - Osttiroler Dolomiten']
];