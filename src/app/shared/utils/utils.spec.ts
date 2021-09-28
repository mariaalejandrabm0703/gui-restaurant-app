import {currencyFormat} from './utils';

it('se ejecuta currencyFormat correctamente', () => {
   const currency = 500;
   const spec = '$500.00';
   expect(currencyFormat(currency)).toBe(spec);
  });

  