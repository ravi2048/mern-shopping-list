import React, { Component, Fragment } from 'react';
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import { Logout } from "./auth/Logout";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const AppNavbar = () => {
//     return(
//         <div>
//             hisa
//         </div>
//     )
// }
//child class => AppNavbar
//parent class => Component
class AppNavbar extends Component {
    // constructor(props) {
    //     super(props);
    // constructor is for maintaining the state of parameters which are bind to 'this' method
    // }

    state = {
        isOpen: false
    }

    static propTypes = {
        auth:PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const github = (
            <Fragment>
                <NavItem>
                    <NavLink href='https://github.com/ravi9230' target={"_blank"}>Github</NavLink>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )
        return(
            <div>
                <Navbar color='dark' dark expand="md" className='mb-5'>
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ms-auto" navbar>
                                {isAuthenticated ? github : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar);