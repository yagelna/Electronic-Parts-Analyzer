import json
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from config import OPENAI_KEY, ASSISTANT_ID, APP_SECERT_KEY

app = Flask(__name__)
CORS(app)

# query openai assistant with the given content text
def query_openai(contentText):        
    client = OpenAI(api_key=OPENAI_KEY)
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": contentText,
            },
        ],
    )
    run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
    print("Run Created:", run.id)
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        print("Run Status:", run.status)
        time.sleep(1.0)
    else:
        print("Run Completed")
    message_response = client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id)
    messages = message_response.data
    return messages[0].content[0].text.value

@app.route('/query', methods=['POST']) 
def query():
    try:
        app_secert_key = request.headers.get('x-app-key')
        if app_secert_key != APP_SECERT_KEY:
            return jsonify({'error': 'Invalid app key'}), 401
        
        data = request.get_json()
        if not data or 'partNumbers' not in data:
            print("first if")
            return jsonify({'error': 'Invalid request'}), 400
        content = "; ".join(data['partNumbers'])
        response = query_openai(content)
        print("Response:", response)
        response_json = json.loads(response)
        
        return jsonify(response_json)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)

    

