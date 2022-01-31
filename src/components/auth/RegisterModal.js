import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Modal,
    Form,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import { register } from '../../action/authAction';
import { clearErrors } from '../../action/errorAction';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            //check for regoster error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg:null});
            }
        }

        //if authenticated, close the modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }


    toggle = () => {
        //clear errors
        this.props.clearErrors();
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

        const {name, email, password} = this.state;
        const newUser = {
            name,
            email,
            password
        }

        //attempt to register
        this.props.register(newUser);

        //cose?
    }


    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input className='mb-3' id='name' type='name' name='name' placeholder='Name' onChange={this.onChange}/>
                                
                                <Label for="email">Email</Label>
                                <Input className='mb-3'id='email' type='email' name='email' placeholder='Email' onChange={this.onChange}/>
                                
                                <Label for="password">Password</Label>
                                <Input className='mb-3' id='password' type='password' name='password' placeholder='Password' onChange={this.onChange}/>
                                
                                <Button color='dark' block style={{marginTop:'2rem'}}>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);