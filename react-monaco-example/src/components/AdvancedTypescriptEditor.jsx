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