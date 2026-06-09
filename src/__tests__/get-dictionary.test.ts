import { getDictionary } from '@/lib/get-dictionary';

describe('getDictionary', () => {
  it('returns the Portuguese dictionary for pt locale', async () => {
    const dict = await getDictionary('pt');
    expect(dict).toBeDefined();
    expect(dict.home).toBeDefined();
    expect(dict.home.title).toBeDefined();
    expect(dict.about).toBeDefined();
    expect(dict.about.name).toBe('Matheus Monteiro');
  });

  it('returns the English dictionary for en locale', async () => {
    const dict = await getDictionary('en');
    expect(dict).toBeDefined();
    expect(dict.home).toBeDefined();
    expect(dict.home.title).toBeDefined();
    expect(dict.about).toBeDefined();
    expect(dict.about.name).toBe('Matheus Monteiro');
  });

  it('returns dictionaries with the same structure', async () => {
    const [en, pt] = await Promise.all([getDictionary('en'), getDictionary('pt')]);

    expect(Object.keys(en)).toEqual(Object.keys(pt));
    expect(en.about.name).toBe(pt.about.name);
  });
});
