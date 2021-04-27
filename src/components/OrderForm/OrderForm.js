import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name:this.state.name,
      ingredients:this.state.ingredients,
    }
    if (!newOrder.name || !newOrder.ingredients.length) {
      alert("Please fill out the order form completely. Do it! YOU MUST DO IT!")
    } else {
      this.props.addOrder(newOrder)
      this.clearInputs();
    }
  }

  handleNameChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleIngredientChange = event => {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients,  event.target.name ]});
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} data-cy={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p data-cy='order' >Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button data-cy='orderButton' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
