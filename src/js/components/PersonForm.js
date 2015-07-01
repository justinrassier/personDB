"use strict";

var React = require('react');
var Person = require('../models/Person');
var PersonActions = require('../actions/PersonActions');
var AddressForm = require('./AddressForm');
var Address = require('../models/Address');

var PersonForm = React.createClass({
  getInitialState: function() {
    return {
      person: new Person(),
      buttonDisabled: false
    };
  },
  componentDidMount: function() {
    React.findDOMNode(this.refs.firstName).focus();
  },
  render: function() {

    var addressForms = this.state.person.addresses.map(function(address){
      return <AddressForm address={address}/>;
    });

    return (
      <form onSubmit={this.savePerson}>
        <input onChange={this.handleInputChange.bind(this, 'firstName')} placeholder="First Name" ref="firstName" type="text" value={this.state.person.firstName}/>
        <input onChange={this.handleInputChange.bind(this, 'lastName')} placeholder="Last Name" type="text" value={this.state.person.lastName}/>
        <button onClick={this.addAddressForm}>Add Address</button>
        {addressForms}
        <input disabled={this.state.buttonDisabled} type="submit" value="Save Person"/>
      </form>
    );

  },
  handleInputChange: function(field, e) {
    var newState = this.state;
    newState.person[field] = e.target.value;
    newState.buttonDisabled = (!newState.person.firstName && !newState.person.lastName);
    this.setState(newState);
  },
  addAddressForm: function(e){
    e.preventDefault();
    var newState = this.state;
    newState.person.addresses.push(new Address());
    this.setState(newState);
  },
  savePerson: function(e) {
    e.preventDefault();

    //fill out our person and call up to the main app to save
    var p = new Person();
    p.firstName = this.state.person.firstName.trim();
    p.lastName = this.state.person.lastName.trim();
    if (p.firstName || p.lastName) {
      PersonActions.create(this.state.person);
      this.setState({
        person: new Person(),
        buttonDisabled: false
      });
      React.findDOMNode(this.refs.firstName).focus();
    }

    return;
  }
});

module.exports = PersonForm;
