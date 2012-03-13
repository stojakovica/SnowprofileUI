/**
 * Copyright 2007 Dejan Bosanac
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
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

package at.ac.dbisinformatik.snowprofile.web.rhino;

import java.io.FileReader;
import java.io.IOException;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;

public class ScriptEngine {

    public static void main(String[] args) {
        try {
            Context cx = Context.enter();
            Scriptable scope = cx.initStandardObjects();            
            FileReader script = new FileReader("src/main/resources/at/ac/dbisinformatik/snowprofile/web/resources/data/js/includeFunctions.js");
            cx.evaluateReader(scope, script,"<cmd>", 1, null);
            Object func = scope.get("drawGraphJSON", scope);
            if (func instanceof Function) {
                Object funcArgs[] = null;
                Object result = ((Function)func).call(cx, scope, scope, funcArgs);
                System.out.println(result);
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (JavaScriptException jse) {
            jse.printStackTrace();
        } finally {
            Context.exit();
        }
    }
}
