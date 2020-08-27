import React, { Component } from 'react';
import './App.css';
import { Table, Spin } from 'antd';
import moment from 'moment';
import Container from './Container';
import Header from './Header'

class App extends Component {

  state = {
    users: [],
    isLoading: true
  }

  async componentDidMount() {
    const response = await fetch('/api/users')
    const body = await response.json();
    this.setState({users: body, isLoading: false})
    
  }
  render() {
    const { users, isLoading } = this.state;

    if(isLoading) {
      return (
        <div className="spinner">
          <Spin tip="Loading..." size="large"/>
        </div>
      );
    }
    
    if( users && users.length ) {

      const columns = [
        {
          title: 'First name',
          dataIndex: 'firstName',
          key: 'firstName',
          sorter: (a, b) => a.firstName.localeCompare(b.firstName),
          sortDirections: ['descend', 'ascend'],
      
        },
        {
          title: 'Last name',
          dataIndex: 'lastName',
          key: 'lastName',
          sorter: (a, b) => a.lastName.localeCompare(b.lastName),
          sortDirections: ['descend', 'ascend'],
          
        },
        {
          title: 'Date of birth',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
          sortDirections: ['descend', 'ascend'],
          
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => a.email.localeCompare(b.email),
          sortDirections: ['descend', 'ascend'],
          
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          sorter: (a, b) => a.address.localeCompare(b.address),
          sortDirections: ['descend', 'ascend'],
          
        },
      ];

      return (
        
        <Container>
          <h1>EE homework</h1>
          <Header></Header>
          <Table 
            style={{marginTop: '120px'}}
            dataSource={users} 
            columns={columns} 
            rowKey='id' 
            pagination={false} />
        </Container>
      );
    }
    return (
      <h1>No Users found</h1>
      );
  }
}

export default App;
