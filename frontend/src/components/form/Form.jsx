import React, { Component } from "react";
import Popup from "../popup/Popup";
import AuthService from "../../services/AuthService";
import styles from "./Form.module.scss";

const initialState = {
  username: "",
  password: "",
  warningMessage: "",
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getService(type) {
    switch (type) {
      case "login":
        return this.service.login;
        break;
      case "signup":
        return this.service.signup;
        break;
      default:
        return;
    }
  }

  getTitle(type) {
    switch (type) {
      case "login":
        return "Log in";
      case "signup":
        return "Sign up Today";
      default:
        return "";
    }
  }

  getBtn(type) {
    switch (type) {
      case "login":
        return "Log in";
      case "signup":
        return "Sign up";
      default:
        return "";
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    this.validate(username, password);
  }

  validate(username, password) {
    let valid = true;
    const service = this.getService(this.props.type);

    service(username, password)
      .catch((error) => {
        this.setState({ warningMessage: error.response.data.message });
        valid = !error;
      })
      .then(() => {
        if (valid) {
          this.handleClose();
          // this.props.getUser();
          // this.props.history.push("/firstpage");
        }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ warningMessage: "" });
  };

  handleClose() {
    this.props.handleClose();
    this.clearData();
  }

  clearData() {
    this.setState(initialState);
  }

  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        submitBtn={this.getBtn(this.props.type)}
        title={this.getTitle(this.props.type)}
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmit}
        error={!!this.state.warningMessage}
      >
        <div className={styles.content}>
          <div>
            <legend>Username</legend>
            <input
              required
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
              className={!!this.state.warningMessage ? styles.error : ""}
            />
          </div>
          <div>
            <legend>Password</legend>
            <input
              required
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              className={!!this.state.warningMessage ? styles.error : ""}
            />
          </div>
          <div className={styles["warning-message"]}>
            {this.state.warningMessage}
          </div>
        </div>
      </Popup>
    );
  }
}
