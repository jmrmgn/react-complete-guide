import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary'; // responsible for Error handling

class App extends Component {
  // 'state' is reserve word
  state = {
    persons: [
      { id: 'a23', name: 'Max', age: 4 },
      { id: 'b12', name: 'Jomar', age: 24 },
      { id: 'c45', name: 'Gian', age: 22 }
    ],
    otherState: 'some other value',
    showPersons: false,
    notif: 'Click "remove" to remove the person!'
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
      persons: persons,
      notif: this.state.persons[personIndex].name + ' is successfully removed!'
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    let persons = null;
    let btnClass = '';
    if ( this.state.showPersons ) {

      persons = (
        <div>
          <br /><br />
          <div className={styles.notif}>
            <small>{this.state.notif}</small>
          </div>
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
      
      btnClass = styles.Red;
    }

    // let classes = ['red', 'bold'].join(' '); // return "red bold"
    const classes = [];
    if ( this.state.persons.length <= 2) {
      classes.push(styles.red); // classes = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push(styles.bold); // classes = ['red', 'bold]
    }

    return (
        <div className={styles.App}>
          <h1>Hi, I'm a React App.</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'This may work now'));
  }
}

export default App;
