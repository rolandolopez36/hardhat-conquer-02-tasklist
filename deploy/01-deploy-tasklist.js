// Importa el objeto 'network' de hardhat, que contiene información sobre la red actual
const { network } = require("hardhat");

// Importa 'developmentChains' desde la configuración de hardhat-helper, que lista las cadenas de desarrollo
const { developmentChains } = require("../helper-hardhat-config");

// Importa la función 'verify' desde el archivo utils/verify para verificar contratos en Etherscan
const { verify } = require("../utils/verify");

// Carga las variables de entorno desde el archivo .env
require("dotenv").config();

// Exporta una función asíncrona para desplegar el contrato
module.exports = async ({ getNamedAccounts, deployments }) => {
  // Obtiene las funciones 'deploy' y 'log' del objeto 'deployments'
  const { deploy, log } = deployments;

  // Obtiene la cuenta 'deployer' desde las cuentas nombradas
  const { deployer } = await getNamedAccounts();

  // Obtiene el 'chainId' de la red actual desde la configuración de la red
  const chainId = network.config.chainId;

  // Imprime una línea de separación en la consola para mayor claridad
  log("----------------------------------------------------");

  // Imprime el mensaje indicando que se está desplegando el contrato y esperando confirmaciones
  log("Deploying TaskList and waiting for confirmations...");

  // Despliega el contrato 'TaskList'
  const taskList = await deploy("TaskList", {
    from: deployer, // Cuenta desde la cual se despliega el contrato
    args: [], // Argumentos del constructor del contrato (vacío en este caso)
    log: true, // Habilita los logs para este despliegue
    waitConfirmations: network.config.blockConfirmations || 1, // Número de confirmaciones de bloque para esperar
  });

  // Imprime la dirección del contrato desplegado en la consola
  log(`TaskList deployed at ${taskList.address}`);

  // Verifica si la red no es una red de desarrollo y si se ha proporcionado la clave de API de Etherscan
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // Verifica el contrato en Etherscan
    await verify(taskList.address, []);
  }
};

// Etiquetas del módulo para identificar y agrupar diferentes scripts de despliegue
module.exports.tags = ["all", "tasklist"];
