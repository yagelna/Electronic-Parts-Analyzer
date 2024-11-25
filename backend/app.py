from flask import Flask, request, jsonify
import openai
from config import OPENAI_KEY

app = Flask(__name__)

openai.api_key = OPENAI_KEY