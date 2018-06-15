# platziverse-db

## Usage

``` js

const setupDatabase = require('platziverse-db');

setupDatabase(config).then(db => {
    const { Agent, Metric } = db;
}).catch(err => console.log(err));

```