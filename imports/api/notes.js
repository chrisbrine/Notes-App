import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods({

  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized to add a note.');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
    });
  },

  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized to add a note.');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Notes.remove({ _id });
  },

  'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized to add a note.');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      title: {
        type: String,
        optional: true,
      },
      body: {
        type: String,
        optional: true,
      },
    }).validate({ _id, ...updates });

    Notes.update({
      _id,
      userId: this.userId,
    }, {
      $set: {
        updatedAt: new Date().getTime(),
        ...updates,
      },
    });

  },

});
