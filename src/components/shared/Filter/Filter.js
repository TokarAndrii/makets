import React, { Component } from 'react';
import './style.css';

const INITIAL_STATE = {
  filter: '',
};

class Filter extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { onFilterChange } = this.props;

    onFilterChange(e.target.value);
  };

  render() {
    const { placeholder, filter } = this.props;

    return (
      <input
        className="filterInput"
        placeholder={placeholder}
        type="text"
        name="filter"
        value={filter}
        onChange={this.handleChange}
      />
    );
  }
}

export default Filter;
