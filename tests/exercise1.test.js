const lib = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exeption if not number', () => {
        expect(() => {lib.fizzBuzz('a')}).toThrow();
        expect(() => {lib.fizzBuzz(null)}).toThrow();
        expect(() => {lib.fizzBuzz(undefined)}).toThrow();
        expect(() => {lib.fizzBuzz({})}).toThrow();
    });

    it('should return FizzBuzz if div by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if div by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if div by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });
""
    it('should return input if not div by 3 5', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    });
});