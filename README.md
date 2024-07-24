# Hardhat Conquer TaskList

Este proyecto es una aplicación de lista de tareas desarrollada con Solidity y desplegada en la blockchain usando Hardhat. El proyecto incluye scripts de despliegue, configuración de Hardhat, pruebas unitarias y un ejemplo de archivo de configuración para variables de entorno.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- Node.js (v14 o superior)
- Yarn
- Hardhat

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/rolandolopez36/hardhat-conquer-02-tasklist.git
   cd hardhat-conquer-tasklist
   ```

2. Instala las dependencias del proyecto:

   ```bash
   yarn install
   ```

3. Crea un archivo `.env` en el directorio raíz del proyecto basado en `.env.example` y completa las variables necesarias.

## Configuración de Hardhat

El archivo `hardhat.config.js` contiene la configuración de Hardhat para el proyecto. Aquí se especifican las redes, los complementos y otras configuraciones necesarias para el despliegue y las pruebas.

## Despliegue

Para desplegar el contrato en Sepolia, utiliza el siguiente comando:

```bash
yarn hardhat deploy --network sepolia
```

Asegúrate de que la red esté configurada correctamente en `hardhat.config.js` y que las variables de entorno necesarias estén definidas en el archivo `.env`.

## Pruebas

Para ejecutar las pruebas unitarias, utiliza el comando:

```bash
yarn hardhat test
```

Esto ejecutará las pruebas definidas en el archivo `taskList.test.js`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Consejos Adicionales

- **Actualiza tu fork**: Asegúrate de mantener tu fork actualizado con el repositorio original para evitar conflictos.
- **Documenta tus cambios**: Si haces cambios significativos, actualiza la documentación y los comentarios en el código.
- **Sigue las pautas de estilo**: Adhiérete a las convenciones de codificación y estilo del proyecto.

¡Gracias por contribuir!

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
