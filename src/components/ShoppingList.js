import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../action/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    // setting up the props
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired 
    }
 
    componentDidMount() {
        this.props.getItems();
    }
    

    //bind() method creats a new function and passes the "this" as props to be used in function called
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render(){
        const items = this.props.item.items; //item = [ items:{}]
        return(
            <Container className='mb-5'>
                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button className='remove-btn' color='danger' size='sm' onClick={this.onDeleteClick.bind(this, _id)}>X</Button> : null}
                                    
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
 