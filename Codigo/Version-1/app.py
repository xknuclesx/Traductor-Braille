from flask import Flask, render_template, request, jsonify
from source.functions import handle_translation

# Inicializa la aplicación Flask
app = Flask(__name__)

@app.route('/')
def index():
    """
    Página principal.
    Renderiza la plantilla index.html con valores iniciales vacíos.
    """
    # Inicializar variables
    input_text = ""
    translation_result = ""
    translation_direction = ""

    # Renderizar la plantilla con variables iniciales
    return render_template('index.html', 
                           input_text=input_text, 
                           result=translation_result, 
                           direction=translation_direction)

@app.route('/translate', methods=['POST'])
def translate():
    """
    Ruta de traducción.
    Procesa el texto enviado desde el formulario y devuelve el resultado de la traducción.
    """
    # Obtener datos del formulario
    input_text = request.form.get('text', '')
    translation_direction = request.form.get('direction')
    
    # Registro de los datos recibidos para depuración
    print(f"Received text: {input_text}")
    print(f"Received direction: {translation_direction}")

    # Procesar la traducción si se ha proporcionado texto
    if input_text:
        translation_result = handle_translation(input_text, translation_direction)
        print(f"Translation result: {translation_result}")
    else:
        translation_result = "No text provided for translation."

    # Devolver el resultado en formato JSON
    return jsonify(translated_text=translation_result, 
                   input_text=input_text, 
                   direction=translation_direction)

if __name__ == '__main__':
    # Ejecutar la aplicación Flask en modo de depuración
    app.run(debug=True)

