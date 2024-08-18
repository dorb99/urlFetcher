const request = require('supertest');
const app = require('../app'); // Adjust path if needed
const axios = require('axios');

jest.mock('axios');

describe('Back-End Tests', () => {
  
  test('Fetch Metadata for Valid URLs', async () => {
    const mockMetadata = {
      title: 'Example Title',
      description: 'Example Description',
      image: 'http://example.com/image.jpg',
    };

    axios.get.mockResolvedValue({ data: '<html></html>', request: { res: { responseUrl: 'http://example.com' } } });
    metascraper.mockResolvedValue(mockMetadata);

    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['http://example.com'] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMetadata]);
  });

  test('Handles Errors and Returns Appropriate Response', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['http://invalid-url'] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'N/A', description: 'Could not fetch metadata', image: '' }]);
  });

  test('Rate Limiting Works Correctly', async () => {
    // Perform multiple requests to check rate limiting
    for (let i = 0; i < 6; i++) {
      const response = await request(app)
        .post('/fetch-metadata')
        .send({ urls: ['http://example.com'] });

      if (i < 5) {
        expect(response.status).toBe(200);
      } else {
        expect(response.status).toBe(429); // Rate limit exceeded
      }
    }
  });
});
