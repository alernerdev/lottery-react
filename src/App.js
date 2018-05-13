import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '', // notice its a string
    value: ''
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // in call(), you dont have to specify what aacount its calling from.
    // the account used is the one thats set in metamask
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager: manager, players: players, balance: balance});
  }

  // using this syntax fixes the this issues on callbacks
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],  // note that here the account IS used
      value: web3.utils.toWei(this.state.value, 'ether')
    })
  }

  render() {
    console.log(`my web3 version ${web3.version}`);

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. 
          There are currently {this.state.players.length} people entered competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck ?</h4>
          <label>Amount of ether to enter</label>
          <input 
            value = {this.state.value}
            onChange = {event => this.setState( { value: event.target.value})}
          />
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
