package at.ac.dbisinformatik.snowprofile.dataconverter;

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the  "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * $Id: SAX2SAX.java 470245 2006-11-02 06:34:33Z minchau $
 */

/**
 *  Replicate the SimpleTransform sample, explicitly using the SAX model to handle the
 *  stylesheet, the XML input, and the transformation.
 */

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Templates;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.sax.SAXTransformerFactory;
import javax.xml.transform.sax.TemplatesHandler;
import javax.xml.transform.sax.TransformerHandler;

import org.apache.xml.serializer.Serializer;
import org.apache.xml.serializer.SerializerFactory;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

public class Converter {

	private static TransformerFactory tFactory;

	@SuppressWarnings("static-access")
	public Converter() {
		this.tFactory = TransformerFactory.newInstance();
	}
	
	public void convert(InputStream input, OutputStream out, String converterFile) throws TransformerException, TransformerConfigurationException,	SAXException, IOException {
		// Determine whether the TransformerFactory supports The use of SAXSource and SAXResult
		if (tFactory.getFeature(SAXSource.FEATURE) && tFactory.getFeature(SAXResult.FEATURE)) {
			// Cast the TransformerFactory.
			// Create a ContentHandler to handle parsing of the stylesheet.
			SAXTransformerFactory saxTFactory = ((SAXTransformerFactory) tFactory);
			TemplatesHandler templatesHandler = saxTFactory.newTemplatesHandler();
			
			// Create an XMLReader and set its ContentHandler and parse the stylesheet.
			XMLReader reader = XMLReaderFactory.createXMLReader();
			reader.setContentHandler(templatesHandler);
			reader.parse(new InputSource(getClass().getResourceAsStream("/at/ac/dbisinformatik/snowprofile/dataconverter/"+converterFile)));
		
			// Get the Templates object from the ContentHandler.
			// Create a ContentHandler to handle parsing of the XML source.
			// Reset the XMLReader's ContentHandler.
			// Set the ContentHandler to also function as a LexicalHandler,
			// which includes "lexical" events (e.g., comments and CDATA).
			Templates templates = templatesHandler.getTemplates();
			TransformerHandler handler = saxTFactory.newTransformerHandler(templates);
			reader.setContentHandler(handler);
			reader.setProperty("http://xml.org/sax/properties/lexical-handler", handler);
			
			java.util.Properties xmlProps = org.apache.xml.serializer.OutputPropertiesFactory.getDefaultMethodProperties("xml");
			xmlProps.setProperty("indent", "yes");
			xmlProps.setProperty("standalone", "no");
			Serializer serializer = SerializerFactory.getSerializer(xmlProps);
			serializer.setOutputStream(out);
			
			// Set the result handling to be a serialization to the file outputstream.
			// Parse the XML input document.
			Result result = new SAXResult(serializer.asContentHandler());
			handler.setResult(result);
			reader.parse(new InputSource(input));
			
//			System.out.println("Convertion finished!");
		} else
			System.out.println("The TransformerFactory does not support SAX input and SAX output");
	}
	
	public void convert(InputStream input, OutputStream out) throws TransformerException, TransformerConfigurationException,	SAXException, IOException {
		convert(input, out, "converter.xsl");
	}
	
	public String convert(String in, String converterType) throws SAXException, IOException, TransformerException {
		InputStream inStream = new ByteArrayInputStream(in.getBytes("UTF-8"));
		OutputStream outStream = new OutputStream() {
			private StringBuilder string = new StringBuilder();

			@Override
			public void write(int b) throws IOException {
				this.string.append((char) b);
			}

			public String toString() {
				return this.string.toString();
			}
		};
		
		convert(inStream, outStream, converterType);
		inStream.close();

		return outStream.toString();
	}
	
	public String convert(String in) throws SAXException, IOException, TransformerException {
		return convert(in, "converter.xsl");
	}
	
	public void convert(File input, File output) throws TransformerException, FileNotFoundException, SAXException, IOException {
		convert(new FileInputStream(input), new FileOutputStream(output));
	}
}
