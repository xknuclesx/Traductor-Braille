
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

def braille_to_text(text):
    text_braille = ""
    num_detector = False  
    upper_detector = False
    for char in text:
        if char == '⠼':
            num_detector = True
        elif char.isspace():
            text_braille += char
            num_detector = False
        elif num_detector:
            text_braille += braille_dict_number_inverse[char]
        elif char == '⠨':
            upper_detector = True
        elif upper_detector:
            text_braille += braille_dict_alpha_inverse[char].upper()
            upper_detector = False
        else:
            text_braille += braille_dict_alpha_inverse[char]
    return text_braille

texto_a_convertir = "Hola, (esta es) ¿una? Prueba: \" de; braile. 123\" y 4560"
braile_a_convertir = "⠨⠓⠕⠇⠁⠂ ⠣⠑⠎⠞⠁ ⠑⠎⠜ ⠢⠥⠝⠁⠢ ⠏⠗⠥⠑⠃⠁⠒ ⠙⠑⠆ ⠃⠗⠁⠊⠇⠑⠄ ⠼⠁⠃⠉ ⠽ ⠼⠙⠑⠋⠚"
resultado = text_to_braille(texto_a_convertir)
print("Texto original:", texto_a_convertir)
print("Texto en Braille:", resultado)
print("Texto en Braille espejo:", text_to_braille_mirror(texto_a_convertir[::-1]))
print("Braille en Texto:", braille_to_text(braile_a_convertir))

def text_to_braille(text, mirror=False):
    braille_text = ""
    first_num = True  # Track the first number to prefix with number indicator
    for char in text:
        lower_char = char.lower()
        if char.isdigit():
            if first_num:
                braille_text += '⠼'  # Number prefix in Braille
                first_num = False
            braille_text += braille_dict_number[char]
        elif lower_char in (braille_dict_mirror if mirror else braille_dict_alpha):
            if char.isupper():
                braille_text += '⠨'  # Capital letter prefix in Braille
            dict_used = braille_dict_mirror if mirror else braille_dict_alpha
            braille_text += dict_used[lower_char]
        else:
            if char.isspace():
                first_num = True  # Reset number tracking on space
            braille_text += char
    return braille_text

def braille_to_text(braille):
    text = ""
    is_num = False
    is_upper = False
    for char in braille:
        if char == '⠼':
            is_num = True
        elif char == '⠨':
            is_upper = True
        elif char.isspace():
            text += char
            is_num = False
            is_upper = False
        else:
            if is_num:
                text += braille_dict_number_inverse.get(char, '')
            elif is_upper:
                text += braille_dict_alpha_inverse.get(char, '').upper()
            else:
                text += braille_dict_alpha_inverse.get(char, '')
            is_num = False
            is_upper = False
    return text

# Example usage
text_example = "Hello, World! 123"
braille_converted = text_to_braille(text_example)
print("Braille:", braille_converted)
print("Back to text:", braille_to_text(braille_converted))

texto_a_convertir = "Hola, (esta es) ¿una? prueba: \" de; braile. 123\" y 4560"
braile_a_convertir = "⠨⠓⠕⠇⠁⠂ ⠣⠑⠎⠞⠁ ⠑⠎⠜ ⠢⠥⠝⠁⠢ ⠏⠗⠥⠑⠃⠁⠒ ⠙⠑⠆ ⠃⠗⠁⠊⠇⠑⠄ ⠼⠁⠃⠉ ⠽ ⠼⠙⠑⠋⠚"
resultado = text_to_braille(texto_a_convertir)
print("Texto original:", texto_a_convertir)
print("Texto en Braille:", resultado)
print("Texto en Braille espejo:", text_to_braille_mirror(texto_a_convertir[::-1]))
print("Braille en Texto:", braille_to_text(braile_a_convertir))
