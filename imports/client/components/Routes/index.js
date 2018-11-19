import React, { Component, Fragment } from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session} from 'meteor/session';

import Login from './../Login';
import Signup from './../Signup';
import Dashboard from './../Dashboard';
import NotFound from './../NotFound';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      prevSelectedNoteId: undefined,
      selectedNoteId: undefined,
    };
  }
  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      const isAuthenticated = !!Meteor.userId();
      this.setState({ isAuthenticated });
    });
    this.noteIdTracker = Tracker.autorun(() => {
      const selectedNoteId = Session.get('selectedNoteId');
      console.log(selectedNoteId);

      if (this.state.isAuthenticated) {
        if (selectedNoteId) {
          if (selectedNoteId !== this.state.selectedNoteId) {
            this.setState({ selectedNoteId });
            return this.props.history.replace(`/dashboard/${selectedNoteId}`);
          }
        } else {
          if (this.state.selectedNoteId) {
            this.setState({ selectedNoteId });
            return this.props.history.replace('/dashboard');
          }
        }
      } else {
        Session.set('selectedNoteId', undefined);
      }
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  onEnterPublicPage = (jsx) => {
    if (this.state.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    } else {
      return jsx;
    }
  }
  onEnterPrivatePage = (jsx, hasNoId) => {
    if (!this.state.isAuthenticated) {
      return <Redirect to='/' />;
    } else {
      if (hasNoId) {
        const selectedNoteId = Session.get('selectedNoteId');
        if (selectedNoteId) {
          this.props.history.replace(`/dashboard/${selectedNoteId}`);
        }
      }
      return jsx;
    }
  }
  render() {
    return (
      <div className='container'>
        <Switch>
          <Route path='/' exact component={() => (
            <Fragment>
              {this.onEnterPublicPage(<Login />)}
            </Fragment>
          )} />
          <Route path='/signup' exact component={() => (
            <Fragment>
              {this.onEnterPublicPage(<Signup />)}
            </Fragment>
          )} />
          <Route path='/dashboard' exact component={() => (
            <Fragment>
              {this.onEnterPrivatePage(<Dashboard />, true)}
            </Fragment>
          )} />
          <Route path='/dashboard/:id' component={() => (
            <Fragment>
              {this.onEnterPrivatePage(<Dashboard />, false)}
            </Fragment>
          )} />
          <Route component={() => (
            <Fragment>
              <NotFound />
            </Fragment>
          )} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
