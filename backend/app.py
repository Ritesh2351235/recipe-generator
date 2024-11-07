from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = 3000  # You can also use environment variables

def generate_recipe_with_ollama(prompt):
    # Placeholder function for calling the Ollama model
    # Replace this with actual code to interact with the Ollama model
    # For example, using requests or any other HTTP client
    return {
        "Dish": "Sample Dish",
        "Ingredients": ["Ingredient 1", "Ingredient 2"],
        "Steps": ["Step 1", "Step 2"]
    }

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.json
    ingredients = data.get('ingredients', [])

    try:
        print('Received ingredients:', ingredients)  # Log received ingredients

        # Create prompt for the model
        prompt = f"Create a recipe using these ingredients: {', '.join(ingredients)}. " \
                 "Please format the response as follows: " \
                 "Dish: [Dish Name] " \
                 "Ingredients: [List of ingredients] " \
                 "Steps: [List of steps in numbered format]"

        # Call Ollama model to generate a recipe
        response = generate_recipe_with_ollama(prompt)

        # Check if response contains expected content
        if response:
            res_content = {
                'recipe': f'Dish: {response["Dish"]}\n' +
                          f'Ingredients: {", ".join(response["Ingredients"])}\n' +
                          f'Steps: ' + '\n'.join([f'{i + 1}. {step}' for i, step in enumerate(response["Steps"])])
            }
            return jsonify(res_content), 200
        else:
            raise ValueError('Invalid response from Ollama')

    except Exception as error:
        print('Error interacting with the model:', error)
        return jsonify({'error': 'Error generating recipe'}), 500

if __name__ == '__main__':
    app.run(port=PORT)
