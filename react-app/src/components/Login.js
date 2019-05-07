import React from "react";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid gray;
  color: gray;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Div = styled.div`
  margin-top: 100px;
`;

const Input = styled.input`
  width: 20%;
  height: 40px;
  border: 2px solid gray;
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      users: []
    };
  }

  login = obj => {
    obj = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:9999/api/users/login", obj)
      .then(res => {
        console.log(res);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      username: "",
      password: ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <Div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <Input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button className="btn btn-primary">Log In</Button>
        </form>
      </Div>
    );
  }
}

export default Login;
