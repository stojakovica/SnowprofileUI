package at.ac.dbisinformatik.snowprofile.dataconverter;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Scanner;

import javax.xml.transform.TransformerException;

import org.xml.sax.SAXException;

public class ConverterApplication {

	/**
	 * @param args
	 * @throws IOException
	 * @throws SAXException
	 * @throws FileNotFoundException
	 * @throws URISyntaxException
	 * @throws TransformerException
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
		
		return text.toString();
	}

	public static void main(String[] args) throws FileNotFoundException,
			SAXException, IOException, URISyntaxException, TransformerException {
		// TODO Auto-generated method stub
		
		if(args.length < 2) {
			System.out.println("Das Programm benötigt 2 Argumente:");
			System.out.println("1: Quell-Pfad der zu konvertierenden XML-Datei.");
			System.out.println("2: Ziel-Pfad, wo die konvertierte CAAML-Datei gespeicehrt werden soll.");
		}
		else {
			Converter con = new Converter();
			
			FileInputStream in = new FileInputStream(args[0]);
			FileOutputStream out = new FileOutputStream(args[1]);
			con.convert(in, out);
			System.out.println("Die Datei wurde erfolgreich konvertiert!");
		}
	}

}
