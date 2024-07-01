document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    var inputContainer = document.querySelector('.input-result-container');
    var utilityButtons = document.querySelector('.utility-buttons');
    var translateButton = document.querySelector('.translate-button');
    var downloadPDFButton = document.getElementById('downloadPDFButton');
    var downloadImageButton = document.getElementById('downloadImageButton');
    var inputText = document.getElementById('input-text');
    var darkModeButton = document.getElementById('darkModeButton');

    // Inicializar estado de la interfaz
    inputContainer.classList.add('disabled');
    utilityButtons.style.display = 'none'; // Ocultar botones de utilidades inicialmente
    translateButton.style.display = 'none'; // Ocultar botón de traducir inicialmente
    downloadPDFButton.style.display = 'none'; // Ocultar botón de descarga de PDF inicialmente
    downloadImageButton.style.display = 'none'; // Ocultar botón de descarga de imagen inicialmente

    // Establecer texto inicial del botón de modo oscuro/claro
    darkModeButton.innerText = 'Modo Claro';

    // Añadir evento de filtro de caracteres Braille
    inputText.addEventListener('input', filterBrailleCharacters);
});

// Filtra caracteres Braille permitidos
function filterBrailleCharacters(event) {
    var allowedBrailleCharacters = '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿ ';
    var inputText = event.target.value;
    var filteredText = '';

    for (var char of inputText) {
        if (allowedBrailleCharacters.includes(char)) {
            filteredText += char;
        }
    }

    event.target.value = filteredText;
}

// Inserta un carácter Braille en el área de texto
function insertCharacter(character) {
    var textArea = document.getElementById('input-text');
    textArea.value += character;
}

// Envía el formulario de traducción
function submitForm() {
    var textArea = document.getElementById('input-text');
    var form = document.getElementById('translateForm');
    var formData = new FormData(form);
    var direction = document.getElementById('direction').value;

    // Habilita el área de texto temporalmente para asegurar que el valor se envíe
    textArea.removeAttribute('disabled');

    console.log('Texto enviado:', textArea.value);
    console.log('Dirección:', direction);

    fetch('/translate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        console.log('Resultado de la traducción:', result);
        document.getElementById('resultText').innerText = result.translated_text;
        document.getElementById('downloadPDFButton').classList.remove('hidden'); // Mostrar botón de descarga de PDF después de la traducción
        document.getElementById('downloadPDFButton').style.display = 'block';
        document.getElementById('downloadImageButton').classList.remove('hidden'); // Mostrar botón de descarga de imagen después de la traducción
        document.getElementById('downloadImageButton').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}


// Selecciona la dirección de la traducción y ajusta la interfaz
function selectDirection(direction) {
    var directions = ['text_to_braille', 'braille_to_text', 'text_to_braille_mirror'];
    directions.forEach(function(dir) {
        document.getElementById(dir).classList.remove('selected');
    });
    document.getElementById(direction).classList.add('selected');
    document.getElementById('direction').value = direction;

    var textArea = document.getElementById('input-text');
    var inputContainer = document.querySelector('.input-result-container');
    var brailleKeyboard = document.querySelector('.keyboard');
    var utilityButtons = document.querySelector('.utility-buttons');
    var translateButton = document.querySelector('.translate-button');
    var resultText = document.getElementById('resultText');

    // Limpiar el texto del resultado
    resultText.innerText = '';

    if (direction === 'braille_to_text') {
        textArea.removeEventListener('input', filterBrailleCharacters); // Deshabilitar el filtro de caracteres Braille
        textArea.removeAttribute('disabled'); // Asegúrate de que el área de texto no esté deshabilitada
        brailleKeyboard.style.display = 'block';
    } else {
        textArea.removeAttribute('disabled'); // Asegúrate de que el área de texto no esté deshabilitada
        brailleKeyboard.style.display = 'none';
        textArea.removeEventListener('input', filterBrailleCharacters); // Deshabilitar el filtro de caracteres Braille
    }

    inputContainer.classList.remove('disabled');
    textArea.value = '';
    utilityButtons.style.display = 'block'; // Mostrar botones de utilidades
    translateButton.style.display = 'block';
    document.getElementById('downloadPDFButton').classList.add('hidden'); // Ocultar botón de descarga de PDF
    document.getElementById('downloadPDFButton').style.display = 'none';
    document.getElementById('downloadImageButton').classList.add('hidden'); // Ocultar botón de descarga de imagen
    document.getElementById('downloadImageButton').style.display = 'none';

    if (direction === 'braille_to_text') {
        textArea.addEventListener('input', filterBrailleCharacters); // Habilitar el filtro de caracteres Braille
    } else {
        textArea.removeEventListener('input', filterBrailleCharacters); // Deshabilitar el filtro de caracteres Braille
    }
}


// Copia el texto del resultado al portapapeles
function copyText() {
    var resultText = document.querySelector('.result p').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Texto copiado al portapapeles');
    });
}

