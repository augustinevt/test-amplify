import React, { Component } from 'react';
import Amplify, {Storage} from 'aws-amplify';
import {Button} from 'antd';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

import './App.css';

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div className="App">
        <Button onClick={this.doSomething}> Do Something </Button>
        { this.state.data.map(item => <div>{item}</div>)}
      </div>
    );
  }

  doSomething = async () => {
    try {
      const results = await Storage.get('testJson.json');
      const fetchResults = await fetch(results);
      const result = await fetchResults.json();

      this.setState({data: result.data})
    } catch (e) {
      console.log(e);
    }
  }

}

export default withAuthenticator(App);
