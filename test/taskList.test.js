const { assert } = require("chai"); // Importa la función assert de chai para las aserciones en los tests.
const { ethers } = require("hardhat"); // Importa ethers de hardhat para interactuar con los contratos.

describe("TaskList", function () {
  let taskList; // Instancia desplegada del contrato TaskList.
  let owner; // Dirección del propietario del contrato.

  // Se ejecuta antes de cada prueba.
  beforeEach(async () => {
    [owner] = await ethers.getSigners(); // Obtiene la lista de cuentas y asigna la primera como propietario.
    const TaskListFactory = await ethers.getContractFactory("TaskList"); // Obtiene la fábrica de contratos TaskList.
    taskList = await TaskListFactory.deploy(); // Despliega una nueva instancia del contrato TaskList.
    await taskList.deployed(); // Espera a que el contrato esté desplegado.
  });

  // Pruebas relacionadas con el despliegue del contrato.
  describe("Deployment", function () {
    // Verifica que el propietario del contrato sea el deployer.
    it("Should set the right owner", async function () {
      const contractOwner = await taskList.owner(); // Obtiene el propietario del contrato.
      assert.equal(contractOwner, owner.address, "Owner should be deployer"); // Verifica que el propietario sea la cuenta del deployer.
    });

    // Verifica que el número inicial de tareas sea cero.
    it("Should start with zero tasks", async function () {
      const numTasks = await taskList.numTask(); // Obtiene el número de tareas.
      assert.equal(
        numTasks.toNumber(),
        0,
        "Initial number of tasks should be zero"
      ); // Verifica que el número de tareas sea cero.
    });
  });

  // Pruebas relacionadas con la adición de tareas.
  describe("Adding Tasks", function () {
    // Verifica que se pueda añadir una tarea.
    it("Should add a task", async function () {
      const taskText = "Test task"; // Texto de la tarea.
      const taskDifficulty = 1; // MEDIUM

      await taskList.addTask(taskText, taskDifficulty); // Añade una tarea.

      const task = await taskList.getTaskById(0); // Obtiene la tarea por ID.
      assert.equal(task.text, taskText, "Task text should match"); // Verifica que el texto de la tarea coincida.
      assert.equal(task.level, taskDifficulty, "Task difficulty should match"); // Verifica que la dificultad de la tarea coincida.
      assert.equal(task.id, 0, "Task ID should be zero"); // Verifica que el ID de la tarea sea cero.
    });

    // Verifica que el contador de tareas aumente cuando se añade una tarea.
    it("Should increase task count when a task is added", async function () {
      const taskText = "Test task"; // Texto de la tarea.
      const taskDifficulty = 1; // MEDIUM

      await taskList.addTask(taskText, taskDifficulty); // Añade una tarea.
      const numTasks = await taskList.numTask(); // Obtiene el número de tareas.
      assert.equal(numTasks.toNumber(), 1, "Number of tasks should be one"); // Verifica que el número de tareas sea uno.
    });

    // Verifica que el texto de la tarea se almacene en el array de descripciones.
    it("Should store the task text in the description array", async function () {
      const taskText = "Test task"; // Texto de la tarea.
      const taskDifficulty = 1; // MEDIUM

      await taskList.addTask(taskText, taskDifficulty); // Añade una tarea.
      const allTasks = await taskList.getAllTasks(); // Obtiene todas las tareas.
      assert.equal(
        allTasks[0],
        taskText,
        "Task text should be stored in the description array"
      ); // Verifica que el texto de la tarea se almacene en el array de descripciones.
    });
  });

  // Pruebas relacionadas con la obtención de tareas.
  describe("Getting Tasks", function () {
    // Verifica que se pueda recuperar una tarea por su ID.
    it("Should return the correct task by ID", async function () {
      const taskText = "Test task"; // Texto de la tarea.
      const taskDifficulty = 1; // MEDIUM

      await taskList.addTask(taskText, taskDifficulty); // Añade una tarea.
      const task = await taskList.getTaskById(0); // Obtiene la tarea por ID.

      assert.equal(task.text, taskText, "Task text should match"); // Verifica que el texto de la tarea coincida.
      assert.equal(task.level, taskDifficulty, "Task difficulty should match"); // Verifica que la dificultad de la tarea coincida.
      assert.equal(task.id, 0, "Task ID should be zero"); // Verifica que el ID de la tarea sea cero.
    });

    // Verifica que se puedan recuperar todas las descripciones de tareas.
    it("Should return all task descriptions", async function () {
      const taskText1 = "Test task 1"; // Texto de la primera tarea.
      const taskText2 = "Test task 2"; // Texto de la segunda tarea.
      const taskDifficulty = 1; // MEDIUM

      await taskList.addTask(taskText1, taskDifficulty); // Añade la primera tarea.
      await taskList.addTask(taskText2, taskDifficulty); // Añade la segunda tarea.

      const allTasks = await taskList.getAllTasks(); // Obtiene todas las tareas.

      assert.equal(allTasks.length, 2, "Should return two tasks"); // Verifica que se hayan añadido dos tareas.
      assert.equal(allTasks[0], taskText1, "First task text should match"); // Verifica que el texto de la primera tarea coincida.
      assert.equal(allTasks[1], taskText2, "Second task text should match"); // Verifica que el texto de la segunda tarea coincida.
    });
  });
});

// Código para mostrar el resultado del test
after(function () {
  const tests = this.test.parent.tests; // Obtiene la lista de pruebas.
  const passed = tests.every((test) => test.state === "passed"); // Verifica si todas las pruebas pasaron.

  if (passed) {
    console.log(
      "Test results are as expected. The contract works well for the following reasons:"
    );
    console.log(
      "1. The contract owner is the deployer, ensuring the ownership logic is correct."
    );
    console.log(
      "2. The contract starts with zero tasks, guaranteeing there are no pre-existing tasks."
    );
    console.log(
      "3. Tasks can be added correctly and the task counter increases."
    );
    console.log("4. Task texts are correctly stored in the description array.");
    console.log("5. Tasks can be retrieved correctly by their ID.");
    console.log("6. All task descriptions can be retrieved.");
  } else {
    console.log(
      "Some test results are not as expected. The contract does not work correctly for the following reasons:"
    );
    tests.forEach((test) => {
      if (test.state !== "passed") {
        console.log(`- ${test.title}: ${test.err.message}`);
        if (test.title === "Should set the right owner") {
          console.log(
            "Reason: The contract owner was not set correctly, possibly due to an incorrect getter function."
          );
        } else if (test.title === "Should start with zero tasks") {
          console.log(
            "Reason: The initial number of tasks is not zero, possibly due to an incorrect getter function."
          );
        } else if (
          test.title === "Should increase task count when a task is added"
        ) {
          console.log(
            "Reason: The task count did not increase as expected when a task was added, possibly due to an incorrect getter function."
          );
        }
      }
    });
  }
});
