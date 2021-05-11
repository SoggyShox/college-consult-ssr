import React from "react";
import clsx from "clsx";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import logo from "./images/logo.svg";

import jonathanshi from "./images/jshi2.png";

const appTheme = createMuiTheme({
  // typography: {
  //   fontFamily: [
  //     'Nunito+Sans',
  //   ].join(','),
  // },
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: "#f4FFFFFF"
    }
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  app: {
    textAlign: "left"
  },
  container: {
    alignItems: 'center',
  },
  appBar: {
    backgroundColor: "#282828",
    color: "#5DD1F1"
  },
  gridthing: {
    marginTop: theme.spacing(0)
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
  },
  title: {
    textAlign: 'center',
  }
}));

// copy-pasted from mui demo
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function GridPerson({ person }) {
  const classes = useStyles();

  const [requester_firstname, setRequester_firstname] = React.useState("");
  const [requester_email, setRequester_email] = React.useState("");
  const [requester_subject, setRequester_subject] = React.useState("");

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

  const func1 = async () => {
    const body = {
      requester_firstname: requester_firstname,
      consultant_firstname: person.name,
      requester_subject: requester_subject,
      requester_email: requester_email,
      school_name: person.school_name
    };

    await fetch("/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
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
          <CardMedia
            component="img"
            height="350"
            image={person.profile_picture}
          />
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
            value={requester_firstname}
            onChange={event => setRequester_firstname(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={requester_email}
            onChange={event => setRequester_email(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            fullWidth
            value={requester_subject}
            onChange={event => setRequester_subject(event.target.value)}
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
              func1();
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

function ThemedApp(props) {
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
      logo: jonathanshi,
      profile_picture:
        "https://d2gr0dan0snfpj.cloudfront.net/files/9roEHL0zGZ3ZvWhRh-original.png",
      name: "Jonathan Shi",
      school_name: "UCLA",
      description: "Junior at UCLA"
    },
    {
      id: "waylenlam",
      logo: logo,
      profile_picture:
        "https://d2gr0dan0snfpj.cloudfront.net/attachments/ke7AOoHUmQWrWA_Yj0DPm..jpg",
      name: "Waylen Lam",
      school_name: "UCLA",
      description: "Senior at UCLA"
    },
    {
      id: "vivianlam",
      logo: logo,
      name: "Vivian Lam",
      school_name: "Harvey Mudd",
      description: "Junior at Harvey Mudd"
    },
    {
      id: "fontannayee",
      logo: logo,
      name: "Fontanna Yee",
      school_name: "UCLA",
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
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item classes={{ root: classes.title }} className={classes.title}>
          <Typography
          variant="h3"
          align="center"
        >
          Get the inside scoop on how to get into your dream college!
        </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={4}
        >
          <Grid>
            <Typography>
              UCLA
            </Typography>
          </Grid>

          <Grid>
            <Typography>
              UCLA
            </Typography>
          </Grid>

          <Grid>
            <Typography>
              UCLA
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" flexDirection="column" alignItems="center" pt={4}>

          <Box>
            <Typography
              variant="h4"
              align="center"
            >
              Just $5 per call!
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body1"
              align="center"
            >
              calls starting at minimum of 5 minutes
            </Typography>
          </Box>
        
        </Box>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >

          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <Typography>
              One
            </Typography>

            <Typography variant="h6">
              Pick a consultant
            </Typography>

            <Typography variant="h4">
              Icon
            </Typography>

            <Typography variant="body2">
              Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
            </Typography>

          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <Typography>
              Two
            </Typography>

            <Typography variant="h6">
              Pick a consultant
            </Typography>

            <Typography variant="h4">
              Icon
            </Typography>

            <Typography variant="body2">
              Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
            </Typography>

          </Grid>
          

        </Grid>

        

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={4}
          className={classes.gridthing}
        >
          {collegepeople.map(person => (
            <GridPerson person={person} />
          ))}
        </Grid>
      </Container>




      {/* <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />

      </React.Fragment> */}

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

const App = props => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <ThemedApp />
    </div>
  );
};

export default App;
