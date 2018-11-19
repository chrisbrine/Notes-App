import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import Header from '../Header';
import NoteList from './NoteList';
import Note from './Note';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNoteList: false,
    };
  }
  handleToggleNoteList = () => {
    this.setState({ showNoteList: !this.state.showNoteList });
  }
  handleLogOut = () => {
    Accounts.logout();
  }
  render() {
    // const hamburgerIcon = () => return ( &#9776 );
    return (
      <div className='dashboard'>
        <Header
          buttonLeft={{
            label: String.fromCharCode(9776),
            onClick: this.handleToggleNoteList,
            className: 'button button--hideonlarge button--noborder button--transparent button--larger',
          }}
          buttonRight={{
            label: 'Logout',
            onClick: this.handleLogOut,
            className: 'button button--transparent',
          }}
        />
        <div className='wrapper'>
          <NoteList show={this.state.showNoteList} />
          <Note hide={this.state.showNoteList} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
