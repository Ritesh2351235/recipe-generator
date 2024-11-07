import express from 'express';
import ollama from 'ollama';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/generate-recipe', async (req, res) => {
  const { ingredients } = req.body; // Expecting an array of ingredients

  try {
    console.log('Received ingredients:', ingredients); // Log received ingredients

    // Create prompt for the model
    const prompt = `Create a recipe using these ingredients: ${ingredients.join(', ')}.
                    Please format the response as follows:
                    Dish: [Dish Name]
                    Ingredients: [List of ingredients]
                    Steps: [List of steps in numbered format]`;

    // Call Ollama model to generate a recipe
    const response = await ollama.chat({
      model: 'llama2',
      messages: [{ role: 'user', content: prompt }],
    });

    // Check if response is valid and contains expected content
    if (response && response.message && response.message.content) {
      res.json({ recipe: response.message.content }); // Send back the formatted recipe
    } else {
      throw new Error('Invalid response from Ollama');
    }
  } catch (error) {
    console.error('Error interacting with the model:', error);
    res.status(500).send({ error: 'Error generating recipe' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});