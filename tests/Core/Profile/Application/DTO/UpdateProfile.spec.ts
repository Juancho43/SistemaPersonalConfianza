import { UpdateProfileRequest } from '../../../../../core/Profile/Application/DTO/UpdateProfileRequest';

describe('UpdateProfileRequest DTO', () => {
  it('constructs with id and name', () => {
    const req = new UpdateProfileRequest('p-1', 'Bob');
    expect(req.id).toBe('p-1');
    expect(req.name).toBe('Bob');
  });
});
