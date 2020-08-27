import React from 'react';
import Container from './Container';
import { Button, Input } from 'antd';
import './Header.css';


const header = (props) => (
    <div className='header'>
        <Container>
            <div className='item'>
                <Button 
                    className='button' 
                    size="large" 
                    type='primary'>
                        Add new user
                </Button>
                <Input.Search 
                    className='searchField' 
                    size="large" 
                    placeholder="Search user" 
                    enterButton />
            </div>          
        </Container>
    </div>
);

export default header;