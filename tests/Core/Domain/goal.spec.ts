import { Goal } from '../../../core/Domain/Goal';

describe('Goal', () => {
  test('creates with valid coste_subjetivo and default estado', () => {
    const g = Goal.create('Test Goal', 50, 'PENDIENTE','1');
    expect(g.id).toBe('1');
    expect(g.estado).toBe('PENDIENTE');
  });

  test('throws when coste_subjetivo is out of range', () => {
    expect(() => Goal.create('Too low', 0)).toThrow(
      'El Coste Subjetivo debe estar entre 1 y 100.',
    );
    expect(() => Goal.create('Too high', 101)).toThrow(
      'El Coste Subjetivo debe estar entre 1 y 100.',
    );
  });

  test('marcar_abandonada sets estado to ABANDONADA and applies 50% penalty when PENDIENTE', () => {
    const g = Goal.create('Abandon Me', 80);
    // initial private penalty is 0
    expect(g.penalizacion_restada).toBe(0);
    g.marcar_abandonada();
    expect(g.estado).toBe('ABANDONADA');
    expect(g.penalizacion_restada).toBeCloseTo(40);
  });

  test('marcar_abandonada does nothing if not PENDIENTE', () => {
    const g = Goal.create('No Change', 30);
    // force non-pendiente state
    g.estado = 'COMPLETADA';
    g.marcar_abandonada();
    expect(g.estado).toBe('COMPLETADA');
    expect(g.penalizacion_restada).toBe(0);
  });
});
