package at.ac.dbisinformatik.snowprofile.dataconverter;

import java.io.IOException;

import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;

import org.testng.annotations.Test;
import org.xml.sax.SAXException;

import at.ac.dbisinformatik.snowprofile.dataconverter.Converter;

public class ConverterTest {

	@Test
	public void convertTrue() {
		try {
			Converter.convert("test.dat");
		} catch (TransformerConfigurationException e) {
			System.out.println("Transformation Config Exception");
			assert(false);
			return;
		} catch (TransformerException e) {
			System.out.println("Transformer Exception");
			assert(false);
			return;
		} catch (SAXException e) {
			System.out.println("No XML File");
			assert(false);
			return;
		} catch (IOException e) {
			System.out.println("No File");
			assert(false);
			return;
		}
		assert(true);
	}
	
	@Test
	public void convertFalse() {
		try {
			Converter.convert("test.txt");
		} catch (TransformerConfigurationException e) {
			System.out.println("Transformation Config Exception");
			assert(true);
			return;
		} catch (TransformerException e) {
			System.out.println("Transformer Exception");
			assert(true);
			return;
		} catch (SAXException e) {
			System.out.println("No XML File");
			assert(true);
			return;
		} catch (IOException e) {
			System.out.println("No File");
			assert(true);
			return;
		}
		assert(false);
	}
}
