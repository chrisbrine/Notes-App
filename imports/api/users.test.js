import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('imports/api/users.js', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example.com',
          },
        ],
      };
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });
    it('should not allow invalid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'TestInvalidEmail',
          },
        ],
      };

      expect(
        () => {
          validateNewUser(testUser);
        }
      ).toThrow();
    });
  });
}
