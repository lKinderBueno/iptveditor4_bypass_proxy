module.exports = async (router, options) => {
    router.post('/proxy', async (req, res) => {
        const url = req.body.url;
        console.log(`DOWNLOADING: ${url}\n`);

        try {
            const response = await fetch(url.trim(), {
                headers: {
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36"
                },
                timeout: 360000 // 6 minutes
            });

            if (!response.ok) {
                console.log(`Error: ${response.statusText}: ${url}\n`);
                return res.status(response.status).send(response.statusText);
            }

            const data = await response.text();
            res.send(data);
        } catch (err) {
            console.log(`${err && err.message ? err.message : "Unknown error"}: ${url}\n`);
            res.status(404).send();
        }
    });
}
