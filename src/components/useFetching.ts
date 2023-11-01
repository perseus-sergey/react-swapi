import { Component } from 'react';

export class useFetching extends Component {
  state = {
    isLoading: false,
    error: '',
  };

  getState() {
    return { fetching: this.fetching, isLoading: this.state.isLoading, error: this.state.error };
  }

  constructor(public props: { callback: () => Promise<void> }) {
    super(props);
  }

  fetching = async () => {
    try {
      this.setState({ ...this.state, isLoading: true });
      await this.props.callback();
    } catch (e) {
      const error = e as Error;
      this.setState({ ...this.state, error: error.message });
    } finally {
      this.setState({ ...this.state, isLoading: false });
    }
  };
}
