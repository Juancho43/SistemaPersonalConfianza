import { ProgressResponse } from '../../../../../core/Progress/Application/DTO/ProgressResponse';

describe('ProgressResponse.generate', () => {
  it('maps all fields from a progress object', () => {
    const p = {
      id: 'p1',
      progress: 33,
      date: new Date('2021-05-05'),
      description: 'note',
    } as any;

    const res = ProgressResponse.generate(p);

    expect(res.id).toBe('p1');
    expect(res.progress).toBe(33);
    expect(res.date).toEqual(new Date('2021-05-05'));
    expect(res.description).toBe('note');
  });

  it('uses empty id when missing and preserves undefined optional fields', () => {
    const p = {
      // id omitted intentionally
      progress: 0,
      date: undefined,
      description: undefined,
    } as any;

    const res = ProgressResponse.generate(p);

    expect(res.id).toBe('');
    expect(res.progress).toBe(0);
    expect(res.date).toBeUndefined();
    expect(res.description).toBeUndefined();
  });
});