import React, { Component } from 'react'

const FetchDataHoc = (datas) => (WrappedComponent) => {
    return class FetchDataHoc extends Component {
        render() {
            this.state = {
                loading: true,
                error: ''
            }
            const query = `
            mutation {
              users {
                id
              }
            }
          `;
          const url = "https://firstapis.herokuapp.com/graphql";
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
          };
          fetch(url, opts)
            .then(res => res.json())
            .then(data => this.setState({ loading: false}))
            .catch(console.error);


          return (
              <WrappedComponent loading={this.state.loading}/>
          )
            
        }
    }
}

export default FetchDataHoc
