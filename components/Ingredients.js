import * as React from 'react';
import fraction from 'num2fraction';

export function Ingredient({ value, units, item, multiplier }) {
  const scaledValue = value * multiplier;
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
      <td>{units}</td>
    </tr>
  );
}

export default function Ingredients(props) {
  const { defaultServings = 1, servingUnits = 'serving', servingStep = defaultServings / 4, ingredients } = props;
  const [servings, setServings] = React.useState(defaultServings);
  const handleUpdateServings = React.useCallback(
    (event) => {
      setServings(parseFloat(event.target.value, 10));
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
            <th colspan={2}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(({ value, units, item }) => (
            <Ingredient
              id={`${value}-${units}-${item}`}
              value={value}
              units={units}
              item={item}
              multiplier={servings / defaultServings}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
