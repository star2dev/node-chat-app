const expect = require('expect'),
{Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Name A',
      room: 'Room A'
    }, {
      id: '2',
      name: 'Name B',
      room: 'Room B'
    }, {
      id: '3',
      name: 'Name C',
      room: 'Room A'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Bruce',
      room: 'Room A'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for Room A', () => {
    var userList = users.getUserList('Room A');
    expect(userList).toEqual(['Name A', 'Name C']);
  });

  it('should return names for Room B', () => {
    var userList = users.getUserList('Room B');
    expect(userList).toEqual(['Name B']);
  });
});
