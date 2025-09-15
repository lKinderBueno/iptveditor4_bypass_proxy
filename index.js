const { processManager } = require('./process');
const open = require('open');

const app = require('fastify')({
    connectionTimeout: 90000,
    disableRequestLogging: true,
});

app.get("/hello", (req, res) => res.send({ status: "ok" }));
app.register(require('./routes/proxy'), { prefix: '/' })

app.register(require('@fastify/cors'), {
    origin: [/localhost/, /\.iptveditor\.com$/],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    maxAge: 100
})

app.listen({ port: 9710 }/*, '0.0.0.0'*/).then((server) => {
    console.log(`IPTVEditor 4 Bypass successfully started.\nOpening iptveditor.com...`)
    open('https://cloud.iptveditor.com');
});
processManager(app)
