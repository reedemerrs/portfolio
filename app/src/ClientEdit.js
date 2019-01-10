import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Textarea as MdTextarea } from 'reactstrap-md-textarea';
import AppNavbar from './AppNavbar';

class ClientEdit extends Component {
  emptyItem = {
    name: '',
    email: '',
    phoneNumber: '',
    identificationNumber: '',
    constactPerson: '',
    lastContactDate: '',
    incomeLevel: '',
    status: '',
    municipality: '',
    description: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      municipalityOpen: false,
      incomeLevelOpen: false,
      statusOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.changeDropdownValue = this.changeDropdownValue.bind(this);
  }
  
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const client = await (await fetch(`/api/clients/${this.props.match.params.id}`)).json();
      this.setState({item: client});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  changeDropdownValue(event) {
    const currentTarget = event.currentTarget;
    let item = {...this.state.item};
    item[currentTarget.closest('[id]').id] = currentTarget.textContent;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    if (!item.incomeLevel) {
      alert('Income Level must be selected!');
      return false;
    }
    if (!item.status) {
      alert('Status must be selected!');
      return false;
    }
    if (!item.municipality) {
      alert('Municipality must be selected!');
      return false;
    }
    await fetch('/api/clients' + ((item.id) ? '/' + (item.id) : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/clients');
  }

  toggleDropdown(event) {
    const dropdownOpen = event.currentTarget.closest('[id]').id + 'Open';
    this.setState(prevState => ({
      [dropdownOpen]: !prevState[dropdownOpen]
    }));
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''} required
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input type="number" pattern="^(0\\d{2}\\\\)(\\d{3}-\\d{4})|(\\d{2}-\\d{3})|(\\d{3}-\\d{3})$" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
                   onChange={this.handleChange} autoComplete="phoneNumber"
                   title="Please insert a valid phone number!"/>
          </FormGroup>
          <FormGroup>
            <Label for="identificationNumber">Identification Number</Label>
            <Input type="text" pattern="[0-9]{8}" maxLength="8" name="identificationNumber" id="identificationNumber" value={item.identificationNumber || ''}
                   onChange={this.handleChange} autoComplete="identificationNumber" required
                   title="Identification Number should contain exactly 8 numbers!"/>
          </FormGroup>
          <FormGroup>
            <Label for="contactPerson">Contact Person</Label>
            <Input type="text" name="contactPerson" id="contactPerson" value={item.contactPerson || ''}
                   onChange={this.handleChange} autoComplete="contactPerson"/>
          </FormGroup>
          <FormGroup>
            <Label for="lastContactDate">Last Contact Date</Label>
            <Input type="date" name="lastContactDate" id="lastContactDate" value={item.lastContactDate || ''}
                   onChange={this.handleChange} autoComplete="lastContactDate"/>
          </FormGroup>
          <FormGroup>
            <Label for="incomeLevel">Income Level</Label>
            <Dropdown id="incomeLevel" isOpen={this.state.incomeLevelOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                {this.state.item.incomeLevel || 'Select income level'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.changeDropdownValue}>TO_200K</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>FROM_200K_TO_500K</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>OVER_MILLION</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>OVER_2_MILLION</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Dropdown id="status" isOpen={this.state.statusOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                {this.state.item.status || 'Select status'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.changeDropdownValue}>NOT_USING_LOANS</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>MEETING</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>APPLICATED</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>CALL_PERIODICALLY</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>CONTACTED_VIA_PHONE</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="municipality">Municipality</Label>
            <Dropdown id="municipality" isOpen={this.state.municipalityOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>
                {this.state.item.municipality || 'Select municipality'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.changeDropdownValue}>CUKARICA</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>NOVI_BEOGRAD</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>PALILULA</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>RAKOVICA</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>SAVSKI_VENAC</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>STARI_GRAD</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>VOZDOVAC</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>VRACAR</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>ZEMUN</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>ZVEZDARA</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>BARAJEVO</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>GROCKA</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>LAZAREVAC</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>MLADENOVAC</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>OBRENOVAC</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>SOPOT</DropdownItem>
                <DropdownItem onClick={this.changeDropdownValue}>SURCIN</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <MdTextarea name="description" id="description" value={item.description || ''}
                        onChange={this.handleChange} autoComplete="description"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ClientEdit);
