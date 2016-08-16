import React, { Component } from 'react';
import './App.css';

var data = [
  {name: 'Jimmy', age: 24}, {name:'Janice', age: 28}
]

var Input = React.createClass({
  handleChange: function(e) {
    this.props.onChange(e.target.value);
  },
  render: function() {
    return(
      <input
        type="text"
        value={this.props.value}
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
        <div>
          <Student age={student.age} name={student.name}>
          </Student>
        </div>
        );
    });
    return (
      <div className="studentList">
      <h2>Students</h2>
        {listItems}
      </div>
    );
  }
});

var Student = React.createClass({
  render: function() {
    return(
      <div>
        Student Name: {this.props.name} Age: {this.props.age}
      </div>
  );
  }
  });

var StudentForm = React.createClass({
  getInitialState: function () {
    return {data : this.props.data,
            studentName: '',
            studentAge: ''
          };
  },

  addStudent: function () {
    const temp= this.state.data
    const stud={}
    stud.name= this.state.studentName
    stud.age= this.state.studentAge
    temp.push(stud)
    this.setState(temp)
    this.setState({studentName: '', studentAge: ''})
},
  
  setName: function(name){
    this.setState({studentName: name});
  },

  setAge: function(age) {
    this.setState({studentAge: age});
  },

  render: function(){
    return(
    <div>
      <label>Name: </label>
      <Input id='nameInput' value={this.state.studentName} onChange={this.setName} />
      <label>Age: </label>
      <Input id='ageInput' value={this.state.studentAge} onChange={this.setAge} />
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