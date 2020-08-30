import React, { Component, Fragment } from 'react';
import './App.css';
import { getAllUsers, deleteUser, updateUser } from './client';
import { Table, Spin, Modal, Button, Popconfirm } from 'antd';
import moment from 'moment';
import Container from './Container';
import Header from './Header';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import { errorNotification, successNotification } from './Notification';

class App extends Component {

  state = {
    users: [],
    isLoading: true,
    selectedUser: {},
    isAddUserModalIsVisible: false,
    isEditUserModalIsVisible: false,
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    getAllUsers()
      .then(res => res.json()
      .then(users => { this.setState({ users, isLoading: false });
      }))
      .catch(error => {
        errorNotification(error.error.message, error.error.error);
        this.setState({ isLoading: false });
      });
  }

  deleteUser = (id, firstName, lastName) => {
    deleteUser(id).then(() => {
      successNotification('User deleted', `User ${firstName} ${lastName} was deleted`);
      this.fetchUsers();
    }).catch(error => {
      errorNotification(error.error.message, error.error.error);
    });
  }

  editUser = selectedUser => {
    this.setState({ selectedUser }, () => this.showEditUserModal());
    
  }

  updateUserFormSubmitter = user => {
    updateUser(user.id, user).then(() => {
      successNotification('User updated', `User ${user.firstName} ${user.lastName} was updated`);
      this.hideEditUserModal();
      this.fetchUsers();
    }).catch(error => {
      errorNotification(error.error.message, error.error.error);
    });
  }

  showAddUserModal = () => {
    this.setState({isAddUserModalIsVisible: true});
  }

  hideAddUserModal = () => {
    this.setState({isAddUserModalIsVisible: false});
  }

  showEditUserModal = () => {
    this.setState({isEditUserModalIsVisible: true});
  }

  hideEditUserModal = () => {
    this.setState({isEditUserModalIsVisible: false});
  }

  render() {
    const { users, isLoading, isAddUserModalIsVisible, isEditUserModalIsVisible, selectedUser } = this.state;

    const commonElements = () => (
      <div>
        <h1>EE homework</h1>
        <Header handleAddUserClickEvent={this.showAddUserModal} />
        <Modal
          title='Add new user'
          visible={isAddUserModalIsVisible}
          onOk={this.hideAddUserModal}
          onCancel={this.hideAddUserModal}>
        <AddUserForm 
          onSuccess={() => {
            this.hideAddUserModal();
            this.fetchUsers();
            successNotification('User added', 'User was successfully added');
          }}
          onFailure={(error) => {
            errorNotification(error.error.message, error.error.descriprion);
          }}
          />
        </Modal>

        <Modal
          title='Edit user'
          visible={isEditUserModalIsVisible}
          onOk={this.hideEditUserModal}
          onCancel={this.hideEditUserModal} >
        <EditUserForm 
          initialValues={selectedUser} 
          submitter={this.updateUserFormSubmitter}/>
        </Modal>
      </div>
    )
    
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
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement='topRight'
                title={`Are you sure to delete user ${record.firstName} ${record.lastName}?`} 
                onConfirm={() => this.deleteUser(record.id, record.firstName, record.lastName)} okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
              <Button style={{marginLeft: '10px'}} onClick={() => this.editUser(record)}>Edit</Button>
            </Fragment>
          ),
        }
      ];

      return (
        <Container>
          {commonElements()}
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
      <Container>
        {commonElements()}
        <h2 style={{marginTop: '120px'}}>No users found</h2>
      </Container>
      );
  }
}

export default App;
