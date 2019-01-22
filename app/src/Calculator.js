import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Input, Label, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualInterestRate: 0,
      processingFee: 0,
      otherExpenses: 0,
      timeLimit: 0,
      amount: 0,
      processingFeeTotal: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
	const { target: { name, value } } = event;
    this.setState({ [name]: value});
  }

  pmt() {
    const { annualInterestRate, timeLimit, amount } = this.state;
    const rate = annualInterestRate / 1200; // calculates monthly interest rate as a number
    const pow = Math.pow((1 + rate), timeLimit);
    return -(rate * amount * pow) / (1 - pow);
  }

  totalInterest() {
    const { timeLimit, amount } = this.state;
    return this.pmt() * timeLimit - amount; 
  }

  averageInterestRate() {
    const { timeLimit, amount } = this.state;
	return ((this.totalInterest() / amount) / (timeLimit / 12)) * 100; 
  }

  processingFeeTotal() {
    const { processingFee, amount } = this.state;
    return amount * processingFee / 100;
  }

  total() {
	const { otherExpenses, amount } = this.state;
	console.log(otherExpenses + this.processingFeeTotal() + this.totalInterest());
	console.log(amount);
    return +otherExpenses + +this.processingFeeTotal() + +this.totalInterest() + +amount;
  }

  render() {
    return <div>
      <AppNavbar/>
      <Container>
        <h2>Monthly rate calculator</h2>
        <Row>
          <Col>
            <Label for="annualInterestRate">Annual interest rate in %</Label>              
          </Col>
          <Col>
            <Input type="number" name="annualInterestRate" id="annualInterestRate" 
              min="0" max="100" step="0.01" onChange={this.handleChange} autoComplete="annualInterestRate"/>                
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="processingFee">Processing fee in %</Label>
          </Col>
          <Col>
            <Input type="number" name="processingFee" id="processingFee"
              min="0" max="100" step="0.01" onChange={this.handleChange} autoComplete="processingFee"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="otherExpenses">Other expenses - annual loan maintenance</Label>
          </Col>
          <Col>
            <Input type="number" name="otherExpenses" id="otherExpenses"
              onChange={this.handleChange} autoComplete="otherExpenses"/>                
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="timeLimit">Time limit (months)</Label>
          </Col>
          <Col>
            <Input type="number" name="timeLimit" id="timeLimit"
              min="1" onChange={this.handleChange} autoComplete="timeLimit"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="amount">Amount</Label>
          </Col>
          <Col>
            <Input type="number" name="amount" id="amount"
            	onChange={this.handleChange} autoComplete="amount"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="monthlyPayment">Monthly payment</Label>
          </Col>
          <Col>
            <Input type="number" name="monthlyPayment" id="monthlyPayment" value={this.pmt() || ''} autoComplete="monthlyPayment" readOnly/>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <Label for="totalInterest">The total interest paid by the client</Label>
          </Col>
          <Col>
            <Input type="number" name="totalInterest" id="totalInterest" value={this.totalInterest() || ''} autoComplete="totalInterest" readOnly/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="averageInterestRate">Average interest rate on an annual basis in %</Label>
          </Col>
          <Col>
            <Input type="number" name="averageInterestRate" id="averageInterestRate" value={this.averageInterestRate() || ''} autoComplete="averageInterestRate" readOnly/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="processingFeeTotal">Processing fee</Label>
          </Col>
          <Col>
            <Input type="number" name="processingFeeTotal" id="processingFeeTotal" value={this.processingFeeTotal() || ''} autoComplete="processingFeeTotal" readOnly/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="otherExpensesTotal">Other expenses - annual loan maintenance</Label>
          </Col>
          <Col>
            <Input type="number" name="otherExpensesTotal" id="otherExpensesTotal" value={this.state.otherExpenses || ''} autoComplete="otherExpensesTotal" readOnly/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="total">TOTAL principal + expenses</Label>
          </Col>
          <Col>
            <Input type="number" name="total" id="total" value={this.total() || ''} autoComplete="total" readOnly/>
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default withRouter(Calculator);
