const guessList = [
  { guessCategory: "city",
    guessName: "New York",
    hint: "This is a city"
  },
  { guessCategory: "city",
  guessName: "Shanghai",
  hint: "This is a city"
  },
  { guessCategory: "city",
      guessName: "Tokyo",
      hint: "This is a city"
  },
  { guessCategory: "city",
    guessName: "Sydney",
    hint: "This is a city"
  },
  { guessCategory: "city",
      guessName: "Chicago",
      hint: "This is a city",
  },
  { guessCategory: "fruit",
  guessName: "Apple",
  hint: "This is a fruit"
  },
  { guessCategory: "fruit",
      guessName: "Watermelon",
      hint: "This is a fruit"
  },
  { guessCategory: "fruit",
      guessName: "Pear",
      hint: "This is a fruit"
  },
  { guessCategory: "fruit",
      guessName: "Blackberry",
      hint: "This is a fruit"
  },
  { guessCategory: "fruit",
      guessName: "Strawberry",
      hint: "This is a fruit"
  },
  { guessCategory: "fruit",
      guessName: "Peach",
      hint: "This is a fruit"
  },
  { guessCategory: "drink",
  guessName: "Coffee",
  hint: "This is a drink"
  },
  { guessCategory: "drink",
  guessName: "Milktea",
  hint: "This is a drink"
  },  
  { guessCategory: "drink",
  guessName: "Orange Juice",
  hint: "This is a drink"
  },
  { guessCategory: "country",
  guessName: "America",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "America",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "Canada",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "China",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "Chile",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "Mexico",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "England",
  hint: "This is a country"
  },
  { guessCategory: "country",
  guessName: "Ireland",
  hint: "This is a country"
  }
];

export let guessItem = guessList[Math.floor(Math.random()* guessList.length)];