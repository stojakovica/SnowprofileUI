package at.ac.dbisinformatik.snowprofile.dataconverter;

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
			System.out.println("Das Programm ben�tigt 2 Argumente:");
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
