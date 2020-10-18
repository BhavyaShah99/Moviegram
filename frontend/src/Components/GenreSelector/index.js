import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Modal } from 'react-bootstrap';


class GenreSelector extends React.Component{
    render(){
        return(
        <Modal
        show={this.props.signup.state.genresShow}
        onHide={() => this.props.signup.setState({genresShow: false})}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Select your favourite Genres
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="checkBoxesContainer">
              {this.props.signup.genreNames.map( (obj) => {
                 return(<FormControlLabel key={obj}
                 control={
                   <Checkbox 
                             checked={this.props.signup.state.genres[obj]} 
                             onChange={() => this.props.signup.setState(prevState => {
                               let genres = Object.assign({}, prevState.genres);  
                               genres[obj] = !genres[obj]                  
                               return { genres };                                 
                             })} 
                             value="Horror" />
                           
                 }
                 label={obj}
               />);
              }
              )}
             
          </FormGroup>
        </Modal.Body>
      </Modal>);
    }
}
export default GenreSelector;
