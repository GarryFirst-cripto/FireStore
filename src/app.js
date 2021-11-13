import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, styled, Paper } from '@material-ui/core';
import firebase from 'firebase/app';
import { runTransaction } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyZR27QF1M7atorDTkUp8B5hsdb_dztok",
  authDomain: "my-awesome-project-28358.firebaseapp.com",
  projectId: "my-awesome-project-28358",
  storageBucket: "my-awesome-project-28358.appspot.com",
  messagingSenderId: "12429520022",
  appId: "1:12429520022:web:ab46f98e89b93a2105a6b7",
  measurementId: "G-7FN26VF36Y"
};
firebase.initializeApp(firebaseConfig);
const countRef = firebase.firestore().collection("events").doc("Fa");

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to right bottom, #4300a9, #82ffa1)'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
    width: '340px',
    height: '200px',
    boxShadow: '4px 4px 8px 0px rgba(200, 200, 200, 0.7)'
  },
  text: {
    fontSize: '50px',
    fontWaight: 700,
    color: '#565FFF'
  },
  button: {
    width: '90%',
    marginTop: 15,
    background: 'linear-gradient(to right bottom, #565fff, #366fcc)',
    color: 'white',
    fontFamily: 'Gilroy',
    fontSize: '20px',
    fontWaight: 600
  }
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const App = props => {
  const { classes } = props;
  const [count, setCount] = React.useState(0);

  const handleClick = async () => {
    firebase.firestore().runTransaction(async (t) => {
      const { count } = await (await t.get(countRef)).data();
      t.update(countRef, { count: count + 1 });
    });
  }

  const handleReset = async () => {
    countRef.set({count: 0});
  }

  React.useEffect(() => {
    firebase.firestore().collection("events").doc("Fa")
      .onSnapshot((snapshot) => {
        const { count: newCount } = snapshot.data();
        setCount(newCount);
      });
  }, []);

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Item className={classes.item}>
          <Typography noWrap className={classes.text}>
            events : {count}
          </Typography>
          <Button variant="contained" className={classes.button} onClick={handleClick}>Increment (+)</Button>
          <Button variant="contained" className={classes.button} onClick={handleReset}>Reset</Button>
        </Item>         
      </Box>
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
