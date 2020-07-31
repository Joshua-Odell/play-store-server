const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {

    it('incorrect sort- return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'test'})
            .expect(400, 'Sort must be either rating or app');
    });

    it('incorrect generes- return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({generes: 'test'})
            .expect(400, 'Please enter a valid genere');
    });

    it('gnere sort- only queried generes', () => {
        return supertest(app)
            .get('/apps')
            .query({generes: 'Action'})
            .expect(200)
            .then( res => {
                let results = res.body;
                expect(results).containsAllDeepKeys(new Map({Generes: 'Action'}));
                
                
            })
    })
})