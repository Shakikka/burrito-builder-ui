import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
    .then(orders => this.setState({ orders: orders.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  addBurrito = (newBurrito) => {
    postOrders(newBurrito)
    .then(burrito => this.setState({ orders: [...this.state.orders, burrito]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder 9000</h1>
          <OrderForm addBurrito={this.addBurrito}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
