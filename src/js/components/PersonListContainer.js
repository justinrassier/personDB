"use strict";
var React = require('react');
var PersonList = require('./PersonList');
var PersonStore = require('../stores/PersonStore');

var PersonListContainer = React.createClass({
  getInitialState: function() {
    return {
      people: []
    };
  },
  componentDidMount: function(){
    PersonStore.getAllPeople().then(function(data){
      this.setState({
          people: data
      });
    }.bind(this), function(err){
      console.log(err);
    });
  },
  render: function() {
    return (
      <div>
        <PersonList people={this.state.people}/>
      </div>
    );
  }
});

module.exports = PersonListContainer;