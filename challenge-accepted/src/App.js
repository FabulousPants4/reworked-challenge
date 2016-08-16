import React, { Component } from 'react';
import './App.css';

var data = [
  {name: 'Jimmy', age: 24}, {name:'Janice', age: 28}
]

var Input = React.createClass({
  getInitialState: function() {
    return {value: ''}
  },
  handleChange: function(e) {
    e.preventDefault();
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
  getInitialState: function() {
    return {data : this.props.data};
  },

  render: function() {
    var listItems =this.state.data.map(function(student) {
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
    return {data : this.props.data};
  },

  addStudent: function () {
    const temp = this.state.data;
    const stud ={};
    stud.name ='Austin'; {/*replace with code that gets the value of nameInput*/}
    stud.age = 23; {/*replace with code that gets the state of ageInput*/}
    temp.push(stud);
    this.setState(temp);
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
      <div>
        <StudentList data={data} />
      </div>
    </div>
    );
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <StudentForm data={data}/>
      </div>
    );
  }
}



export default App;