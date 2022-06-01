const request = require('supertest');
const { User } = require('../../src/models/user');
const { Cart } = require('../../src/models/cart');

describe('/api/auth', () => {
    let server, requestBody;    
    beforeAll(() => server = require('../../src/index'));   
    afterAll(async () => {
        await server.close();
        await User.deleteMany({});
        await Cart.deleteMany({});
    });

    describe('POST /register', () => {
        beforeEach(() => {
            requestBody = {
                name: 'Timothy',
                email: 'timothy@email.com',
                address: 'Timothy\'s home address',
                password: '67890'
            };
        });
        afterEach(async () => {
            await User.deleteMany({});
            await Cart.deleteMany({});
        });

        it('should not register user if request body is invalid', async () => {
            requestBody.name = '';
            const response = await request(server).post('/api/auth/register').send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should register user if request body is valid', async () => {
            const response = await request(server).post('/api/auth/register').send(requestBody);

            expect(response.body).toHaveProperty('_id'); // should return new user ID
            expect(response.headers).toHaveProperty('x-auth-token'); // should return token

            delete requestBody.password;
            const user = await User.findById(response.body._id);
            expect(user).toMatchObject(requestBody); // created user should match request body (password gets hashed)

            const cart = await Cart.find({ userId: response.body._id });
            expect(cart).not.toEqual([]); // should create user cart
        });
    });

    describe('POST /login', () => {
        let user;
        beforeAll(async () => {
            user = await User.create({
                name: 'Tim',
                email: 'tim@email.com',
                address: 'Tim\'s home address',
                password: '12345'
            });
        });
        beforeEach(() => {
            requestBody = {
                email: 'tim@email.com',
                password: '12345'
            };
        });
        
        it('should not login if email is not found', async () => {
            requestBody.email = 'timothy@email.com';
            const response = await request(server).post('/api/auth/login').send(requestBody);

            expect(response.status).toBe(404); // should return status code 404
        });

        it('should not login if password is incorrect', async () => {
            requestBody.password = '67890';
            const response = await request(server).post('/api/auth/login').send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should login if email and password are correct', async () => {
            const response = await request(server).post('/api/auth/login').send(requestBody);
            
            expect(response.body).toHaveProperty('_id'); // should return user ID
            expect(response.headers).toHaveProperty('x-auth-token'); // should return token

            const user = await User.findById(response.body._id);
            expect(user).toHaveProperty('email', requestBody.email); // found user should have the same email
        });
    });
});