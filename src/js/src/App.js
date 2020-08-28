import React, { Component } from 'react';
import './App.css';
import { getAllUsers } from './client';
import { Table, Spin, Modal } from 'antd';
import moment from 'moment';
import Container from './Container';
import Header from './Header';
import AddUserForm from './forms/AddUserForm';

class App extends Component {

  state = {
    users: [],
    isLoading: true,
    isAddUserModalIsVisible: false
  }

  fetchUsers = () => {
    getAllUsers()
      .then(res => res.json()
      .then(users => { this.setState({ users, isLoading: false });
      }))
  }

  showAddUserModal = () => {
    this.setState({isAddUserModalIsVisible: true});
  }

  hideAddUserModal = () => {
    this.setState({isAddUserModalIsVisible: false});
  }

  async componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { users, isLoading, isAddUserModalIsVisible } = this.state;

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
          <Header handleAddUserCleckEvent={this.showAddUserModal} />
          <Table 
            style={{marginTop: '120px'}}
            dataSource={users} 
            columns={columns} 
            rowKey='id' 
            pagination={false} />
          <Modal
            title="Add new user"
            visible={isAddUserModalIsVisible}
            onOk={this.hideAddUserModal}
            onCancel={this.hideAddUserModal} >
            <AddUserForm 
              onSuccess={() => {
                this.hideAddUserModal();
                this.fetchUsers();
              }}
            />
          </Modal>
        </Container>
      );
    }
    return (
      <h1>No Users found</h1>
      );
  }
}

export default App;
