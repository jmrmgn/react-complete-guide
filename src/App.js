import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  // 'state' is reserve word
  state = {
    persons: [
      { id: 'a23', name: 'Max', age: 4 },
      { id: 'b12', name: 'Jomar', age: 24 },
      { id: 'c45', name: 'Gian', age: 22 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    // find method to find the certain data
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id; // index position
    });

    const person = {
      ...this.state.persons[personIndex] // returns the person object based on the personIndex
    }

    // // Old approach of the upper method
    // // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value; // simply changing the value based on the person object given

    const persons = [...this.state.persons]; // spread again into the reference object persons
    persons[personIndex] = person; // update the selected person base on the PersonIndex

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    // slice method is copying an array in a new array
    // const persons = this.state.persons.slice(); // Vanilla Javascript
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      color: 'white'      
    }

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return (
              <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
            );
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    // let classes = ['red', 'bold'].join(' '); // return "red bold"
    const classes = [];
    if ( this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1>Hi, I'm a React App.</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'This may work now'));
  }
}

export default App;
