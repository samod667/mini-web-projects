import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Toolbar } from 'material-ui';
import Typography from '@material-ui/core/Typography'


export class FormUserDetails extends Component {
    continue = () => e => {
        e.preventDefault();

        this.props.nextStep();
        
    }

    render() {
        const { values, handleChange } = this.props;

        return (
          <MuiThemeProvider>
            <React.Fragment>
              <AppBar position="static" color="primary">
                <Toolbar>
                  <Typography variant="h6" color="primary">Enter User Details</Typography>
                </Toolbar>
              </AppBar>
              <TextField
                placeholder="Enter your first name"
                label="First Name"
                onChange={handleChange("firstName")}
                defaultValue={values.firstName}
                style={styles.TextField}
              />
              <br />
              <TextField
                placeholder="Enter your last name"
                label="Last Name"
                onChange={handleChange("lastName")}
                defaultValue={values.lastName}
                style={styles.TextField}
              />
              <br />
              <TextField
                placeholder="Enter your Email"
                label="Email"
                onChange={handleChange("email")}
                defaultValue={values.email}
                style={styles.TextField}
              />
              <br />
              <Button
                label="Continue"
                color="default"
                variant="contained"
                onClick={this.continue}
              >
                Continue
              </Button>
            </React.Fragment>
          </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin: 15
    },
    TextField: {
        margin: 15
    }
}

export default FormUserDetails
