const app = require('./app')
const Loaders = require('./loaders/index')

Loaders.start();
app.listen(3031, () => console.log('Server is Running...'));