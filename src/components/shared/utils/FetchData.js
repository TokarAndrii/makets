import { Component } from 'react';

export default class FetchData extends Component {
  state = {
    results: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const { url } = this.props;
    this.fetchData(url);
  }

  fetchData(url) {
    this.setState({ loading: true });
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(err => this.setState({ error: err, loading: false }));
  }

  render() {
    const { children } = this.props;
    const { results, loading, error } = this.state;
    return children({
      results,
      loading,
      error,
    });
  }
}
