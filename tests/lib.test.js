const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
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

describe('applyDiscount', () => {
    it('should apply 10% disc if cust s more than 10 points', () => {
        // mock function
        db.getCustomerSync = function(customerId){
        console.log("fake reading db")
            return {id : customerId, points :20}
        }
        const order = {customerId: 1, totalPrice : 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9); 
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer ', () => {
        db.getCustomerSync = function(customerId){
            return { email: 'a'};
        }
        let mailSent = false;
        mail.send =function(email, message){
            mailSent = true;
        }
        
        lib.notifyCustomer({ customerId:1 });
        expect(mailSent).toBe(true);
    });
});

// with JEST mock function
describe('notifyCustomerJest', () => {
    it('should send an email to the customer ', () => {

        db.getCustomerSync = jest.fn().mockReturnValue(
            { email : 'a'}
        );

        mail.send = jest.fn();

        lib.notifyCustomer({ customerId:1 });
        
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    });
});

 