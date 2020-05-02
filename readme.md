React based snake game. Main purpose - use as little packages as possible to grasp basic main principles of plain react.

## Installation

```bash
git clone git@github.com:dovydasbu/react-old-snake-game.git
cd react-old-snake-game
yarn
yarn start
```

And you should import styles

```bash
import 'react-old-snake-game/dist/assets/css/index.css'
```

## Usage

```js
import Snake from 'react-old-snake-game';
import 'react-old-snake-game/dist/assets/css/index.css'

const App = () => {
  return (
    <Snake/>
  )
}

export default App
```

## Controls

- With arrow keys
---
- w goes &uarr;
- d goes &rarr;
- s goes &darr;
- a goes &larr;

## License
[MIT](https://choosealicense.com/licenses/mit/)