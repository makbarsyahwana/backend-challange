import chai from 'chai'
import chaiHttp from 'chai-http'

const expect = chai.expect
const app = require('../index')

chai.use(chaiHttp)

describe('Response empty array', function() {
  describe('from http', () => {
    it('empty or fails', (done) => {
      chai.request(app)
      .get('/people-like-you?age=1000')
      .end(function(err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.length(0)
        done()
      })
    })
  })
})

describe('Response as an array', function() {
  describe('from http', () => {
    it('gives a list of people like you', (done) => {
      chai.request(app)
      .get('/people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false')
      .end(function(err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.length.above(0)
        done()
      })
    })
  })
})