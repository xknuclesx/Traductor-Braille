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
    
    // Habilitar o deshabilitar el botón de traducir según el contenido del área de texto
    inputText.addEventListener('input', toggleTranslateButton);

    // Función para habilitar o deshabilitar el botón de traducir
   function toggleTranslateButton() {
    if (inputText.value.trim() === '') {
        translateButton.classList.add('disabled');
        translateButton.disabled = true;
    } else {
        translateButton.classList.remove('disabled');
        translateButton.disabled = false;
    }
}

// Llamar a la función inicialmente para configurar el estado del botón de traducir
toggleTranslateButton();
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
    toggleTranslateButton(); // Actualizar el estado del botón de traducir
}

// Inserta un carácter Braille en el área de texto
function insertCharacter(character) {
    var textArea = document.getElementById('input-text');
    textArea.value += character;
    toggleTranslateButton(); // Actualizar el estado del botón de traducir
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

// Inserta un carácter Braille en el área de texto
function insertCharacter(character) {
    var textArea = document.getElementById('input-text');
    textArea.value += character;
    toggleTranslateButton(); // Actualizar el estado del botón de traducir
}

// Función para habilitar o deshabilitar el botón de traducir
function toggleTranslateButton() {
    var inputText = document.getElementById('input-text');
    var translateButton = document.querySelector('.translate-button');
    if (inputText.value.trim() === '') {
        translateButton.classList.add('disabled');
        translateButton.disabled = true;
    } else {
        translateButton.classList.remove('disabled');
        translateButton.disabled = false;
    }
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
    translateButton.disabled = true; // Deshabilitar botón de traducir
    translateButton.classList.add('disabled'); // Añadir clase 'disabled' al botón de traducir
    document.getElementById('downloadPDFButton').classList.add('hidden'); // Ocultar botón de descarga de PDF
    document.getElementById('downloadPDFButton').style.display = 'none';
    document.getElementById('downloadImageButton').classList.add('hidden'); // Ocultar botón de descarga de imagen
    document.getElementById('downloadImageButton').style.display = 'none';

    if (direction === 'braille_to_text') {
        textArea.addEventListener('input', filterBrailleCharacters); // Habilitar el filtro de caracteres Braille
    }

    toggleTranslateButton(); // Actualizar el estado del botón de traducir
}



// Copia el texto del resultado al portapapeles
function copyText() {
    var resultTextElement = document.querySelector('.result p');
    var resultText = resultTextElement.innerText;

    if (resultText.trim() !== '') {
        navigator.clipboard.writeText(resultText).then(() => {
            alert('Texto copiado al portapapeles');
        });
    } else {
        alert('No hay texto para copiar');
    }
}

/////////////
// PDF
function printPage() {
    const resultContent = document.getElementById('resultText').innerHTML;
    const printWindow = window.open('', '_blank', 'width=210mm,height=297mm');
    printWindow.document.write('<html><head><title>Traducción realizada por: Fastbear Technologies</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('@page { size: A4; margin: 25mm; }');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20mm; margin: 0; box-sizing: border-box; }');
    printWindow.document.write('.printable { width: calc(210mm - 40mm); height: calc(297mm - 40mm); margin: 0; padding: 0; page-break-inside: avoid; position: relative; font-size: 40px; }'); // Tamaño de fuente aumentado
    printWindow.document.write('.footer { position: absolute; bottom: 10mm; width: 100%; text-align: center; font-size: 12px; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="printable">' + resultContent + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}



///////////














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
