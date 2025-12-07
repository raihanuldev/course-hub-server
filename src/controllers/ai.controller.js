const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.openAI_key | 11111 })

module.exports = chat = async (req, res) => {
    try {
        const userQuery = req.body.query;
        const modelResponse = await openai.chat.completions.create({
            model: 'text-davinci-003',
            prompt: userQuery,
            max_tokens: 150,
        });

        console.log(modelResponse.choices[0].text.trim());
        res.send({ message: modelResponse.choices[0].text.trim() })
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}