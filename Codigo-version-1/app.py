from flask import Flask, render_template, request

app = Flask(__name__)

braille_dict_alpha = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    'ñ': '⠻', 'á': '⠷', 'é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾', 'ü': '⠳',
    ',': '⠂', '.': '⠄', ';': '⠆', ':': '⠒', '"': '⠦', '(': '⠣', ')': '⠜',
    '¿': '⠢', '?': '⠢', '¡': '⠖', '!': '⠖'
}

braille_dict_number = {
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
}

braille_dict_mirror = {
    'a': '⠈', 'b': '⠘', 'c': '⠉', 'd': '⠋', 'e': '⠊', 'f': '⠙', 'g': '⠛',
    'h': '⠚', 'i': '⠑', 'j': '⠓', 'k': '⠨', 'l': '⠸', 'm': '⠩', 'n': '⠫',
    'o': '⠪', 'p': '⠹', 'q': '⠻', 'r': '⠺', 's': '⠱', 't': '⠳', 'u': '⠬',
    'v': '⠼', 'w': '⠗', 'x': '⠭', 'y': '⠯', 'z': '⠮',
    'ñ': '⠟', 'á': '⠾', 'é': '⠵', 'í': '⠡', 'ó': '⠥', 'ú': '⠷', 'ü': '⠞',
    '1': '⠈', '2': '⠘', '3': '⠉', '4': '⠋', '5': '⠊', '6': '⠙', '7': '⠛',
    '8': '⠚', '9': '⠑', '0': '⠓',
    ',': '⠐', '.': '⠠', ';': '⠰', ':': '⠒', '"': '⠴', '(': '⠜', ')': '⠣',
    '¿': '⠔', '?': '⠔', '¡': '⠲', '!': '⠲'
}

braille_dict_alpha_inverse = {value: key for key, value in braille_dict_alpha.items()}
braille_dict_number_inverse = {value: key for key, value in braille_dict_number.items()}

def text_to_braille(text, mirror=False):
    """
    Convierte texto a Braille.
    
    :param text: Texto de entrada.
    :param mirror: Si True, utiliza el diccionario mirror.
    :return: Texto en Braille.
    """
    braille_text = []
    first_num = True  # Rastrea el primer número para prefijar con el indicador de número
    dict_used = braille_dict_mirror if mirror else braille_dict_alpha

    for char in text:
        lower_char = char.lower()
        if char.isdigit():
            if first_num:
                braille_text.append('⠼')  # Prefijo de número en Braille
                first_num = False
            braille_text.append(braille_dict_number[char])
        elif lower_char in dict_used:
            if char.isupper():
                braille_text.append('⠨')  # Prefijo de letra mayúscula en Braille
            braille_text.append(dict_used[lower_char])
        else:
            if char.isspace():
                first_num = True  # Restablece el seguimiento de números en espacio
            braille_text.append(char)
    
    return ''.join(braille_text)

def braille_to_text(braille):
    """
    Convierte Braille a texto.
    
    :param braille: Texto en Braille.
    :return: Texto convertido.
    """
    text = []
    is_num = False
    is_upper = False

    for char in braille:
        if char == '⠼':
            is_num = True
        elif char == '⠨':
            is_upper = True
        elif char.isspace():
            text.append(char)
            is_num = False
            is_upper = False
        else:
            if is_num:
                text.append(braille_dict_number_inverse.get(char, ''))
            elif is_upper:
                text.append(braille_dict_alpha_inverse.get(char, '').upper())
            else:
                text.append(braille_dict_alpha_inverse.get(char, ''))
            is_upper = False

    return ''.join(text)

@app.route('/')
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

def handle_translation(text, direction):
    """
    Maneja la traducción según la dirección especificada.
    
    :param text: Texto de entrada.
    :param direction: Dirección de traducción.
    :return: Resultado de la traducción.
    """
    if not is_valid_text(text, direction):
        return "Texto no válido para la dirección seleccionada."
    
    try:
        if direction == 'text_to_braille':
            return text_to_braille(text)
        elif direction == 'braille_to_text':
            return braille_to_text(text)
        elif direction == 'text_to_braille_mirror':
            return text_to_braille(text[::-1], mirror=True)
        else:
            return 'Dirección no válida'
    except Exception as e:
        return f'Error: {str(e)}'

def is_valid_text(text, direction):
    """
    Valida el texto según la dirección de traducción.
    
    :param text: Texto de entrada.
    :param direction: Dirección de traducción.
    :return: True si el texto es válido, False en caso contrario.
    """
    valid_chars = set(braille_dict_alpha.keys()).union(set(braille_dict_number.keys()), set(' ,.;:()"¿?¡!'))
    valid_braille_chars = set(braille_dict_alpha_inverse.keys()).union(set(braille_dict_number_inverse.keys()), set('⠼⠨'))

    if direction in ['text_to_braille', 'text_to_braille_mirror']:
        return all(char.lower() in valid_chars or char.isspace() for char in text)
    elif direction == 'braille_to_text':
        return all(char in valid_braille_chars or char.isspace() for char in text)
    
    return False

if __name__ == '__main__':
    app.run(debug=True)
