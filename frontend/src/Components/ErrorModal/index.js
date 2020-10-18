
import React from 'react';
import {Modal } from 'react-bootstrap';
import './styles.css'
class ErrorModal extends React.Component{
    render(){
        return(
          <div>
        <Modal
        show={this.props.show}
        onHide={() => this.props.closeModal()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="errorModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.error}
        </Modal.Body>
      </Modal>
          </div>
        );
    }
}
export default ErrorModal;
