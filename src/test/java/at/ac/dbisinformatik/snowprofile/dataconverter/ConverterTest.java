package at.ac.dbisinformatik.snowprofile.dataconverter;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Scanner;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.testng.Assert;
import org.testng.annotations.Test;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class ConverterTest {
	
	/**
	 * 
	 * @param Pfad der zu lesenden Datei
	 * @return Den Inhalt der Datei als String
	 * @throws IOException
	 * 
	 * Hilfsfunktion um eine XML-Datei zu lesen und als String zu verwenden.
	 * Ausgabe: Ein Sub-String der gelesenen Datei, da beim Lesen am Anfang störende Zeichen erzeugt werden.
	 * 
	 */
	public static String readFile(String file) throws IOException {
		StringBuilder text = new StringBuilder();
		String NL = System.getProperty("line.separator");
		Scanner scanner = new Scanner(new FileInputStream(file));
		try {
			while (scanner.hasNextLine()) {
				text.append(scanner.nextLine() + NL);
			}
		} finally {
			scanner.close();
		}
		
		return text.toString().substring(3);
	}
	
	/**
	 * 
	 * @param document: die konvertierte XML-Datei im CAAML-Standart
	 * @param xpathExpression: XML-Pfad
	 * @param expectedVal: der erwartete Wert des Pfades
	 * @throws XPathExpressionException
	 * 
	 * Vergleicht den Wert des XML-Pfades mit dem erwarteten Wert. Ist er gleich wird true, ansonsten false ausgegeben.
	 * 
	 */
	private void assertExpectedValue(Document document, String xpathExpression, String expectedVal) throws XPathExpressionException {
		Object result = buildXpathResult(document, xpathExpression);
		
		NodeList nodes = (NodeList) result;
		Assert.assertEquals(nodes.item(0).getNodeValue(), expectedVal, "The converted Value is false!");
	}
	
	/**
	 * 
	 * @param document: die konvertierte XML-Datei im CAAML-Standart
	 * @param xpathExpression: XML-Pfad (meherere Pfade, weil häufiger vorhanden)
	 * @param expectedVal: die erwarteten Werte des Pfades (der Pfade) als ArrayList
	 * @throws XPathExpressionException
	 * 
	 * Vergleicht den Wert des XML-Pfades mit dem erwarteten Wert. Ist er gleich wird true, ansonsten false ausgegeben.
	 * 
	 */
	private void assertExpectedValue(Document document, String xpathExpression, ArrayList<String> expectedVal) throws XPathExpressionException {
		Object result = buildXpathResult(document, xpathExpression);
		
		NodeList nodes = (NodeList) result;
		for (int i = 0; i < nodes.getLength(); i++) {
	        Assert.assertEquals(nodes.item(i).getNodeValue(), expectedVal.get(i), "The converted Value is false!");
	    }
	}
	
	/**
	 * 
	 * @param document: die konvertierte XML-Datei im CAAML-Standart
	 * @param xpathExpression: XML-Pfad
	 * @throws XPathExpressionException
	 * 
	 * Prüft ob XML-Pfad überhaupt existiert.
	 */
	private void assertNodeExists(Document document, String xpathExpression) throws XPathExpressionException {
	    Object result = buildXpathResult(document, xpathExpression);
	    
	    Assert.assertNotNull(result, "No value for this Node!");
	    Assert.assertTrue(result instanceof NodeList, "Result is not a Node!");
	}
	
	/**
	 * 
	 * @param document: die konvertierte XML-Datei im CAAML-Standart 
	 * @param xpathExpression: XML-Pfad
	 * @return Objekt
	 * @throws XPathExpressionException
	 * 
	 * Hilfsfunktion zum Instanzieren eines XPath-Objekts.
	 */
	private Object buildXpathResult(Document document, String xpathExpression) throws XPathExpressionException {
		XPathFactory factory = XPathFactory.newInstance();
	    XPath xpath = factory.newXPath();
	    XPathExpression expr = xpath.compile(xpathExpression);

	    return expr.evaluate(document, XPathConstants.NODESET);
	}
	
	/**
	 * 
	 * @param path: Pfad der zu lesenden XML-Datei
	 * @return das konvertierte XML-Dokument
	 * @throws SAXException
	 * @throws IOException
	 * @throws TransformerException
	 * @throws ParserConfigurationException
	 * 
	 * Konvertiert die XML-Datei im alten Standart in ein CAAML-Dokument und gibt es als XML-Dokument zurück.
	 */
	private Document convert(String path) throws SAXException, IOException, TransformerException, ParserConfigurationException {
		Converter converter = new Converter();
		String convertedDocumentString;
		convertedDocumentString = converter.convert(readFile(path));
		
		DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
	    domFactory.setNamespaceAware(true); // never forget this!
	    DocumentBuilder builder = domFactory.newDocumentBuilder();
	    InputSource documentInputSource = new InputSource(new StringReader(convertedDocumentString));
	    Document doc = builder.parse(documentInputSource);
		
		return doc;
	}
	
	@Test
	public void dateTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//metaDataProperty/MetaData/dateTimeReport/text()");
		assertExpectedValue(document, "//metaDataProperty/MetaData/dateTimeReport/text()", "2011-06-14T15:36:48");
	}
	
	@Test
	public void contactNameTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//metaDataProperty/MetaData/srcRef/Operation/contactPerson/Person/name/text()");
		assertExpectedValue(document, "//metaDataProperty/MetaData/srcRef/Operation/contactPerson/Person/name/text()", "Egger Reinhard");
	}
	
	@Test
	public void timePositionTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//validTime/TimeInstant/timePosition/text()");
		assertExpectedValue(document, "//validTime/TimeInstant/timePosition/text()", "2010-02-23T00:00:00");
	}
	
	/*
	@Test
	public void commentTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/comment/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/comment/text()", "KT test ergibt:\n nach größerer Zusatzbelastung (KT 22+KT25) bricht der Block in der lockeren untersten Schicht in sich zusammen. die darüber liegenden Schichten sind gut miteinander verbunden;");
	}
	*/
	
	@Test
	public void profileDepthTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/profileDepth/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/profileDepth/text()", "600");
	}
	
	@Test
	public void skyCondTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/skyCond/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/skyCond/text()", "BKN");
	}
	
	@Test
	public void precipTITest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/precipTI/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/precipTI/text()", "Nil");
	}
	
	@Test
	public void airTempPresTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/airTempPres/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/airTempPres/text()", "-3,2");
	}
	
	@Test
	public void windSpdTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/windSpd/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/windSpd/text()", String.valueOf(25./3.6));
	}
	
	@Test
	public void windDirTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/windDir/AspectPosition/position/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/windDir/AspectPosition/position/text()", "S");
	}
	
	@Test
	public void hSTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/hS/Components/snowHeight/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/hS/Components/snowHeight/text()", "60");
	}
	
	@Test
	public void layerHeightTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("600");
		expectedVals.add("550");
		expectedVals.add("500");
		expectedVals.add("430");
		expectedVals.add("410");
		expectedVals.add("350");
		expectedVals.add("300");
		expectedVals.add("260");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/depthTop/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/depthTop/text()", expectedVals);
	}
	
	@Test
	public void layerGrainFormPrimaryTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("DF");
		expectedVals.add("DF");
		expectedVals.add("RG");
		expectedVals.add("RG");
		expectedVals.add("RG");
		expectedVals.add("RG");
		expectedVals.add("RG");
		expectedVals.add("FC");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainFormPrimary/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainFormPrimary/text()", expectedVals);
	}
	
	@Test
	public void layerGrainFormSecondaryTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("DF");
		expectedVals.add("RG");
		expectedVals.add("MF");
		expectedVals.add("MF");
		expectedVals.add("RG");
		expectedVals.add("FC");
		expectedVals.add("FC");
		expectedVals.add("DH");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainFormSecondary/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainFormSecondary/text()", expectedVals);
	}
	
	@Test
	public void layerHardnessTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("4F");
		expectedVals.add("F");
		expectedVals.add("1F");
		expectedVals.add("P");
		expectedVals.add("1F");
		expectedVals.add("4F");
		expectedVals.add("4F");
		expectedVals.add("F-4F");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/hardness/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/hardness/text()", expectedVals);
	}
	
	@Test
	public void layerLWCTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("D");
		expectedVals.add("D");
		expectedVals.add("D");
		expectedVals.add("D");
		expectedVals.add("M");
		expectedVals.add("M");
		expectedVals.add("D");
		expectedVals.add("D");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/lwc/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/lwc/text()", expectedVals);
	}
	
	@Test
	public void layergrainSizeAvgTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("2");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainSize/Components/avg/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainSize/Components/avg/text()", expectedVals);
	}
	
	@Test
	public void layergrainSizeAvgMaxTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("2");
		expectedVals.add("2");
		expectedVals.add("1");
		expectedVals.add("1");
		expectedVals.add("2");
		expectedVals.add("3");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainSize/Components/avgMax/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/grainSize/Components/avgMax/text()", expectedVals);
	}
	
	@Test
	public void tempProfileDepthTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("58");
		expectedVals.add("50");
		expectedVals.add("40");
		expectedVals.add("30");
		expectedVals.add("20");
		expectedVals.add("10");
		expectedVals.add("0");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/tempProfile/Obs/depth/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/tempProfile/Obs/depth/text()", expectedVals);
	}
	
	@Test
	public void tempProfileSnowTempTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("25");
		expectedVals.add("13");
		expectedVals.add("0");
		expectedVals.add("0");
		expectedVals.add("0");
		expectedVals.add("0");
		expectedVals.add("0");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/tempProfile/Obs/snowTemp/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/tempProfile/Obs/snowTemp/text()", expectedVals);
	}
	
	@Test
	public void densityProfileDepthTopTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("60");
		expectedVals.add("43");
		expectedVals.add("30");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/depthTop/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/depthTop/text()", expectedVals);
	}
	
	@Test
	public void densityProfileThicknessTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("17");
		expectedVals.add("13");
		expectedVals.add("30");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/thickness/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/thickness/text()", expectedVals);
	}
	
	@Test
	public void densityProfileDensityTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("1588");
		expectedVals.add("2385");
		expectedVals.add("867");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/density/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/densityProfile/Layer/density/text()", expectedVals);
	}
	
	@Test
	public void hardnessProfileDepthTopTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("9");
		expectedVals.add("9");
		expectedVals.add("13");
		expectedVals.add("17");
		expectedVals.add("18");
		expectedVals.add("22");
		expectedVals.add("28");
		expectedVals.add("60");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/depthTop/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/depthTop/text()", expectedVals);
	}
	
	@Test
	public void hardnessProfileThicknessTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("9");
		expectedVals.add("0");
		expectedVals.add("4");
		expectedVals.add("4");
		expectedVals.add("1");
		expectedVals.add("4");
		expectedVals.add("6");
		expectedVals.add("32");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/thickness/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/thickness/text()", expectedVals);
	}
	
	@Test
	public void hardnessProfileHardnessTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add(String.valueOf(1.*9.80665));
		expectedVals.add(String.valueOf(2.*9.80665));
		expectedVals.add(String.valueOf(8.*9.80665));
		expectedVals.add(String.valueOf(8.*9.80665));
		expectedVals.add(String.valueOf(27.*9.80665));
		expectedVals.add(String.valueOf(14.*9.80665));
		expectedVals.add(String.valueOf(10.*9.80665));
		expectedVals.add(String.valueOf(4.*9.80665));
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/hardness/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/hardnessProfile/Layer/hardness/text()", expectedVals);
	}
	
	@Test
	public void compressionLayerTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("15");
		expectedVals.add("8");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Layer/depthTop/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Layer/depthTop/text()", expectedVals);
	}
	
	@Test
	public void compressionResultsFractureCharacterTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("Rough");
		expectedVals.add("Rough");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Results/fractureCharacter/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Results/fractureCharacter/text()", expectedVals);
	}
	
	@Test
	public void compressionResultsTestScoreTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		ArrayList<String> expectedVals = new ArrayList<String>();
		expectedVals.add("22");
		expectedVals.add("5");
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Results/testScore/text()");
		assertExpectedValue(document, "//snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest/failedOn/Results/testScore/text()", expectedVals);
	}
	
	@Test
	public void locRefNameTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//locRef/ObsPoint/name/text()");
		assertExpectedValue(document, "//locRef/ObsPoint/name/text()", "Felbertauern Nord \u00D6dalm - (R10) Osttiroler Tauern - Tirol");
	}
	
	@Test
	public void locRefElevationPositionTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//locRef/ObsPoint/validElevation/ElevationPosition/position/text()");
		assertExpectedValue(document, "//locRef/ObsPoint/validElevation/ElevationPosition/position/text()", "1550");
	}
	
	@Test
	public void locRefAspectPositionTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//locRef/ObsPoint/validAspect/AspectPosition/position/text()");
		assertExpectedValue(document, "//locRef/ObsPoint/validAspect/AspectPosition/position/text()", "W");
	}
	
	@Test
	public void locRefSlopeAnglePositionTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/test/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//locRef/ObsPoint/validSlopeAngle/SlopeAnglePosition/position/text()");
		assertExpectedValue(document, "//locRef/ObsPoint/validSlopeAngle/SlopeAnglePosition/position/text()", "5");
	}
	
}