// Borra el texto del área de entrada
function clearText() {
    document.getElementById('input-text').value = '';
}

// Alterna el modo oscuro/claro
function toggleDarkMode() {
    var body = document.body;
    var darkModeButton = document.getElementById('darkModeButton');

    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeButton.innerText = 'Modo Claro';
    } else {
        darkModeButton.innerText = 'Modo Oscuro';
    }
}

// Descarga el resultado como un PDF
async function downloadPDF() {
    var resultTextElement = document.getElementById('resultText');
    var resultText = resultTextElement.innerText;

    var tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '1000px'; // Asegura que el contenedor tenga un ancho suficiente
    tempContainer.style.backgroundColor = '#ffffff'; // Fondo blanco para modo claro
    tempContainer.style.padding = '20px';
    tempContainer.style.fontSize = '80px'; // Tamaño de fuente aumentado
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.color = '#000000';
    tempContainer.innerText = resultText;

    document.body.appendChild(tempContainer);

    try {
        const canvas = await html2canvas(tempContainer);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');

        const imgWidth = 210; // Ancho de una hoja A4 en mm
        const pageHeight = 295; // Altura de una hoja A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('resultado.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        document.body.removeChild(tempContainer);
    }
}

// Descarga el resultado como una imagen
function downloadImage() {
    var resultTextElement = document.getElementById('resultText');
    var resultText = resultTextElement.innerText;

    var tempContainer = document.createElement('div');
    tempContainer.style.backgroundColor = '#ffffff'; // Fondo blanco para modo claro
    tempContainer.style.padding = '20px';
    tempContainer.style.fontSize = '80px'; // Tamaño de fuente aumentado
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.color = '#000000';
    tempContainer.innerText = resultText;

    document.body.appendChild(tempContainer);

    html2canvas(tempContainer).then(canvas => {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
                link.download = 'resultado.png';
        link.click();
        document.body.removeChild(tempContainer);
    }).catch(error => console.error('Error generating image:', error));
}

// Aumenta el zoom de la página
function zoomIn() {
    document.body.style.zoom = (parseFloat(document.body.style.zoom) || 1) + 0.1;
}

// Disminuye el zoom de la página
function zoomOut() {
    document.body.style.zoom = (parseFloat(document.body.style.zoom) || 1) - 0.1;
}

// Manejador del envío del formulario
// Manejador del envío del formulario
document.getElementById('translateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('resultText').innerText = result.translated_text;
        document.getElementById('resultText').classList.add('translated-text');
        document.getElementById('downloadPDFButton').classList.remove('hidden'); // Mostrar botón de descarga de PDF después de la traducción
        document.getElementById('downloadPDFButton').style.display = 'block';
        document.getElementById('downloadImageButton').classList.remove('hidden'); // Mostrar botón de descarga de imagen después de la traducción
        document.getElementById('downloadImageButton').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
});

