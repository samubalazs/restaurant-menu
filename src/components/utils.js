export const currency = "$";

const ingredientOptions = ["Salt", "Pepper"];

export const createOptions = () => {
  return ingredientOptions.map(function (ingredient, i) {
    return (
      <option key={i} value={ingredient}>
        {ingredient}
      </option>
    );
  });
};
