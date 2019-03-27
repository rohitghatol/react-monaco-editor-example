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