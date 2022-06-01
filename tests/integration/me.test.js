const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../../src/models/user');
const { Cart } = require('../../src/models/cart');
const { Category } = require('../../src/models/category');
const { Subcategory } = require('../../src/models/subcategory');
const { Product } = require('../../src/models/product');
const { ProductVariant } = require('../../src/models/productVariant');
const { Order } = require('../../src/models/order');
const { Review } = require('../../src/models/review');

describe('/api/me', () => {
    let server, authResponse, token, productVariant1, productVariant2, requestBody;
    beforeAll(async () => {
        server = require('../../src/index');
        authResponse = await request(server).post('/api/auth/register').send({
            name: 'Tim',
            email: 'tim@email.com',
            address: 'Tim\'s home address',
            password: '12345'
        });
        const category = await Category.create({
            name: 'Shoes'
        });
        const subcategory = await Subcategory.create({
            name: 'Basketball',
            categoryId: category._id
        });
        const product = await Product.create({
            name: 'Air Jordan 1',
            description: 'Michael Jordan\'s first signature shoe developed by Nike.',
            categoryId: category._id,
            subcategoryId: subcategory._id
        });
        productVariant1 = await ProductVariant.create({
            color: 'Red/White',
            size: '9',
            price: 200,
            stock: 3,
            images: [ 'image1', 'image2', 'image3' ],
            productId: product._id
        });
        productVariant2 = await ProductVariant.create({
            color: 'Black/White',
            size: '10',
            price: 180,
            stock: 5,
            images: [ 'image1', 'image2', 'image3' ],
            productId: product._id
        });
    });
    afterAll(async () => {
        await server.close();
        await User.deleteMany({});
        await Cart.deleteMany({});
        await Category.deleteMany({});
        await Subcategory.deleteMany({});
        await Product.deleteMany({});
        await ProductVariant.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});
    });
    beforeEach(async () => {
        token = authResponse.headers['x-auth-token'];
    });

    describe('GET /', () => {
        it('should not get user if token is invalid', async () => {
            token = '';
            const response = await request(server).get('/api/me').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should get user if token is valid', async () => {
            const response = await request(server).get('/api/me').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return user ID
            expect(response.body._id.valueOf()).toBe(payload._id); // user ID should match that from token payload
        });
    });

    describe('PUT /', () => {
        beforeEach(() => {
            requestBody = {
                name: 'Timothy',
                email: 'timothy@email.com',
                address: 'Timothy\'s home address'
            };
        });

        it('should not update user if token is invalid', async () => {
            token = '';
            const response = await request(server).put('/api/me').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not update user if request body is invalid', async () => {
            requestBody.name = '';
            const response = await request(server).put('/api/me').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should update user if token and request body are valid', async () => {
            const response = await request(server).put('/api/me').set('x-auth-token', token).send(requestBody);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return user ID
            expect(response.body._id.valueOf()).toBe(payload._id); // user ID should match that from token payload

            const user = await User.findById(response.body._id);
            expect(user).toMatchObject(requestBody); // updated user should match request body
        });

        it('should not update user admin even if token and request body are valid', async () => {
            requestBody.admin = true;
            const snapshot = await request(server).get('/api/me').set('x-auth-token', token);
            const response = await request(server).put('/api/me').set('x-auth-token', token).send(requestBody);
            
            expect(response.body.admin).toBe(snapshot.body.admin); // admin property should not change
        });
    });

    describe('GET /cart', () => {
        it('should not get cart if token is invalid', async () => {
            token = '';
            const response = await request(server).get('/api/me/cart').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should get cart if token is valid', async () => {
            const response = await request(server).get('/api/me/cart').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return cart ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload
        });
    });

    describe('PUT /cart', () => {
        beforeEach(async () => {
            await Cart.findOneAndUpdate(
                { userId: authResponse.body._id },
                { items: [ { productVariantId: productVariant1._id, quantity: 1 } ], total: 200 }
            );
            requestBody = {
                items: [
                    { productVariantId: productVariant1._id, quantity: 2 }
                ]
            };
        });

        it('should not update cart if token is invalid', async () => {
            token = '';
            const response = await request(server).put('/api/me/cart').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not update cart if request body is invalid', async () => {
            requestBody.items[0].quantity = -1;
            const response = await request(server).put('/api/me/cart').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should update cart if token and request body are valid', async () => {
            const response = await request(server).put('/api/me/cart').set('x-auth-token', token).send(requestBody);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return cart ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const cart = await Cart.findById(response.body._id);
            expect(cart).toMatchObject(requestBody); // updated cart should match request body
        });

        it('should not update cart total even if token and request body are valid', async () => {
            requestBody = { total: 0 };
            const snapshot = await request(server).get('/api/me/cart').set('x-auth-token', token);
            const response = await request(server).put('/api/me/cart').set('x-auth-token', token).send(requestBody);
            
            expect(response.body.total).toBe(snapshot.body.total); // total property should not change
        });

        it('should not update cart userId even if token and request body are valid', async () => {
            requestBody = { userId: 'another_user_id' };
            const snapshot = await request(server).get('/api/me/cart').set('x-auth-token', token);
            const response = await request(server).put('/api/me/cart').set('x-auth-token', token).send(requestBody);
            
            expect(response.body.userId).toBe(snapshot.body.userId); // userId property should not change
        });
    });

    describe('PUT /cart/add', () => {
        beforeEach(async () => {
            await Cart.findOneAndUpdate(
                { userId: authResponse.body._id },
                { items: [ { productVariantId: productVariant1._id, quantity: 1 } ], total: 200 }
            );
            requestBody = {
                productVariantId: productVariant2._id,
                quantity: 1
            }
        });

        it('should not add to cart if token is invalid', async () => {
            token = '';
            const response = await request(server).put('/api/me/cart/add').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not add to cart if request body is invalid', async () => {
            requestBody.quantity = -1;
            const response = await request(server).put('/api/me/cart/add').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should add to cart if token and request body are valid', async () => {
            const response = await request(server).put('/api/me/cart/add').set('x-auth-token', token).send(requestBody);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return cart ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            let addedCartItem;
            const cart = await Cart.findById(response.body._id);
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].productVariantId.valueOf() === requestBody.productVariantId.valueOf()) addedCartItem = cart.items[i];
            };

            expect(addedCartItem).toMatchObject(requestBody); // added cart item should match request body
        });

        it('should increment cart item quantity if it was already added', async () => {
            requestBody.productVariantId = productVariant1._id;
            const snapshot = await request(server).get('/api/me/cart').set('x-auth-token', token);
            const response = await request(server).put('/api/me/cart/add').set('x-auth-token', token).send(requestBody);

            let cartItem;
            for (let i = 0; i < snapshot.body.items.length; i++) {
                if (snapshot.body.items[i].productVariantId === requestBody.productVariantId.valueOf()) cartItem = snapshot.body.items[i];
            };

            let updatedCartItem;
            for (let i = 0; i < response.body.items.length; i++) {
                if (response.body.items[i].productVariantId === requestBody.productVariantId.valueOf()) updatedCartItem = response.body.items[i];
            };

            expect(updatedCartItem.quantity).toBe(cartItem.quantity + requestBody.quantity); // cart item quantity should be incremented by request body quantity
        });
    });

    describe('PUT /cart/empty', () => {
        it('should not empty cart if token is invalid', async () => {
            token = '';
            const response = await request(server).put('/api/me/cart/empty').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should empty cart if token is valid', async () => {
            const response = await request(server).put('/api/me/cart/empty').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return cart ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const cart = await Cart.findById(response.body._id);
            expect(cart).toMatchObject({ items: [], total: 0 }); // emptied cart should have no items and 0 total
        });
    });

    describe('POST /orders', () => {
        let cart;
        beforeEach(async () => {
            cart = await Cart.findOneAndUpdate(
                { userId: authResponse.body._id },
                { items: [ { productVariantId: productVariant1._id, quantity: 1 } ], total: 200 },
                { new: true }
            );
        });

        it('should not place order if token is invalid', async () => {
            token = '';
            const response = await request(server).post('/api/me/orders').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not place order if cart is empty', async () => {
            cart.items = [];
            await cart.save();
            const response = await request(server).post('/api/me/orders').set('x-auth-token', token);

            expect(response.status).toBe(403); // should return status code 403
        });

        it('should not place order if product variant does not have enough stock', async () => {
            cart.items[0].quantity = 10;
            await cart.save();
            const response = await request(server).post('/api/me/orders').set('x-auth-token', token);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should place order if token is valid and product variants have enough stock', async () => {
            const { items, total } = await Cart.findOne({ userId: authResponse.body._id }).lean();
            const response = await request(server).post('/api/me/orders').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return order ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const order = await Order.findById(response.body._id).lean();
            expect(order).toMatchObject({ items, total }); // placed order should match what was in the cart

            const productVariant = await ProductVariant.findById(order.items[0].productVariantId);
            expect(productVariant.stock).toBe(productVariant1.stock - order.items[0].quantity); // product variant stock should be decremented by order quantity

            const cart = await Cart.findOne({ _userId: response.body.userId });
            expect(cart).toMatchObject({ items: [], total: 0}); // cart should be emptied
        });
    });

    describe('GET /orders', () => {
        it('should not get orders if token is invalid', async () => {
            token = '';
            const response = await request(server).get('/api/me/orders').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should get orders if token is valid', async () => {
            const response = await request(server).get('/api/me/orders').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body[0]).toHaveProperty('_id'); // should return order ID in each order
            expect(response.body[0]).toHaveProperty('userId'); // should return user ID in each order
            expect(response.body[0].userId).toBe(payload._id); // user ID should match that from token payload
        });
    });

    describe('POST /reviews', () => {
        beforeEach(() => {
            requestBody = {
                rating: 5,
                comment: 'These are awesome!',
                productVariantId: productVariant1._id
            };
        });

        it('should not create review if token is invalid', async () => {
            token = '';
            const response = await request(server).post('/api/me/reviews').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not create review if request body is invalid', async () => {
            requestBody.rating = 0;
            const response = await request(server).post('/api/me/reviews').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should not create review if product variant has not been purchased', async () => {
            requestBody.productVariantId = productVariant2._id;
            const response = await request(server).post('/api/me/reviews').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(403); // should return status code 403
        });

        it('should create review if token is valid and request body is valid', async () => {
            const response = await request(server).post('/api/me/reviews').set('x-auth-token', token).send(requestBody);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return review ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const review = await Review.findById(response.body._id);
            expect(review).toMatchObject(requestBody); // created review should match request body
        });

        it('should not create review if it already exists', async () => {
            const response = await request(server).post('/api/me/reviews').set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(403); // should return status code 403
        });
    });

    describe('GET /reviews', () => {
        it('should not get reviews if token is invalid', async () => {
            token = '';
            const response = await request(server).get('/api/me/reviews').set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should get reviews if token is valid', async () => {
            const response = await request(server).get('/api/me/reviews').set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body[0]).toHaveProperty('_id'); // should return review ID in each review
            expect(response.body[0]).toHaveProperty('userId'); // should return user ID in each review
            expect(response.body[0].userId).toBe(payload._id); // user ID should match that from token payload
        });
    });

    describe('PUT, /reviews/:id', () => {
        let review;
        beforeEach(async () => {
            review = await Review.findOne({ userId: authResponse.body._id, productVariantId: productVariant1._id });
            requestParams = review._id.valueOf();
            requestBody = {
                rating: 3,
                comment: 'These are okay'
            };
        });

        it('should not update review if token is invalid', async () => {
            token = '';
            const response = await request(server).put(`/api/me/reviews/${requestParams}`).set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should not update review if request body is invalid', async () => {
            requestBody.rating = 0;
            const response = await request(server).put(`/api/me/reviews/${requestParams}`).set('x-auth-token', token).send(requestBody);

            expect(response.status).toBe(400); // should return status code 400
        });

        it('should update review if token and request body are valid', async () => {
            const response = await request(server).put(`/api/me/reviews/${requestParams}`).set('x-auth-token', token).send(requestBody);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return review ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const review = await Review.findById(response.body._id);
            expect(review).toMatchObject(requestBody); // updated review should match request body
        });

        it('should not update review productVariantId even if token and request body are valid', async () => {
            requestBody = { productVariantId: productVariant2._id };
            const snapshot = review;
            const response = await request(server).put(`/api/me/reviews/${requestParams}`).set('x-auth-token', token).send(requestBody);

            expect(response.body.productVariantId).toBe(snapshot.productVariantId.valueOf()); // productVariantId property should not change
        });

        it('should not update review userId even if token and request body are valid', async () => {
            requestBody = { userId: 'another_user_id' };
            const snapshot = review;
            const response = await request(server).put(`/api/me/reviews/${requestParams}`).set('x-auth-token', token).send(requestBody);
            
            expect(response.body.userId).toBe(snapshot.userId.valueOf()); // userId property should not change
        });
    });

    describe('DELETE, /reviews/:id', () => {
        beforeEach(async () => {
            const review = await Review.findOne({ userId: authResponse.body._id, productVariantId: productVariant1._id });
            requestParams = review._id.valueOf();
        });

        it('should not delete review if token is invalid', async () => {
            token = '';
            const response = await request(server).delete(`/api/me/reviews/${requestParams}`).set('x-auth-token', token);

            expect(response.status).toBe(401); // should return status code 401
        });

        it('should delete review if token is valid', async () => {
            const response = await request(server).delete(`/api/me/reviews/${requestParams}`).set('x-auth-token', token);
            const payload = jwt.verify(token, config.get('jwt_private_key'));

            expect(response.body).toHaveProperty('_id'); // should return review ID
            expect(response.body).toHaveProperty('userId'); // should return user ID
            expect(response.body.userId).toBe(payload._id); // user ID should match that from token payload

            const review = await Review.findById(response.body._id);
            expect(review).toBe(null); // deleted review should not be found
        });
    });
});