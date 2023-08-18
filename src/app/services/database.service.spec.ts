import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatabaseService],
    });
    service = TestBed.inject(DatabaseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate number array correctly', () => {
    const endValue = 5;
    const expectedArray = [1, 2, 3, 4, 5];

    const result = service.generateNumberArray(endValue);

    expect(result).toEqual(expectedArray);
  });

  it('should send data using HTTP POST', () => {
    const endpoint = 'example';
    const data = { name: 'John', age: 25 };

    service.sendData(endpoint, data).subscribe();

    const req = httpTestingController.expectOne(
      'http://localhost:3000/example'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);

    req.flush(null);
  });

  it('should get data using HTTP GET', () => {
    const endpoint = 'example';

    service.getData(endpoint).subscribe();

    const req = httpTestingController.expectOne(
      'http://localhost:3000/example'
    );
    expect(req.request.method).toBe('GET');

    req.flush(null);
  });

  it('should get user details using HTTP GET with email parameter', () => {
    const email = 'test@example.com';

    service.getUserDetails(email).subscribe();

    const req = httpTestingController.expectOne(
      'http://localhost:3000/userInfos?email=test@example.com'
    );
    expect(req.request.method).toBe('GET');

    req.flush(null);
  });

  it('should update user details using HTTP PUT', () => {
    const id = 1;
    const data = { name: 'John', age: 25 };

    service.updateUserDetails(id, data).subscribe();

    const req = httpTestingController.expectOne(
      'http://localhost:3000/userInfos/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);

    req.flush(null);
  });

  it('should get paginated reviews using HTTP GET with page parameter', () => {
    const page = 1;

    service.getPaginatedReviews(page).subscribe();

    const req = httpTestingController.expectOne(
      'http://localhost:3000/reviews?_page=1&_limit=4'
    );
    expect(req.request.method).toBe('GET');

    req.flush(null);
  });
});
