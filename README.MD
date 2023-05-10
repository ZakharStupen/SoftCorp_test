# Blinker

`npm run i`

`npm run dev` - run dev build and browsersync
`npm run build` - generate sources from `src/` folder, minify them, put to `public` 


## ESLint for WebStorm / PHPStorm

- You need install `Prettier` and `ESlint` plugins from `File/Settings/Plugins`.

### Customize ESLint

- Go to `File/Settings/languages & frameworks / javascript / Code Quality Tools / ESlint`.

- And select `Automatioc ESLint configuration`.

### Customize Prettier

- Go to `File/Settings/languages & frameworks / javascript / Prettier`

- And select `On 'Reformat Code' action CTRL + ALT + L`

## ESLint for VSCode

- You need install `Prettier` and `ESlint` plugins from `Extensions`.

### Customize ESLint

- Go to `File/Preferences/Settings/`.

- Write in field `Eslint`.

- Search `Controls whether eslint in enabel or not`. And add a checkmark for it.

You should fixe it in `User` and `Workspace`. 

### Customize Prettier
- Right click anywhere in the code. Select `Format Documet With...`.

- Select `Configure default formatter...`

- Select `Prettier - code formatter`

If you tab `shift + alt + f` the code in the file is formatted according to the rules prettier.

## How add new rules for esLint or Prettier? 

### For ESLint :
- `.eslintrc`
### For Prettier :
- `prettier.config.js`
