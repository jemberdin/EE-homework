import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import './Header.css';

class Complete extends Component {
    render() { 

        const options = this.props.users.map( (user) => {
            return {value: `${user.firstName} ${user.lastName}`};

        });
        return ( 
            <AutoComplete
                className='searchField'
                size='large'
                options={options}
                placeholder="Search user"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            /> 
            
        );
    }
}
 
export default Complete;