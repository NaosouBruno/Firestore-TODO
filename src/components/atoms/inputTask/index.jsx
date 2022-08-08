import { db } from "../../../firebase/index";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import "./inputTasks.scss";
export default function InputTask() {
  const [inputValid, setInputValid] = useState(true);

  const [newTask, setNewTask] = useState("");
  const tasksRef = collection(db, "tasksNot");

  const createTask = async () => {
    await addDoc(tasksRef, { name: newTask });
  };

  const newGet = (event) => {
    setNewTask(event.target.value);
  };
  const getText = (event) => {
    if (event.keyCode === 13) {
      if (event.target.value.trim().length > 0) {
        createTask();
        event.target.value = "";
        setInputValid(true);
      }
      setInputValid(false);
    }
  };
  return (
    <div className="containerInput">
      <input
        id="outlined-basic"
        placeholder={inputValid ? "Add Task" : "Please insert a task"}
        className={
          inputValid
            ? "containerInput__addTask"
            : "containerInput__addTask containerInput__addTask--error"
        }
        /* className="containerInput__addTask" */
        /* error={inputValid} */
        onKeyDown={(event) => getText(event)}
        onChange={newGet}
      />
    </div>
  );
}
