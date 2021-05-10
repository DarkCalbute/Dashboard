import React from "react";
import Field from "./Field.jsx";
import { authentificationService } from "../services/authentification.service.js";

export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    authentificationService.register(this.state.email, this.state.username, this.state.password);
  }

  isDisabled(state) {
    return (
      (state.username.length === 0 ||
        state.email.length === 0 ||
        state.password.length === 0) === true
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        >
          Email:
        </Field>
        <Field
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        >
          Username:
        </Field>
        <Field
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        >
          Password:
        </Field>
        <input
          className="btn btn-primary mb-3 mx-3"
          disabled={this.isDisabled(this.state)}
          type="submit"
          value="Sign Up"
        />
      </form>
    );
  }
}
