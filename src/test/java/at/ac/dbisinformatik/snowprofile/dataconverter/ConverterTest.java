package at.ac.dbisinformatik.snowprofile.dataconverter;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Scanner;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.testng.Assert;
import org.testng.TestNG;
import org.testng.annotations.Test;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.yaml.snakeyaml.reader.StreamReader;

public class ConverterTest {
	
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
		
		return text.toString();
	}
	
	@Test
	public void beobachterTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/main/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "/Snowprofile/metaDataProperty/MetaData/srcRef/contactPerson/Person/name/Egger Reinhard");
	}
	
	@Test
	public void dateTest() throws SAXException, IOException, TransformerException, ParserConfigurationException, XPathExpressionException {
		Document document = convert("src/main/resources/at/ac/dbisinformatik/snowprofile/dataconverter/testinputs/test.dat");
		assertNodeExists(document, "/Snowprofile..../2012...");
	}
	
	private void assertNodeExists(Document document, String xpathExpression) throws XPathExpressionException {
	    XPathFactory factory = XPathFactory.newInstance();
	    XPath xpath = factory.newXPath();
	    XPathExpression expr = xpath.compile(xpathExpression);

	    Object result = expr.evaluate(document, XPathConstants.NODESET);
	    Assert.assertNotNull(result, "lllll");
	    Assert.assertTrue(result instanceof NodeList, "jkljlfds");
	    NodeList nodes = (NodeList) result;
	    Assert.assertEquals(nodes.getLength(), 1, "asdfsfd " + nodes.getLength());
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
	
}
