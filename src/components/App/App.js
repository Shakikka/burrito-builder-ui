import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrders, deleteOrder } from '../../apiCalls';
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

  cancelOrder = id => {
    deleteOrder(id)
    .then(order => {
      const uncanceledOrders = this.state.orders.filter(order => order.id !== id)
      this.setState({ orders: uncanceledOrders })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder 9000</h1>
          <OrderForm addBurrito={this.addBurrito}/>
        </header>

        <Orders orders={this.state.orders} cancelOrder={this.cancelOrder}/>
      </main>
    );
  }
}


export default App;
