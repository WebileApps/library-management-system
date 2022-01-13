const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Loan tests', () => {
  it('should create loans', async () => {
    const response = await request.post('/loans').send({
      studentId: 1,
      bookId: 1,
      outDate: Date.now(),
      returnDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();
    expect(response.body.studentId).toBe(1);
    expect(response.body.bookId).toBe(1);
  });

  it('should get loan by id', async () => {
    const response = await request.post('/loans').send({
      studentId: 2,
      bookId: 2,
      outDate: Date.now(),
      returnDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBeDefined();

    const loanId = response.body.loanId;

    const response2 = await request.get(`/loans/${loanId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.loanId).toBe(loanId);
    expect(response.body.studentId).toBe(2);
    expect(response.body.bookId).toBe(2);
  });
});
