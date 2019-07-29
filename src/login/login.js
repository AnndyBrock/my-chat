import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require("firebase");


class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginError: ''
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Log In
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
                            <Input autoComplete='email' autoFocus onChange={(e) => this.userTyping('email', e)}
                                   id='login-email-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('password', e)}
                                   id='login-password-input'></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary'
                                className={classes.submit}>Submit</Button>
                    </form>
                    {
                        this.state.loginError ?
                            <Typography className={classes.errorText} component='h5' variant='h6'>
                                {this.state.loginError}
                            </Typography> :
                            null
                    }
                    <h5 className={classes.noAccountHeader}>Doesn't have an account?</h5>
                    <Link className={classes.signUpLink} to='/signup'>Sing Up!</Link>
                </Paper>
            </main>
        );
    }

    submitLogin = async (e) => {
        e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
        await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/dashboard');
            }, err => {
                this.setState({loginError: err.message});
            });
    };

    userTyping = (whichInput, event) => {
        switch (whichInput) {
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                break;
        }
    };
}

export default withStyles(styles)(LoginComponent);
