//swagger docs
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swaggerHappiness.json');
const express = require('express');
const helmet = require("helmet");
const router = require('./routes/router');
const logger = require("morgan")

//start express app
const app = express();
//helmet
app.use(helmet());

//logger
app.use(logger('dev'));
logger.token('req',(req, res)=> JSON.stringify(req.headers));
logger.token('res',(req, res)=> {
    const headers = {}
    res.getHeaderNames().map(h =>headers[h] = res.getHeader(h));
    return JSON.stringify(headers)
});

//swagger docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(express.json());

//route end points
app.use(router);

//Start Server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
});

