# Braille Translator Application

## Indice

### [Código](Codigo)
  - [Versión 1](Codigo/Version-1)
      - [static/css](Codigo/Version-1/static/css)
      - [static/js](Codigo/Version-1/static/js)
      - [templates](Codigo/Version-1/templates)
      - [app.py](Codigo/Version-1/app.py)

### [Documentos](Documentos)
   - [Fase 1](Documentos/'Fase 1 (Demo)').
       - [Calidad de software](Documentos/Fase%201%20(Demo)/Calidad-de-software)
        1. [Historias de Usuario](Documentos/Fase%201%20(Demo)/Calidad-de-software/1-HistoriasDeUsuario.docx)
            - [Diagrama de Casos de Uso](Documentos/Fase%201%20(Demo)/Calidad-de-software/CasosDeUso.png)
            - [Diagrama de Robustez CU1](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaRobustezCU1.png)
            - [Diagrama de Robustez CU2](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaRobustezCU2.png)
            - [Diagrama de Robustez CU3](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaRobustezCU3.png)
            - [Diagrama de Actividades CU1](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaDeActividadCU1.png)
            - [Diagrama de Actividades CU2](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaDeActividadCU2.png)  
            - [Diagrama de Actividades CU3](Documentos/Fase%201%20(Demo)/Calidad-de-software/DiagramaDeActividadCU3.png)
        2. [Diseño de Casos de Prueba](Documentos/Fase%201%20(Demo)/Calidad-de-software/diseño-de-casos-de-prueba)
        3. [Modelo Arquitectónico](Documentos/Fase%201%20(Demo)/Calidad-de-software/3-ModeloArquitectonico.docx)
        4. [Diseño del Producto](Documentos/Fase%201%20(Demo)/Calidad-de-software/4-DiseñoDelProducto.docx)
        5. [Listado de Herramientas y Tecnologías de Desarrollo](Documentos/Fase%201%20(Demo)/Calidad-de-software/5-ListadoDeHerramientas-TecnologiasDeDesarrollo.docx)
        6. [Pruebas Unitarias](Documentos/Fase%201%20(Demo)/Calidad-de-software/6-PruebasUnitarias.docx)
          
    
      - [Construcción y evolución de software](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software)
        1. [Base de Datos de Conocimiento](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/BaseDeDatosDeConocimiento.pdf)
        2. [Documentación del ambiente de desarrollo](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/DocumentacionDelAmbienteDeDesarrollo.pdf)
        3. [Flujo de Trabajo](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/FlujoDeTrabajo.pdf)
        4. [La trazabilidad de cada uno de los artefactos](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/TrazabilidadDeLosArtefactos.pdf)
        5. [Manual de usuario](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/ManualDeUsuario.pdf)
        6. [Manual de instalación-Configuración](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/ManualDeInstalacionConfiguración.pdf)
        7. [Manual de programador](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/ManualDelProgramador.pdf)
        8. [Notas de Versión](Documentos/Fase%201%20(Demo)/Construccion-y-evolucion-de-software/NotasDeVersión.pdf)
   - [Version 1](Documentos/Versión%21.0).
      - [Calidad de software](Documentos/Versión%21.0/Calidad-de-software)
        1. [Historias de Usuario](Documentos/Versión%21.0/Calidad-de-software/1-HistoriasDeUsuario.docx)
            - [Diagrama de Casos de Uso](Documentos/Versión%21.0/Calidad-de-software/CasosDeUso.png)
            - [Diagrama de Robustez CU1](Documentos/Versión%21.0/Calidad-de-software/DiagramaRobustezCU1.png)
            - [Diagrama de Robustez CU2](Documentos/Versión%21.0/Calidad-de-software/DiagramaRobustezCU2.png)
            - [Diagrama de Robustez CU3](Documentos/Versión%21.0/Calidad-de-software/DiagramaRobustezCU3.png)
            - [Diagrama de Actividades CU1](Documentos/Versión%21.0/Calidad-de-software/DiagramaDeActividadCU1.png)
            - [Diagrama de Actividades CU2](Documentos/Versión%21.0/Calidad-de-software/DiagramaDeActividadCU2.png)  
            - [Diagrama de Actividades CU3](Documentos/Versión%21.0/Calidad-de-software/DiagramaDeActividadCU3.png)
        2. [Diseño de Casos de Prueba](Documentos/Versión%21.0/Calidad-de-software/diseño-de-casos-de-prueba)
        3. [Modelo Arquitectónico](Documentos/Versión%21.0/Calidad-de-software/3-ModeloArquitectonico.docx)
        4. [Diseño del Producto](Documentos/Versión%21.0/Calidad-de-software/4-DiseñoDelProducto.docx)
        5. [Listado de Herramientas y Tecnologías de Desarrollo](Documentos/Versión%21.0/Calidad-de-software/5-ListadoDeHerramientas-TecnologiasDeDesarrollo.docx)
      

## Descripción del Proyecto

Esta aplicación convierte texto en Braille y viceversa, utilizando varios diccionarios de caracteres Braille, incluyendo un diccionario de caracteres espejados. La aplicación permite a los usuarios traducir texto a Braille, Braille a texto y texto a Braille espejado a través de una interfaz web.

## Características

- Traducción de texto a Braille
- Traducción de Braille a texto
- Traducción de texto a Braille espejado
- Validación de entradas
- Interfaz web intuitiva
- Descarga de la traducción a PDF
- Descarga de la traducción a PNG

## Requisitos del Entorno

- *Python 3.7+*
- *Flask 1.1.2+*

Créditos: Fastbear Technologies
