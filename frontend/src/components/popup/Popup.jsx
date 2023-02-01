import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./Popup.module.scss";

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.trigger}
        onHide={this.props.handleClose}
        contentClassName={`${styles["custom-modal-content"]} ${
          this.props.error ? styles.error : ""
        }`}
      >
        <div className={styles.content}>
          <Modal.Header className={styles.header}>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className={styles.body}>{this.props.children}</Modal.Body>

          <Modal.Footer className={styles.footer}>
            <button
              onClick={this.props.handleClose}
              className={styles.secondary}
            >
              Close
            </button>
            <button
              type="submit"
              onClick={this.props.handleSubmit}
              className={styles.primary}
            >
              {this.props.submitBtn}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}
