const sharp = require('sharp');
const axios = require('axios');
const path = require('path');

exports.generateThumbnail = async (req, res) => {
    const { imageUrl } = req.body;

    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer'
        });
        
        const thumbnail = await sharp(response.data)
            .resize(50, 50)
            .toBuffer();

        res.set('Content-Type', 'image/png');
        res.send(thumbnail);
    } catch (error) {
        res.status(500).json({ message: 'Error generating thumbnail' });
    }
};
