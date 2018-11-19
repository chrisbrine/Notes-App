import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import { Notes } from '../../../../api/notes';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }
  onChangeTitle = (title, _id) => {
    this.setState({ title });
    Meteor.call('notes.update', _id, { title });
  }
  onChangeBody = (body, _id) => {
    this.setState({ body });
    Meteor.call('notes.update', _id, { body });
  }
  onRemove = (note) => {
    console.log('remove');
    Session.set('selectedNoteId', undefined);
    Meteor.call('notes.remove', note._id);
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note[0] ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note[0] ? prevProps.note[0]._id : undefined;
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note[0].title,
        body: this.props.note[0].body,
      });
    }
  }
  componentDidMount() {
    if (this.props.note[0] !== undefined) {
      this.setState({
        title: this.props.note[0].title,
        body: this.props.note[0].body,
      });
    }
  }
  render() {
    const noteClassName = this.props.hide ? 'note hidden' : 'note';
    const selectedNoteId = Session.get('selectedNoteId');
    const note = this.props.note[0];
    if (note === undefined || note.length < 1) {
      if (selectedNoteId === undefined) {
        return (
          <div className={noteClassName}>
            <div className='note__empty'>
              Create a note to get started.
            </div>
          </div>
        );
      } else {
        Session.set('selectedNoteId', undefined);
        return (
          <div className={noteClassName}>
            <div className='note__notexist'>
              The selected note does not exist.
            </div>
          </div>
        );
      }
    } else {
      return (
        <form className={noteClassName} onSubmit={(e) => e.preventDefault()}>
          <input className='note__title' value={this.state.title} onChange={(e) => this.onChangeTitle(e.target.value, note._id)} placeholder='Your title here' />
          <textarea className='note__body' value={this.state.body} onChange={(e) => this.onChangeBody(e.target.value, note._id)} placeholder='Your note here' />
          <button className='button button--secondary' type='button' onClick={() => this.onRemove(note)}>DELETE NOTE</button>
        </form>
      );
    }
  }
}

export default withTracker(() => {
  const handleNotes = Meteor.subscribe('notes');

  return {
    note: Notes.find({ _id: Session.get('selectedNoteId') }).fetch(),
  };
})(withRouter(Note));
