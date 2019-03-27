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