# Microsoft Monaco Editor using react-monaco
This is a example of how to use Microsoft Monaco Editor for coding Typescript functions using react-monaco library

# Setup

1. Install CRA

    ```
    $> npm i create-react-app
    ```

2. Create React Project

    ```
    $> create-react-app react-monaco-example    
    ```

3. Eject React Scripts

    ```
    $> cd react-monaco-editor
    $> npm run eject
    
    ```

4. Install React Monaco Editor and make changes to webpack

    ```
    $> npm i react-monaco-editor -S
    $> npm i monaco-editor-webpack-plugin -D
    ```
    
    Edit react-monaco-example/config/webpack.config.js file
    
    * Add Import at the top
    ```
    const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
    ```

    * Add Plugin in the plugin space
    ```
    new MonacoWebpackPlugin(),
    ```

5. Create a React Component for Monaco Editor

    ```
    components/SimpleTypescriptEditor.jsx
    ```
    
    ```
    import React,{Component} from 'react';
    import MonacoEditor from 'react-monaco-editor'
    
    const code =
    `
    
    // Define Typescript Interface Employee
    interface Employee {
        firstName: String;
        lastName: String;
        contractor?: Boolean;
    }
    
    // Use Typescript Interface Employee. 
    // This should show you an error on john 
    // as required attribute lastName is missing
    const john:Employee = {
        firstName:"John",
        // lastName:"Smith"
        // contractor:true
    }
    
    `
    export class SimpleTypescriptEditor extends Component {
    
    
        constructor(props){
            super(props);
            this.state = {
                code
            }
        }
    
        onChange(newValue, e) {
            // console.log('onChange', newValue, e);
        }
    
        render() {
            return (
                <MonacoEditor
                    width="600"
                    height="800"
                    language="typescript"
                    theme="vs-dark"
                    defaultValue=''
                    value={this.state.code}
                    onChange={this.onChange}
                />
            )
        }
    }
    ```
    
    
    ---
    ```
    // types/index.js
    import {content as modelContent} from './models';
    import {content as lambdaContent} from './lambda';
    import {content as ramdaContent} from './ramda';
    
    export const files = {
        "models/index.d.ts": modelContent,
        "ramda/index.d.ts": ramdaContent,
        "lambda/index.d.ts": lambdaContent,
    };

    ```
    ```
    // types/models.js
    export const content =
    `
    export interface Item {
       id: String;
       name: String;
       value: String;
    }
    
    export interface Result {
       id: String;
       name: String;
       value: String;
    }
    `

    ```
    // types/lambda.js
    export const content =
    `
    import {Item} from 'models';
    
    export interface Event {
        input: Item[]
     }
    
    export interface Context {
       
    }
    `

    ```    
    
    
    ```
    components/AdvancedTypescriptEditor.jsx
    ```
    
    ```
    import React,{Component} from 'react';
    import MonacoEditor from 'react-monaco-editor'
    import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
    import {Uri} from 'monaco-editor/esm/vs/editor/editor.api';
    
    import {files} from './typings';
    
    const code =
    `
    //--------------------------
    // Contents of "models"
    //--------------------------
    //
    // export interface Item {
    //    id: String;
    //    name: String;
    //    value: String;
    // }
    //
    // export interface Result {
    //    id: String;
    //    name: String;
    //    value: String;
    // }
    
    //--------------------------
    // Contents of "lambda"
    //--------------------------
    //
    // import {Item} from 'models';
    //
    // export interface Event {
    //     input: Item[]
    // }
    //
    // export interface Context {
    //  
    // }
    
    
    import {Event, Context} from "lambda";
    import {Item, Result} from "models"
    import * as R from "ramda";
     
    export const lambda = async (event:Event, context:Context): Promise<Result[]> => {
        
        const result:Result[] = R.map((input:Item) => ({
            id: input.id,
            name: input.name,
            value: input.value
        }),event.input);
        
        return result;
    }
    
    
    
    
    `
    export class AdvancedTypescriptEditor extends Component {
    
    
        constructor(props){
            super(props);
            this.state = {
                code
            }
        }
    
        onChange(newValue, e) {
            // console.log('onChange', newValue, e);
        }
    
        editorWillMount(monaco) {
    
            // validation settings
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: false,
                noSyntaxValidation: false
            });
    
            // compiler options
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES6,
                allowNonTsExtensions: true
            });
    
            for (const fileName in files) {
                const fakePath = `file:///node_modules/@types/${fileName}`;
    
                monaco.languages.typescript.typescriptDefaults.addExtraLib(
                    files[fileName],
                    fakePath
                );
            }
    
    
        }
    
    
    
        editorDidMount(editor, monaco) {
            editor.focus();
        }
    
        render() {
            const options = {
                selectOnLineNumbers: true,
                model: monaco.editor.getModel(Uri.parse("file:///main.tsx"))
                    ||
                    monaco.editor.createModel(code, "typescript", monaco.Uri.parse("file:///main.tsx"))
            }
            return (
                <MonacoEditor
                    width="800"
                    height="800"
                    language="typescript"
                    theme="vs-dark"
                    defaultValue=''
                    value={this.state.code}
                    onChange={this.onChange}
                    editorWillMount={this.editorWillMount}
                    editorDidMount={this.editorDidMount}
                    options={options}
                />
            )
        }
    }
    ```
    