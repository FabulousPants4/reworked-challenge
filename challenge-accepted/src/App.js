import React, { Component } from 'react';
import './App.css';

var data = [
  {name: 'Jimmy', age: 24}, {name:'Janice', age: 28}, {name: 'Carrie', age: 21}, {name: 'Austin', age: 23}
]
var StudentForm = React.createClass({
  handleChange: function(e) {
    this.props.onchange(e.target.value);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.handleAdd();
  },
  setName: function(n) {
    this.props.handleName(n)
  },
  setAge: function(a) {
    this.props.handleAge(a)
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name: </label>
          <Input id='nameInput' onChange={this.setName} />
          <label>Age: </label>
          <Input id='ageInput'  onChange={this.setAge} />
          <div>
            <input type='submit' value ='Add'/>
          </div>
        </form>
      </div>
    );
  }
});

var Button = React.createClass({
  handleClick: function() {
    this.props.handleClick(this.props.id)
  },
  render: function() {
    return(
      <button onClick={this.handleClick}>
        {this.props.text}
      </button>
      )
  }
});

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

  removeStudent: function(id){
    this.props.removeStudent(id)
  },

  render: function() {
    var listItems =this.state.data.map((student,i) => <div><Student id={i} age={student.age} name={student.name}/><Button handleClick={this.removeStudent} id={i} text='Remove' /></div>)
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

var Placeholder = React.createClass({
  getInitialState: function () {
    return {data : this.props.data,
            studentName: '',
            studentAge: ''
          };
  },
  removeStudent: function(id) {
    const temp=this.state.data
    this.setState(temp.splice(id,1))
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
        <StudentForm handleAdd={this.addStudent} handleName={this.setName} handleAge={this.setage}/>
        <StudentList data={data} removeStudent={this.removeStudent} />
      </div>
    );
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <Placeholder data={data}/>
      </div>
    );
  }
}



export default App;