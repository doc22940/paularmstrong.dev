import * as React from 'react';
import fraction from 'num2fraction';

const unitIndex = Object.freeze({
  tsp: 0,
  tbsp: 1,
  tbs: 1,
  oz: 2,
  ounce: 2,
  cup: 3,
  pint: 4,
  pt: 4,
  quart: 5,
  qt: 5,
  gal: 6,
  gallon: 6,
});

const keyToUnit = ['tsp', 'tbsp', 'oz', 'cup', 'pint', 'quart', 'gallon'];

const normalUnits = ['g', ''];
const commonFractions = [1, 3 / 4, 2 / 3, 1 / 2, 1 / 3, 1 / 4, 1 / 8];

const factorTable = [
  // tsp, tbsp, oz, cup, pt, qt, gal
  /* tsp  */ [1, 1 / 3, 1 / 6, 1 / 48, 1 / 96, 1 / 192, 1 / 768],
  /* tbsp */ [3, 1, 1 / 2, 1 / 16, 1 / 32, 1 / 64, 1 / 256],
  /* oz   */ [6, 2, 1, 1 / 8, 1 / 16, 1 / 32, 1 / 128],
  /* cup  */ [1 / 48, 1 / 16, 8, 1, 1 / 2, 1 / 4, 1 / 16],
  /* pt   */ [96, 32, 16, 2, 1, 1 / 2, 1 / 4],
  /* qt   */ [192, 64, 32, 4, 2, 1, 1 / 2],
  /* gal  */ [768, 256, 128, 16, 8, 4, 1],
];

function getCloseFraction(value) {
  let i = 0;
  while (i < commonFractions.length) {
    const diff = value - Math.floor(value) - commonFractions[i];
    if (diff < 0.0001 && diff > -0.0001) {
      return commonFractions[i];
    }
    i += 1;
  }
  return false;
}

function normalizeValue(value, unit) {
  if (value < 1) {
    let i = unitIndex[unit] - 1;
    while (i >= 0) {
      const index = unitIndex[unit];
      const normalValue = value * factorTable[i][index];
      if (normalValue in commonFractions) {
        return [normalValue, keyToUnit[i]];
      }
      i -= 1;
    }
    return [value, unit];
  } else if (value > 1) {
    const row = factorTable[unitIndex[unit]];
    let i = unitIndex[unit];
    while (i <= row.length) {
      const normalValue = value * row[i];
      const closestFraction = getCloseFraction(normalValue);
      if (closestFraction) {
        return [normalValue, keyToUnit[i]];
      }
      i += 1;
    }
  }
  return [value, unit];
}

export function Ingredient({ value, units, item, multiplier }) {
  if (units && !normalUnits.includes(units) && !Object.keys(unitIndex).includes(units)) {
    throw new Error(`Unknown unit ${units}`);
  }
  const [scaledValue, scaledUnits] = normalUnits.includes(units)
    ? [value * multiplier, units]
    : normalizeValue(value * multiplier, units);

  const decimals = scaledValue - Math.floor(scaledValue);
  const fractionalValue = fraction(scaledValue);
  const fractionalDecimal = fraction(decimals);
  const readableValue =
    /^1\//.test(fractionalValue) && !fractionalValue.endsWith('/1')
      ? fractionalValue
      : /^1\//.test(fractionalDecimal) && !fractionalDecimal.endsWith('/1')
      ? `${Math.floor(scaledValue)} ${fractionalDecimal}`
      : scaledValue.toFixed(2).replace(/\.0+$/, '').replace(/0$/, '');

  return (
    <tr>
      <td>{item}</td>
      <td className="ingredients--value">{readableValue}</td>
      <td>{scaledUnits}</td>
    </tr>
  );
}

export default function Ingredients(props) {
  const { defaultServings = 1, servingUnits = 'serving', servingStep = defaultServings / 4, ingredients } = props;
  const [servings, setServings] = React.useState(defaultServings);
  const handleUpdateServings = React.useCallback(
    (event) => {
      const setValue = parseFloat(event.target.value, 10);
      setServings(setValue || defaultServings);
    },
    [setServings]
  );

  return (
    <>
      <label>
        Servings:{' '}
        <input type="number" min={servingStep} step={servingStep} value={servings} onChange={handleUpdateServings} />{' '}
        {servingUnits}
      </label>

      <table className="ingredients">
        <thead>
          <tr>
            <th>Item</th>
            <th colSpan={2}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(({ value, units, item }, i) => (
            <Ingredient key={i} value={value} units={units} item={item} multiplier={servings / defaultServings} />
          ))}
        </tbody>
      </table>
    </>
  );
}
