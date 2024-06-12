
from source.dictionary import *

def is_valid_text(text, direction):
    """
    Valida el texto según la dirección de traducción.
    
    :param text: Texto de entrada.
    :param direction: Dirección de traducción.
    :return: True si el texto es válido, False en caso contrario.
    """
    valid_chars = set(braille_dict_alpha.keys()).union(set(braille_dict_number.keys())).union(set(braille_dict_symbol.keys()))
    valid_braille_chars = set(braille_dict_alpha_inverse.keys()).union(set(braille_dict_number_inverse.keys()), set('⠼⠨'))

    if direction     in ['text_to_braille', 'text_to_braille_mirror']:
        return all(char.lower() in valid_chars or char.isspace() for char in text)
    elif direction == 'braille_to_text':
        return all(char in valid_braille_chars or char.isspace() for char in text)
    
    return False

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

    if not mirror:
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

    if mirror:
        num_detector = False
        for char in text:
            if char.isdigit():
                num_detector = True
            if char.lower() in dict_used:
                braille_text.append(dict_used[char.lower()])
                if char.isupper():
                    braille_text.append('⠅')
            if char.isspace() and num_detector:
                braille_text.append('⠧ ')
                num_detector = False
                braille_text.append(' ')
        if char.isdigit():
            braille_text.append('⠧')

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
