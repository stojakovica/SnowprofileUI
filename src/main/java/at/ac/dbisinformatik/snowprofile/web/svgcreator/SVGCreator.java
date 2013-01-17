
package at.ac.dbisinformatik.snowprofile.web.svgcreator;

/**
 * Copyright (c) 2012 Aleksandar Stojakovic
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * The Software shall be used for Good, not Evil.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.fop.svg.PDFTranscoder;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class SVGCreator {
	
	/**
	 * returns a ByteArrayOutputStream which contains the converted SVG-Graph to PNG
	 * 
	 * @param inputStream
	 * @return
	 * @throws TranscoderException
	 * @throws IOException
	 */
	public static ByteArrayOutputStream createPNG(InputStream inputStream) throws TranscoderException, IOException {
		ByteArrayOutputStream ret = new ByteArrayOutputStream();
		PNGTranscoder t = new PNGTranscoder();
		TranscoderInput input = new TranscoderInput(inputStream);
		TranscoderOutput output = new TranscoderOutput(ret);
		
		t.transcode(input, output);
		
		return ret;
	}

	/**
	 * returns a ByteArrayOutputStream which contains the converted SVG-Graph to JPG
	 * 
	 * @param inputStream
	 * @return
	 * @throws TranscoderException
	 * @throws IOException
	 */
	public static ByteArrayOutputStream createJPG(InputStream inputStream) throws TranscoderException, IOException {
		ByteArrayOutputStream ret = new ByteArrayOutputStream();
		JPEGTranscoder t = new JPEGTranscoder();
		t.addTranscodingHint(JPEGTranscoder.KEY_QUALITY, new Float(.8));
		TranscoderInput input = new TranscoderInput(inputStream);
		TranscoderOutput output = new TranscoderOutput(ret);

		t.transcode(input, output);

		return ret;
	}

	/**
	 * returns a ByteArrayOutputStream which contains the converted SVG-Graph to PDF
	 * 
	 * @param inputStream
	 * @return
	 * @throws IOException
	 */
	public static ByteArrayOutputStream createPDF(InputStream inputStream) throws IOException {
		ByteArrayOutputStream ret = new ByteArrayOutputStream();
		PDFTranscoder t = new PDFTranscoder();
		TranscoderInput input = new TranscoderInput(inputStream);
		TranscoderOutput output = new TranscoderOutput(ret);
		
		try {
			t.transcode(input, output);
		} catch (Exception ex) {
			throw new IOException(ex.getMessage());
		} finally {
		}
		return ret;
	}

	/**
	 * creates a SVG-Graph for given jsonDocument which includes ExtJS-SVG-Objects. The created SVG-Document will be converted in the given export type. 
	 * 
	 * @param jsonDocument
	 * @param exportType
	 * @param profileID
	 * @return
	 * @throws TransformerException
	 * @throws URISyntaxException
	 * @throws TranscoderException
	 * @throws IOException
	 */
	public static ByteArrayOutputStream svgDocument(JsonArray jsonDocument, String exportType, String profileID)
			throws TransformerException, URISyntaxException,
			TranscoderException, IOException {
		
		ByteArrayOutputStream ret = null;
		
		DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
		String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
		Document doc = impl.createDocument(svgNS, "svg", null);

		// Get the root element (the 'svg' element).
		Element svgRoot = doc.getDocumentElement();

		// Set the width and height attributes on the root 'svg' element.
		svgRoot.setAttributeNS(null, "width", "842");
		svgRoot.setAttributeNS(null, "height", "595");
		JsonArray items = jsonDocument;

		for (int i = 0; i < items.size(); ++i) {
			String type = items.get(i).getAsJsonObject().get("type")
					.getAsString();
			Element element = null;
			org.w3c.dom.Text test = null;
			String path = "";
			String width = "";
			String height = "";
			String x = "";
			String y = "";
			String fill = "";
			String text = "";
			String font = "";
			String fontFamily = "";
			String fontSize = "";
			String degrees = "";
			String stroke = "";
			String opacity = "";
			String src = "";
			switch (type) {
			case "rect":
				width = items.get(i).getAsJsonObject().get("width")
						.getAsString();
				height = items.get(i).getAsJsonObject().get("height")
						.getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				stroke = items.get(i).getAsJsonObject().get("stroke")
						.getAsString();
				opacity = items.get(i).getAsJsonObject().get("opacity")
						.getAsString();

				// Create the rectangle.
				element = doc.createElementNS(svgNS, "rect");
				element.setAttributeNS(null, "width", width);
				element.setAttributeNS(null, "height", height);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "stroke", stroke);
				element.setAttributeNS(null, "opacity", opacity);
				break;

			case "path":
				path = items.get(i).getAsJsonObject().get("path").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				stroke = items.get(i).getAsJsonObject().get("stroke")
						.getAsString();

				// Create the path.
				element = doc.createElementNS(svgNS, "path");
				element.setAttributeNS(null, "d", path);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "stroke", stroke);
				break;

			case "image":
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				width = items.get(i).getAsJsonObject().get("width").getAsString();
				height = items.get(i).getAsJsonObject().get("height").getAsString();
				src = System.class.getResource("/at/ac/dbisinformatik/snowprofile/web/resources/" + items.get(i).getAsJsonObject().get("src").getAsString()).toString();

				// Create the path.
				element = doc.createElementNS(svgNS, "image");
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				element.setAttributeNS(null, "width", width);
				element.setAttributeNS(null, "height", height);
				element.setAttributeNS(null, "xlink:href", src);
				break;

			case "text":
				text = items.get(i).getAsJsonObject().get("text").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				font = items.get(i).getAsJsonObject().get("font").getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();

				// Transformation
				if (items.get(i).getAsJsonObject().get("rotate") != null) {
					JsonObject temp = items.get(i).getAsJsonObject()
							.get("rotate").getAsJsonObject();
					degrees = temp.get("degrees").getAsString();
				}

				fontSize = font.split(" ")[0];
				fontFamily = font.split(" ")[1];

				// Create the text.
				test = doc.createTextNode(text);
				element = doc.createElementNS(svgNS, "text");
				element.setAttributeNS(null, "text", text);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "font-family", fontFamily);
				element.setAttributeNS(null, "font-size", fontSize);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				if (!degrees.equals("")) {
					// element.setAttributeNS(null, "transform",
					// "rotate(270 "+500+","+80+")");
				}
				element.appendChild(test);
				break;

			default:
				break;
			}

			// Attach the rectangle to the root 'svg' element.
			svgRoot.appendChild(element);
		}

		TransformerFactory tFactory = TransformerFactory.newInstance();
		Transformer transformer = tFactory.newTransformer();
		
		DOMSource source = new DOMSource(doc);
		
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		StreamResult result = new StreamResult(outputStream);
		transformer.transform(source, result);
		InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
		
		switch (exportType) {
		case "png":
			ret = createPNG(inputStream);
			break;
			
		case "jpg":
			ret = createJPG(inputStream);
			break;
			
		case "pdf":
			ret = createPDF(inputStream);
			break;

		default:
			break;
		}
		return ret;
	}
}
