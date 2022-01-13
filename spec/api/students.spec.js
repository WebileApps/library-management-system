const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Student tests', () => {
  it('should create students', async () => {
    const response = await request.post('/students').send({
      studentName: 'Amrit',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.studentId).toBeDefined();
    expect(response.body.studentName).toBe('Amrit');
  });

  it('should return student by id', async () => {
    const response = await request.post('/students').send({
      studentName: 'Aman',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.studentId).toBeDefined();

    const studentId = response.body.studentId;

    const response2 = await request.get(`/students/${studentId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.studentId).toBe(studentId);
    expect(response2.body.studentName).toBe('Aman');
  });

  it('should update student with id', async () => {
    const response = await request.post('/students').send({
      studentName: 'Akash',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.studentId).toBeDefined();

    const studentId = response.body.studentId;

    const response2 = await request.put(`/students/${studentId}`).send({
      studentId: studentId,
      studentName: 'Abhishek',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.studentId).toBe(studentId);
    expect(response2.body.studentName).toBe('Abhishek');
  });

  it('should delete student by id', async () => {
    const response = await request.post('/students').send({
      studentName: 'Abhish',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.studentId).toBeDefined();

    const studentId = response.body.studentId;

    const respone2 = await request.delete(`/students/${studentid}`);
    expect(respone2.statusCode).toBe(200);
  });
});
