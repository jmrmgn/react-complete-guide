import React from 'react';
import styles from './Cockpit.css';
import Aux from '../../hoc/Auxiliary';

const cockpit = (props) => {
   // let classes = ['red', 'bold'].join(' '); // return "red bold"
   const classes = [];
   let btnClass = styles.Button;
   // let buttonLabel = 'Show';

   if (props.showPersons) {
      btnClass = [styles.Button, styles.Red].join(' ');
      // buttonLabel = 'Hide';
   }
   
   if ( props.persons.length <= 2) {
      classes.push(styles.red); // classes = ['red']
   }

   if (props.persons.length <= 1) {
      classes.push(styles.bold); // classes = ['red', 'bold]
   }

   return (
      <Aux>
      	<h1>{props.appTitle}</h1>
         <p className={classes.join(' ')}>This is really working!</p>
         <button
            className={btnClass}
            onClick={props.clicked}>
            Toggle persons
         </button>
         <button onClick={props.login}>Log in</button>
      </Aux>
   );
}

export default cockpit;