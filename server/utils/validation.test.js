var expect = require('expect'),
{isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var name = 10;
    var validation = isRealString(name);

    expect(validation).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var name = '   ';
    var validation = isRealString(name);

    expect(validation).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var name = '  Bruce  ';
    var validation = isRealString(name);

    expect(validation).toBe(true);
  });
});
