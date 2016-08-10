import React, { Component } from 'react';
import './App.css';

var data = [
  {name: 'Jimmy', age: 24}, {name:'Janice', age: 28}
]

var Input = React.createClass({
  getInitialState: function() {
    return {value: undefined}
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  render: function() {
    return(
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange} />
      );
  }
});

var StudentList = React.createClass({
  render: function() {
    var listItems =this.props.data.map(function(student) {
      return(
        <li>
          <Student age={student.age} name={student.name}>
          </Student>
        </li>
        );
    });
    return (
      <div className="studentList">
      <h2>Students</h2>
        <ul>
        {listItems}
        </ul>
      </div>
    );
  }
});

var Student = React.createClass({
  render: function() {
    return(
      <div>
        Student name: {this.props.name} age: {this.props.age}
      </div>
  );
  }
  });

var StudentForm = React.createClass({
  getInitialState: function () {

  },

  render: function(){
    return(
    <div>
      <label>Name: </label>
      <Input id='nameInput' />
      <label>Age: </label>
      <Input id='ageInput' />
        <div>
          <button onClick={this.addStudent}>Add</button>
        </div>
    </div>
    );
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <StudentForm />
        <StudentList data={data} />
      </div>
    );
  }
}



export default App;
