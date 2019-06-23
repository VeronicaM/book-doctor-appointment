import React, { Fragment, Component } from 'react'

// Components
import BookAppointmentForm from './features/appointments/BookAppointmentForm.jsx';
import NavBar from './features/common/navbar/NavBar.jsx';
import UserInfo from './features/user/UserInfo.jsx';

// Services
import UserService from './services/user.service.js';

// CSS
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            userData: {}
        };

        // track if compolnent is mounted to prevent memory leaks
        this.hasMounted = false;
    }

    componentDidMount() {
        this.hasMounted = true;
        this.getUserData();
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    /**
     * Verifies that the component is mounted before setting the state
     * to avoid getting a warning for setting state on unmounted compoent
     */
    stateSetter = (stateParams) => {
        if (this.hasMounted) {
            this.setState(stateParams);
        }
    };

    getUserData = () => {
       const onError = (error) => {
            // set error flag to true and isLoading to false to update UI
            this.stateSetter({
                userData: {},
                isLoading: false,
                isError: true
            });
        };

        const onSuccess = (data) => {
            this.stateSetter({
                userData: data,
                isLoading: false // hide loading
            });
        };

        // set isLoading flag to true to update UI while waiting for data to render
        this.setState({ isLoading: true });

        UserService.getUserData()
            .then(onSuccess)
            .catch(onError);
    }

    render() {
        if (this.state.isLoading) {
            return <div> Loading... </div>;
        }

        if (this.state.isError) {
            return <div className="error__container"> Something went wrong! Please contact support at teamX@support.com or try again later.</div>
        }

        return (<Fragment>
          <NavBar /> 
          <div className="app__container"> 
              <h1 className="headline"> New Appointment </h1>
              <UserInfo userData={this.state.userData} />
              <BookAppointmentForm />
          </div> 
      </Fragment>);
    }
}

export default App;
