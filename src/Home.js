
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import logo from "./logo.svg";
// import "./App.css";

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: "#f4FFFFFF"
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  app: {
    textAlign: "left"
  },
  appBar: {
    backgroundColor: "#282828",
    color: "#5DD1F1"
  },
  gridthing: {
    marginTop: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  media: {
    height: 200
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

function GridPerson({ person }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = name => {
    console.log(name);
    setOpen(false);
  };

  const [connectButtonOpen, setConnectButtonOpen] = React.useState(false);

  const connectButtonHandleOpen = () => {
    setConnectButtonOpen(true);
  };

  const connectButtonHandleClose = () => {
    setConnectButtonOpen(false);
  };

  return (
    <Grid item id={person.id} xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {person.name}
            </Typography>
            <Typography variant="body2" color="black" component="p">
              {person.description}
            </Typography>
          </CardContent>
          <CardMedia component="img" height="200" image={person.logo} />
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Connect
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Connect with {person.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connect with a student from your dream college for a short 30 minute
            session where you are available to ask any question you would like.
          </DialogContentText>
          <DialogContentText>
            Some good questions: What camps or extracurriculars did you take
            that helped you get into the college? How did you prepare for them?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("")} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose(person.name);
              connectButtonHandleOpen();
            }}
            color="primary"
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={connectButtonOpen}
        onClose={connectButtonHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We have recieved your request and will follow up shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={connectButtonHandleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function ThemedApp() {
  const classes = useStyles();

  const [expanded1, setExpanded1] = React.useState(false);
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const [expanded2, setExpanded2] = React.useState(false);
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = name => {
    console.log(name);
    setOpen(false);
  };

  const collegepeople = [
    {
      id: "jonathanshi",
      logo: logo,
      name: "Jonathan Shi",
      description: "Junior at UCLA"
    },
    {
      id: "waylenlam",
      logo: logo,
      name: "Waylen Lam",
      description: "Senior at UCLA"
    },
    {
      id: "vivianlam",
      logo: logo,
      name: "Vivian Lam",
      description: "Junior at Harvey Mudd"
    },
    {
      id: "fontannayee",
      logo: logo,
      name: "Fontanna Yee",
      description: "Junior at UCLA"
    }
  ];

  const highschoolpeople = [
    {
      fullname: "bob marks",
      email: "bobmarks@gmail.com"
    }
  ];

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="overline">College Students</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="space"
          alignItems="flex-start"
          spacing={4}
          className={classes.gridthing}
        >
          {collegepeople.map(person => (
            <GridPerson person={person} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

// function App() {
//   const classes = useStyles();
//   return (
//     <div className={classes.app}>
//       <ThemedApp />
//     </div>
//   );
// }

// export default App;


const Home = (props) => {
  const classes = useStyles();
  const func1 = async () =>{

    const body = {
      name: "austin"
    }
    await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    });
  }

  return (
    <div className={classes.app}>
      <ThemedApp />
    </div>
  );
};

export default Home;

