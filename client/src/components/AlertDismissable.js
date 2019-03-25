import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

class AlertDismissible extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      success: false
    };
  }

  componentDidMount() {
    const success = this.props.success;
    this.setState({ success });
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });

    if (this.state.success) {
      return (
        <>
          <Alert show={this.state.show} variant="success">
            <Alert.Heading>Registration Success!</Alert.Heading>
            <p>Please login to continue</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={handleHide} variant="outline-success">
                Close
              </Button>
            </div>
          </Alert>

          {!this.state.show && <Button onClick={handleShow}>Show Alert</Button>}
        </>
      );
    } else {
      return (
        <>
          <Alert show={this.state.show} variant="danger">
            <Alert.Heading>Registration Failed!</Alert.Heading>
            <p>Please try again!</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={handleHide} variant="outline-danger">
                Close
              </Button>
            </div>
          </Alert>

          {!this.state.show && <Button onClick={handleShow}>Show Alert</Button>}
        </>
      );
    }
  }
}
export default AlertDismissible;
