import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    clients: []
  };

  async componentDidMount() {
    const response = await fetch('/api/clients');
    const body = await response.json();
    this.setState({ clients: body.content, isLoading: false });
  }
	
  render() {
    const {clients, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
            {clients.map(client =>
              <div key={client.id}>
                {client.name}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
