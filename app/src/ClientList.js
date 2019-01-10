import React, { Component } from 'react';
import { Button, ButtonGroup, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Axios from 'axios';

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], 
      pages: null, 
      loading: true
    };
    this.remove = this.remove.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async remove(id) {
    await fetch(`/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedData = [...this.state.data].filter(i => i.id !== id);
      this.setState({data: updatedData});
    });
  }

  fetchData(state, instance) {
    this.setState({ loading: true });
    Axios.get('api/clients', {
      params: {
        page: state.page,
        size: state.pageSize,
        orderBy: state.sorted.length > 0 ? state.sorted[0].id : 'name',
        direction: state.sorted.length > 0 && state.sorted[0].desc ? 'DESC' : 'ASC',
        filter: state.filtered.length > 0 ? state.filtered[0].id + ':' + state.filtered[0].value : null 
      }
    }).then(res => {
      this.setState({
        data: res.data.content,
        pages: res.data.totalPages,
        loading: false,
        page: res.data.number,
        size: res.data.size
      });
    });
  }

  render() {
    const { data, pages, loading } = this.state;
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Identification Number',
      accessor: 'identificationNumber',
      sortable: false
    }, {
      Header: 'Last Contact Date',
      accessor: 'lastContactDate',
      filterable: false
    }, {
      Header: 'Status',
      accessor: 'status',
      filterable: false
    }, {
      Header: 'Email',
      accessor: 'email',
      sortable: false
    }, {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
      sortable: false
    }, {
      Header: 'Income Level',
      accessor: 'incomeLevel',
      filterable: false
    }, {
      id: 'actions',
      Header: 'Actions',
      sortable: false,
      filterable: false,
      accessor: client =>  
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
        </ButtonGroup>
    }]

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
          </div>
          <h3>Portfolio</h3>
          <ReactTable
            manual 
            data={data}
            pages={pages}
            loading={loading}
            columns={columns}
            onFetchData={this.fetchData}
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
            multiSort={false}
          />
        </Container>
      </div>
    );
  }
}

export default ClientList;
