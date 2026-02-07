import { CreateProfileRequest } from '../../../../../core/Profile/Application/DTO/CreateProfileRequest';

describe('CreateProfileRequest DTO', () => {
  it('constructs with provided name', () => {
    const req = new CreateProfileRequest('Alice');
    expect(req.name).toBe('Alice');
  });
});
