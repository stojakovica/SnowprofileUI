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


	
	public static void svgDocument(JsonObject jsonDocument) throws TransformerException, FileNotFoundException {
		DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
		String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
		Document doc = impl.createDocument(svgNS, "svg", null);
	
		// Get the root element (the 'svg' element).
		Element svgRoot = doc.getDocumentElement();
	
		// Set the width and height attributes on the root 'svg' element.
		svgRoot.setAttributeNS(null, "width", "400");
		svgRoot.setAttributeNS(null, "height", "450");
	
		JsonArray gradients = jsonDocument.get("gradients").getAsJsonArray();
		Element defs = doc.createElementNS(svgNS, "defs");
		for(int i=0; i < gradients.size(); ++i) {
			Element gradient = doc.createElementNS(svgNS, "linearGradient");
			
			JsonObject jsonGradient = gradients.get(i).getAsJsonObject();
			
			for(Map.Entry<String,JsonElement> subElement : jsonGradient.entrySet()) {
				if(subElement.getKey().equals("stops")) {
					for(Map.Entry<String,JsonElement> stop : subElement.getValue().getAsJsonObject().entrySet()) {
						Element stopElement = doc.createElementNS(svgNS, "stop");
						stopElement.setAttributeNS(null, "offset", stop.getKey() + "%");
						for(Map.Entry<String,JsonElement> stopAttribute : stop.getValue().getAsJsonObject().entrySet()) {
							stopElement.setAttributeNS(null, stopAttribute.getKey(), "" + stopAttribute.getValue().getAsString());
						}
						gradient.appendChild(stopElement);
					}
				} else {
					gradient.setAttributeNS(null, subElement.getKey(), "" + subElement.getValue().getAsString());
				}
			}
			
			defs.appendChild(gradient);
		}
		svgRoot.appendChild(defs);
		
		JsonArray paths = jsonDocument.get("items").getAsJsonArray();
		
		for(int i=0; i < paths.size(); ++i) {
			String path = paths.get(i).getAsJsonObject().get("path").getAsString();
			String fill = paths.get(i).getAsJsonObject().get("fill").getAsString();
			// Create the rectangle.
			Element rectangle = doc.createElementNS(svgNS, "path");
			//rectangle.setAttributeNS(null, "d", "M0,109.718c0-43.13,24.815-80.463,60.955-98.499L82.914,0C68.122,7.85,58.046,23.406,58.046,41.316c0,9.64,2.916,18.597,7.915,26.039c-7.44,18.621-11.77,37.728-13.228,56.742c-9.408,4.755-20.023,7.423-31.203,7.424c-1.074,0-2.151-0.025-3.235-0.075c-5.778-0.263-11.359-1.229-16.665-2.804L0,109.718z M157.473,285.498c0-0.015,0-0.031,0-0.047C157.473,285.467,157.473,285.482,157.473,285.498 M157.473,285.55c0-0.014,0-0.027,0-0.04C157.473,285.523,157.473,285.536,157.473,285.55 M157.472,285.604c0-0.015,0.001-0.031,0.001-0.046C157.473,285.574,157.472,285.588,157.472,285.604 M157.472,285.653c0-0.012,0-0.024,0-0.037C157.472,285.628,157.472,285.641,157.472,285.653 M157.472,285.708c0-0.015,0-0.028,0-0.045C157.472,285.68,157.472,285.694,157.472,285.708 M157.472,285.756c0-0.012,0-0.023,0-0.034C157.472,285.733,157.472,285.745,157.472,285.756 M157.471,285.814c0-0.014,0-0.028,0.001-0.042C157.471,285.785,157.471,285.8,157.471,285.814 M157.471,285.858c0-0.008,0-0.017,0-0.026C157.471,285.841,157.471,285.85,157.471,285.858 M157.47,285.907c0.001-0.008,0.001-0.018,0.001-0.026C157.471,285.889,157.471,285.898,157.47,285.907 M157.47,285.964c0-0.009,0-0.017,0-0.023C157.47,285.949,157.47,285.955,157.47,285.964 M157.469,286.01c0-0.008,0.001-0.016,0.001-0.022C157.47,285.995,157.469,286.002,157.469,286.01 M157.469,286.069c0-0.008,0-0.016,0-0.022C157.469,286.053,157.469,286.062,157.469,286.069 M157.468,286.112c0-0.005,0-0.011,0-0.017C157.468,286.101,157.468,286.107,157.468,286.112 M157.467,286.214c0-0.003,0-0.006,0-0.008C157.467,286.208,157.467,286.212,157.467,286.214");
			rectangle.setAttributeNS(null, "d", path);
			rectangle.setAttributeNS(null, "fill", fill);
			//rectangle.setAttributeNS(null, "stroke", "red");
		
			// Attach the rectangle to the root 'svg' element.
			svgRoot.appendChild(rectangle);
		}
		
		TransformerFactory tFactory =
		    TransformerFactory.newInstance();
		 Transformer transformer = tFactory.newTransformer();

		  DOMSource source = new DOMSource(doc);
		  StreamResult result = new StreamResult(new FileOutputStream(new File("/test.svg")));
		  transformer.transform(source, result); 
	}
	
	public static void main(String[] args) {
		/*try {
			//svgDocument();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}
}
