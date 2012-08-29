package at.ac.dbisinformatik.snowprofile.web.svgcreator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Map;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * @author Robert Binna
 * 
 */
public class SVGCreator {

	public static void svgDocument(JsonObject jsonDocument)	throws TransformerException, FileNotFoundException {
		DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
		String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
		Document doc = impl.createDocument(svgNS, "svg", null);

		// Get the root element (the 'svg' element).
		Element svgRoot = doc.getDocumentElement();

		// Set the width and height attributes on the root 'svg' element.
		svgRoot.setAttributeNS(null, "width", "1000");
		svgRoot.setAttributeNS(null, "height", "1000");

		/*
		 * define Gradients. Not needed
		 * 
		 * JsonArray gradients = jsonDocument.get("gradients").getAsJsonArray();
		 * Element defs = doc.createElementNS(svgNS, "defs"); for(int i=0; i <
		 * gradients.size(); ++i) { Element gradient =
		 * doc.createElementNS(svgNS, "linearGradient");
		 * 
		 * JsonObject jsonGradient = gradients.get(i).getAsJsonObject();
		 * 
		 * for(Map.Entry<String,JsonElement> subElement :
		 * jsonGradient.entrySet()) { if(subElement.getKey().equals("stops")) {
		 * for(Map.Entry<String,JsonElement> stop :
		 * subElement.getValue().getAsJsonObject().entrySet()) { Element
		 * stopElement = doc.createElementNS(svgNS, "stop");
		 * stopElement.setAttributeNS(null, "offset", stop.getKey() + "%");
		 * for(Map.Entry<String,JsonElement> stopAttribute :
		 * stop.getValue().getAsJsonObject().entrySet()) {
		 * stopElement.setAttributeNS(null, stopAttribute.getKey(), "" +
		 * stopAttribute.getValue().getAsString()); }
		 * gradient.appendChild(stopElement); } } else {
		 * gradient.setAttributeNS(null, subElement.getKey(), "" +
		 * subElement.getValue().getAsString()); } }
		 * 
		 * defs.appendChild(gradient); } svgRoot.appendChild(defs);
		 */

		JsonArray items = jsonDocument.get("items").getAsJsonArray();

		for (int i = 0; i < items.size(); ++i) {
			String type = items.get(i).getAsJsonObject().get("type")
					.getAsString();
			Element element = null;
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
			switch (type) {
			case "rect":
				width = items.get(i).getAsJsonObject().get("width").getAsString();
				height = items.get(i).getAsJsonObject().get("height").getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();

				// Create the rectangle.
				element = doc.createElementNS(svgNS, "rect");
				element.setAttributeNS(null, "width", width);
				element.setAttributeNS(null, "height", height);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "stroke", "black");
				break;

			case "path":
				path = items.get(i).getAsJsonObject().get("path").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();

				// Create the path.
				element = doc.createElementNS(svgNS, "path");
				element.setAttributeNS(null, "d", path);
				element.setAttributeNS(null, "fill", fill);
				break;

			case "text":
				/*
				 * TODO: bind degrees to it rotate: { degrees: 270 },
				 */
				text = items.get(i).getAsJsonObject().get("text").getAsString();
				fill = items.get(i).getAsJsonObject().get("fill").getAsString();
				font = items.get(i).getAsJsonObject().get("font").getAsString();
				x = items.get(i).getAsJsonObject().get("x").getAsString();
				y = items.get(i).getAsJsonObject().get("y").getAsString();
				
				fontFamily = "Arial";
				fontSize = "8";

				// Create the text.
				element = doc.createElementNS(svgNS, "text");
				element.setAttributeNS(null, "text", text);
				element.setAttributeNS(null, "fill", fill);
				element.setAttributeNS(null, "font-family", fontFamily);
				element.setAttributeNS(null, "font-size", fontSize);
				element.setAttributeNS(null, "x", x);
				element.setAttributeNS(null, "y", y);
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
		StreamResult result = new StreamResult(new FileOutputStream(new File("C:/vcs/snowprofile/trunk/code/src/main/resources/at/ac/dbisinformatik/snowprofile/web/resources/data/svgcreator/tmp/test.svg")));
		transformer.transform(source, result);
	}
}
