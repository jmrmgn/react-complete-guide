import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Person.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
   constructor(props) {
		super(props);
		console.log("[Person.js] inside constructor", props);
	}

	componentWillMount() {
		console.log('[Person.js] inside componentWillMount()');
	}

	componentDidMount() {
      console.log('[Person.js] inside componentDidMount()')
      if ( this.props.position === 0 ) {
         this.inputElement.focus();
      }
   }
   
   render() {
      console.log('[Person.js] inside render()')
      return (
         <Aux>
            <AuthContext.Consumer>
               {auth => auth ? <p>I'm authenticated</p> : null}
            </AuthContext.Consumer>
            <p>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input
               ref={(inp)=> { this.inputElement = inp }}
               type="text"
               onChange={this.props.changed}
               value={this.props.name}
            />
            <button className={styles.btnRemove} onClick={this.props.click}>Remove</button>
         </Aux>
      )
      // return [
      //    <p key="1">I'm a {this.props.name} and I am {this.props.age} years old!</p>,
      //    <p key="2">{this.props.children}</p>,
      //    <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />,
      //    <button key="4" className={styles.btnRemove} onClick={this.props.click}>Remove</button>
      // ]
   }
}

// npm install --save prop-types
// [OPTIONAL] Setting the right types to be given by the props
Person.propTypes = {
   click: PropTypes.func,
   name: PropTypes.string,
   age: PropTypes.number,
   changed: PropTypes.func
}

export default withClass(Person, styles.Person);