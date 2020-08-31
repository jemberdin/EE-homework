import React from 'react';
import Container from './Container';
import { Button } from 'antd';
import './Header.css';
import Complete from './Complete';

const header = (props) => (
    
    <div className='header'>
        <Container>
            <Button 
                className='button' 
                size='large'
                type='primary'
                onClick={() => props.handleAddUserClickEvent()}>
                Add new user
            </Button>
            <Complete users={props.users}/>
        </Container>
        
    </div>
);

export default header;