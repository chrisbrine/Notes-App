import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('imports/api/notes.js', function () {

    const userId = '!!testid!!';
    const userId2 = '#$#$testid#$#$';
    const note1 = {
      _id: 'testnoteid1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
      userId,
    };
    const note2 = {
      _id: 'testnoteid2',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      createdAt: new Date().getTime(),
      userId,
    };
    const note3 = {
      _id: 'testnoteid3',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      createdAt: new Date().getTime(),
      userId: userId2,
    };

    beforeEach(function() {
      Notes.insert(note1);
      Notes.insert(note2);
      Notes.insert(note3);
    });

    it('can create a new note if logged in', function () {

      const _id = Meteor.server.method_handlers['notes.insert'].apply({
        userId,
      });

      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    })

    it('cannot creat a new note if not logged in', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({
        userId,
      }, [note1._id]);

      expect(Notes.findOne({ _id: note1._id })).toBeFalsy();
    });

    it('should not remove a note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [note1._id]);
      }).toThrow();
    });

    it('should not remove a note if invalid id', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({
          userId,
        });
      }).toThrow();
    });

    it('should update note', function () {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId,
      }, [note2._id, {
        title,
      }]);

      const note = Notes.findOne(note2._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toEqual(expect.objectContaining({
        title,
        body: note2.body,
      }));
    });

    it('should throw error if updating extra properties', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId,
        }, [note2._id, {
          title: 'new title',
          name: 'Its Me',
        }]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function () {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: userId2,
      }, [note2._id, {
        title,
      }]);

      const note = Notes.findOne(note2._id);

      expect(note.updatedAt).toEqual(0);
      expect(note).toEqual(expect.not.objectContaining({
        title,
      }));
    });

    it('should not update a note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [note2._id, {
          title,
        }]);
      }).toThrow();
    });

    it('should not update a note if invalid id', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId,
        }, ['', {
          title,
        }]);
      }).toThrow();
    });

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId });
      const notes = res.fetch();

      expect(notes.length).toBe(2);
      expect(notes[0]).toEqual(note1);
      expect(notes[1]).toEqual(note2);
    });

    it('should return zero notes for user that has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testuserforthis '});
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    })

    afterEach(function() {
      Notes.remove({userId});
      Notes.remove({userId: userId2});
    });

  });
}
