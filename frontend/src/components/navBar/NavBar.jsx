import styles from "./NavBar.module.scss";
import React, { Component } from "react";
import Form from "../form/Form";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { btnType: null };
  }

  doTheLogout() {
    this.props.pleaseLogOut().then(() => {
      this.props.getUser();
    });
  }

  setBtnType(btnType) {
    this.setState({ btnType });
  }

  handleClose() {
    this.setState({ btnType: null });
  }

  render() {
    return (
      <div className={styles["nav-container"]}>
        <div>
          <button
            className={styles.btn}
            onClick={() => this.setBtnType("login")}
          >
            Login
          </button>
          <button
            className={styles.btn}
            onClick={() => this.setBtnType("signup")}
          >
            Sign up
          </button>
        </div>
        <Form
          trigger={!!this.state.btnType}
          type={this.state.btnType}
          handleClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

export default NavBar;
