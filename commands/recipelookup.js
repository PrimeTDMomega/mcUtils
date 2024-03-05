const axios = require('axios');
const { blue, green, yellow, red } = require('kleur');

async function recipeLookup(options) {
  const { item } = options;

  if (!item) {
    console.error(red('Error: Item is required.'));
    process.exit(1);
  }

  try {
    const response = await axios.get(`https://minecraft-ids.grahamedgecombe.com/item/${item}`);
    const { name, id, type, data, recipes } = response.data;

    console.log(`${blue('Item:')} ${green(name)} (#${yellow(id.toString().padStart(3, '0'))})`);
    console.log(`${blue('Type:')} ${yellow(type)}`);

    if (data) {
            console.log(`${blue('Data:')} ${yellow(data)}`);
    }

    if (recipes && recipes.length > 0) {
        console.log(`${blue('Recipes:')}`);
        recipes.forEach((recipe, index) => {
            console.log(`${yellow(index + 1)}. ${green(recipe.type)}:`);
            recipe.pattern.forEach((row, rowIndex) => {
                console.log(`  ${row.map(cell => cell.map(c => c === 0 ? blue('-') : green(c)).join(' '))}`);
            });
        });
    } else {
        console.log(`${yellow('No recipes found.')}`);
    }
  } catch (error) {
    console.error(red(`Error: Could not find item "${item}".`));
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = recipeLookup;