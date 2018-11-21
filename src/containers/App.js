import React, { PureComponent } from 'react';
import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass  from '../hoc/withClass';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary'; // responsible for Error handling

export const AuthContext = React.createContext(false); // For global settings like authentication

class App extends PureComponent {
	constructor(props) {
		super(props);
		console.log("[App.js] inside constructor", props);
		this.state = {
			persons: [
				{ id: 'a23', name: 'Max', age: 4 },
				{ id: 'b12', name: 'Jomar', age: 24 },
				{ id: 'c45', name: 'Gian', age: 22 }
			],
			otherState: 'some other value',
			showPersons: false,
			toggleClicked: 0,
			authenticated: false
		}
	}

	// Avoid using
	componentWillMount() {
		console.log('[App.js] inside componentWillMount');
	}

	componentDidMount() {
		console.log('[App.js] inside componentDidMount')
	}

	// shouldComponentUpdate(nextProps, nextState) {
   //    console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
	// 	return nextState.persons !== this.state.persons
	// 	|| nextState.showPersons !== this.state.showPersons;
   // }

	// Avoid using
   componentWillUpdate(nextProps, nextState) {
      console.log('[UPDATE App.js] inside componentWillUpdate()', nextProps, nextState);
	}
	
	// New static method by React 16.*
	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('[UPDATE App.js] inside getDerivedStateFromProps()', nextProps, prevState);

		return prevState;
	}

	getSnapshotBeforeUpdate() {
		console.log('[UPDATE App.js] inside getSnapshotBeforeUpdate()');
	}

   componentDidUpdate() {
      console.log('[UPDATE App.js] inside componentDidUpdate()');
   }

	// 'state' is reserve word
	// state = {
	// 	persons: [
	// 		{ id: 'a23', name: 'Max', age: 4 },
	// 		{ id: 'b12', name: 'Jomar', age: 24 },
	// 		{ id: 'c45', name: 'Gian', age: 22 }
	// 	],
	// 	otherState: 'some other value',
	// 	showPersons: false,
	// }

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
		// Better approach of this.setState
		this.setState( (prevState, props) => {
			return {
				showPersons: !doesShow,
				toggleClicked: prevState.toggleClicked + 1
			}
		});
	}

	loginHandler = () => {
		this.setState({
			authenticated: true
		});
	}

	render() {
		console.log('[App.js] inside render');
		let persons = null;

		if ( this.state.showPersons ) {

			persons = <Persons
					persons={this.state.persons}
					clicked={this.deletePersonHandler}
					changed={this.nameChangeHandler} />
			
		}

		return (
			<Aux>
				<button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
				<Cockpit
					appTitle={this.props.title}
					showPersons={this.state.showPersons}
					persons={this.state.persons}
					clicked={this.togglePersonsHandler}
					login={this.loginHandler}
				/>
				<AuthContext.Provider value={this.state.authenticated}>
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
		// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'This may work now'));
	}
}

export default withClass(App, styles.App);
