import React from "react";
import Field from "./Field.jsx";
import { authentificationService } from "../services/authentification.service.js";

export class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
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
    authentificationService.login(this.state.user, this.state.password);
  }

  isDisabled(state) {
    return (
      (state.user.length === 0 ||
        state.password.length === 0) === true
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="user" value={this.state.user} onChange={this.handleChange}>
          Username/Email:
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
          value="Sign In"
        />
      </form>
    );
  }
}
