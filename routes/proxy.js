const { default: axios } = require("axios");

module.exports = async (router, options) => {
    router.post('/proxy', async(req,res)=>{
        const url = req.body.url;
        console.log(`DOWNLOADING: ${url}\n`)
        const data = await axios.get(url.trim(), {
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36"
            },
            timeout: 60000,
        }).then(result => result.data)
        .catch(err => {
            console.log(`ERROR: ${url}\n`)
        });
        if(data)
            res.send(data)
        else res.status(404).send()
    });
}