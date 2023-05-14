from flask import Flask, jsonify, request
from gpt_index import GPTSimpleVectorIndex
from langchain.chat_models import ChatOpenAI
from flask_cors import CORS
import os

os.environ["OPENAI_API_KEY"] = '' #add your OPENAI API key here
docs_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data'))

app = Flask(__name__)
CORS(app)


@app.route('/chatbot', methods=['POST'])
def chatbot():
    input_text = request.json['message']
    index = GPTSimpleVectorIndex.load_from_disk('index.json')
    response = index.query(input_text, response_mode="compact")
    return jsonify({'response': response.response})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)