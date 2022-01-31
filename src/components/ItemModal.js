import React, {Component} from 'react';
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Modal,
    Form
} from 'reactstrap';
import {connect} from 'react-redux';
// import {v1 as uuid} from 'uuid';
import {addItem} from '../action/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
       isAuthenticated: PropTypes.bool 
    }

    toggle = () => {
        this.setState({
            modal:!this.state.modal 
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name:this.state.name
        }

        //pass to the action
        this.props.addItem(newItem);

        //close the modal
        this.toggle();
    }


    render(){
        return(
            <div>
                { this.props.isAuthenticated ? <Button onClick={this.toggle} style={{marginBottom:'2rem'}} color='dark'>
                    Add Item
                </Button> : <h4 className='mb-3 ml-4'>Please Login to Add and Manage Items</h4>}
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input id='item' type='text' name='name' placeholder='Add the Item' onChange={this.onChange}/>
                                <Button color='dark' block style={{marginTop:'2rem'}}>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item:state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModal);