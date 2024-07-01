
from flask import Flask, render_template, request
from source.functions import *
app = Flask(__name__)

@app.route('/../templates/')
def index():
    """
    Página principal.
    """
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    """
    Ruta de traducción.
    """
    text = request.form['text']
    direction = request.form['direction']
    result = handle_translation(text, direction)
    return render_template('index.html', input_text=text, result=result, direction=direction)