module.exports = async (router, options) => {
    router.post('/proxy', async (req, res) => {
        const useragent = generateRandomUserAgent();
        const url = req.body.url;
        console.log(`DOWNLOADING: ${url} with User-Agent: ${useragent}\n`);

        try {
            const response = await fetch(url.trim(), {
                headers: {
                    'User-Agent': useragent
                },
                timeout: 600000 // 10 minutes
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

const generateRandomUserAgent = () => {
    const userAgents = ["okhttp/_libv_","TiviMate/_libv_ (_device_; Android _andv_)"]
    const androidTvDevices = [
        "Amazon AFTMM",
        "NVIDIA Shield TV",
        "Google Chromecast with Google TV",
        "Xiaomi Mi Box S",
        "Sony Bravia Android TV",
        "Philips Android TV",
        "TCL Android TV",
        "Hisense Android TV",
        "Sharp Android TV",
        "OnePlus TV"
    ];

    const androidVersion = `${getRandomNumberInRange(6,14)}.${getRandomNumberInRange(0,2)}.${getRandomNumberInRange(0,2)}`;
    const libVersion = `${getRandomNumberInRange(2,4)}.${getRandomNumberInRange(0,20)}.${getRandomNumberInRange(0,20)}`;

    const randomUAIndex = Math.floor(Math.random() * userAgents.length);
    const randomDeviceIndex = Math.floor(Math.random() * androidTvDevices.length);
    return userAgents[randomUAIndex].replace("_libv_", libVersion).replace("_andv_", androidVersion).replace("_device_", androidTvDevices[randomDeviceIndex]);
}

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}