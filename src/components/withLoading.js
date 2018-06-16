import React, { Component } from 'react';
import Loading from '../components/Loading';
import Screen from '../components/Screen';

const withLoading = (WrappedComponent) => {
  return class extends Component {
    render() {
      const { data } = this.props;
      if (data.pending) {
        return (
          <Screen>
            <Loading/>
          </Screen>
          );
      }
    
      if (data.rejected) {
        console.error(data.reason);
        return (
          <Screen>
            <h1>Unable to fetch data</h1>
            <h2>{data.reason.toString()}</h2>
          </Screen>
        );
      }
    
      console.log(data.value);
      
      return (
        <WrappedComponent {...this.props} data={data.value}/>
      );
    }
  }
}

export default withLoading;