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
	 * @param file
	 * @return
	 * @throws IOException
	 * 
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
	
	private void assertExpectedValue(Document document, String xpathExpression, String expectedVal) throws XPathExpressionException {
		Object result = buildXpathResult(document, xpathExpression);
		
		NodeList nodes = (NodeList) result;
		Assert.assertEquals(nodes.item(0).getNodeValue(), expectedVal, "The converted Value is false!");
	}
	
	private void assertExpectedValueArray(Document document, String xpathExpression, ArrayList<String> expectedVal) throws XPathExpressionException {
		Object result = buildXpathResult(document, xpathExpression);
		
		NodeList nodes = (NodeList) result;
		for (int i = 0; i < nodes.getLength(); i++) {
	        Assert.assertEquals(nodes.item(i).getNodeValue(), expectedVal.get(i), "The converted Value is false!");
	    }
	}
	
	private void assertNodeExists(Document document, String xpathExpression) throws XPathExpressionException {
	    Object result = buildXpathResult(document, xpathExpression);
	    
	    Assert.assertNotNull(result, "No value for this Node!");
	    Assert.assertTrue(result instanceof NodeList, "Result is not a Node!");
	}
	
	private Object buildXpathResult(Document document, String xpathExpression) throws XPathExpressionException {
		XPathFactory factory = XPathFactory.newInstance();
	    XPath xpath = factory.newXPath();
	    XPathExpression expr = xpath.compile(xpathExpression);

	    return expr.evaluate(document, XPathConstants.NODESET);
	}
	
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
		Document document = convert("src/main/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//metaDataProperty/MetaData/dateTimeReport/text()");
		assertExpectedValue(document, "//metaDataProperty/MetaData/dateTimeReport/text()", "2011-06-14T15:36:48");
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
		Document document = convert("src/main/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "//metaDataProperty/MetaData/dateTimeReport/text()");
		assertExpectedValueArray(document, "//snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer/depthTop/text()", expectedVals);
	}
	
}
