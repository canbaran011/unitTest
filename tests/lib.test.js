const lib = require('../lib');
// jest document should be read...
// grouping is very important for clean and maintainable code... 
describe('absolute', () => {
    // we write it instead  of test
    it('should return:pos if input positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return:pos if input negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return:0 if input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });


}); 

describe('greet', () => {
    it('should return greeting message',() => {
        const result = lib.greet('Mosh');
        // expect(result).toBe('Welcome Mosh'); too specific make more general
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');

    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // too general
        expect(result).toBeDefined(); 
        expect(result).not.toBeNull();

        //to specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper Way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal Way
        expect(result).toEqual(
            expect.arrayContaining(['EUR','USD','AUD'])
        )

    })
});

describe('getProduct', () => {
    it('should return the product with given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1 , price : 10});
        expect(result).toMatchObject({id : 1, price :10});
        expect(result).toHaveProperty('id' , 1);
    });
});
 
describe('registerUser', () => {
    it('should throw if username false', () => {
        //Null
        //Undefined
        //NaN
        //''
        //0
        //false
    const args = [null, undefined ,NaN , '',0, false];
    args.forEach(a => {
        expect(() => {
            lib.registerUser(null);
        }).toThrow();    });

    });
    it('should return user object if username is valid', async () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject( {username : 'mosh'} );
        expect(result.id).toBeGreaterThan(0);
    });
});





