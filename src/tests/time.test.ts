import { getTimeDifferenceString } from "@/utils";
import { describe, it, expect, test } from "bun:test";

describe('getTimeDifferenceString', () => {
  const now = new Date();

  test('Test days case', () => {
    const daysDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 días antes
    expect(getTimeDifferenceString(daysDate)).toBe('Hace 15 días');
  })

  test('Test hours case', () => {
    const hoursDate = new Date(now.getTime() - 15 * 60 * 60 * 1000); // 15 horas antes
    expect(getTimeDifferenceString(hoursDate)).toBe('Hace 15 horas');
  })

  test('Test minutes case', () => {
    const minutesDate = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutos antes
    expect(getTimeDifferenceString(minutesDate)).toBe('Hace 15 minutos');
  })

  test('Test seconds case', () => {
    const secondsDate = new Date(now.getTime() - 15 * 1000); // 15 segundos antes
    expect(getTimeDifferenceString(secondsDate)).toBe('Hace 15 segundos');
  })

  // it('Should return the correct time difference string for different scenarios', () => {




  // });

  // // it('should handle edge cases correctly', () => {
  // //   const now = new Date();
  // //   const edgeCaseDate = new Date(now.getTime() - 1); // Solo 1 milisegundo antes
  // //   expect(getTimeDifferenceString(edgeCaseDate)).toBe('hace x días'); // Asumiendo que "x" es un valor que no se muestra
  // // });
})

