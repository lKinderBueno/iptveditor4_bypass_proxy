const { processManager } = require('./process');
const open = require('open');

const app = require('fastify')({
    connectionTimeout: 90000,
    ignoreTrailingSlash: true,
    disableRequestLogging: true,
});

app.get("/hello", (req,res)=>res.send({status:"ok"}));
app.register(require('./routes/proxy'), { prefix: '/' })

app.register(require('fastify-cors'), {
    origin: [/192.168.178.71/, /localhost:3000/, /iptveditor\.com$/],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: 'Origin, Content-Type, X-Auth-Token',
    exposedHeaders: 'Content-Length, X-JSON',
})


app.listen(9710/*, '0.0.0.0'*/).then((server) => {
    console.log(`IPTVEditor 4 Bypass successfully started.\nOpening iptveditor.com...`)
    open('https://cloud.iptveditor.com');
});
processManager(app)
