import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import NoteListHeader from './NoteListHeader';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListItem from './NoteListItem';

import { Notes } from '../../../../api/notes';

class NoteList extends Component {
  renderNoteList = () => {
    const selectedNoteId = Session.get('selectedNoteId');
    return this.props.notes.map((note) => {
      return (
        <NoteListItem
          key={note._id}
          note={note}
          selected={selectedNoteId === note._id}
        />
      );
    });
  }
  renderNoteEmptyList = () => {
    return <NoteListEmptyItem key='empty' onAdd={this.handleNoteAdd} />;
  }
  handleNoteAdd = () => {
    Meteor.call('notes.insert', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        Session.set('selectedNoteId', res);
      }
    });
  }
  render() {
    const notesClassName = this.props.show ? 'notelist active' : 'notelist';
    let selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId === undefined) {
      if (this.props.match.params.id !== undefined) {
        Session.set('selectedNoteId', this.props.match.params.id);
      } else {
        if (this.props.notes[0]) {
          selectedNoteId = Session.get('selectedNoteId');
          if (selectedNoteId === undefined) {
            Session.set('selectedNoteId', this.props.notes[0]._id);
          }
        }
      }
    }
    return (
      <div className={notesClassName}>
        <NoteListHeader onAdd={this.handleNoteAdd} />
        <div className='notelist__notes'>
          <ul className='notelist__notes_ul'>
            {this.props.notes.length > 0 ? this.renderNoteList() : this.renderNoteEmptyList()}
          </ul>
        </div>
        <div className='notelist__count'>
          {this.props.notes.length} Note{this.props.notes.length === 1 ? null : 's'}
        </div>
      </div>
    );
  }
};

export default withTracker(() => {
  const handleNotes = Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 }}).fetch(),
  };
})(withRouter(NoteList));
