import { useEffect, useState } from "react";
import "./tasks.scss";
import { db } from "../../../firebase/index";
import Trash from "../../../assets/trash.svg";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

export default function TasksNot() {
  const [tasksNot, setTasksNot] = useState([]);
  const [tasksComple, setTasksComp] = useState([]);

  const tasksRef = collection(db, "tasksNot");
  const tasksCompletRef = collection(db, "tasksComp");

  const deleteTask = async (ref, id) => {
    const taskDoc = doc(db, ref.path, id);

    await deleteDoc(taskDoc);
  };

  const markAsComplete = async (ref, value) => {
    await addDoc(tasksCompletRef, { name: value.name });

    await deleteTask(ref, value.id);
  };

  const markAsNotComplete = async (ref, value) => {
    await addDoc(tasksRef, { name: value.name });
    await deleteTask(ref, value.id);
  };

  const updateTask = async (ref, value) => {
    console.log(ref.path);
    if (ref.path === "tasksNot") {
      return markAsComplete(ref, value);
    } else if (ref.path === "tasksComp") {
      return markAsNotComplete(ref, value);
    }
  };

  const [checked, setChecked] = useState([0]);

  const handleToggle = (ref, value) => () => {
    console.log(checked.indexOf(value));
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      console.log(tasksCompletRef);
      newChecked.push(value);
      updateTask(ref, value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksNotComplet = await getDocs(tasksRef);
      const tasksComplet = await getDocs(tasksCompletRef);

      console.log(tasksNotComplet);

      setTasksNot(
        tasksNotComplet.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setTasksComp(
        tasksComplet.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      console.log("fetch");
    };
    getTasks();
  }, []);
  console.log(tasksNot.length);
  console.log(tasksComple.length);

  return (
    <section className="tasksNot">
      <div>
        {tasksNot.length > 0 && (
          <ul className="tasksNot-list">
            {tasksNot.map((task) => (
              <li key={task.id} className="tasksNot__listItem">
                <input
                  onClick={handleToggle(tasksRef, task)}
                  type="checkbox"
                  id="taskNot"
                />

                <label htmlFor="taskNot" className="tasksNot--taskName">
                  {task.name}
                </label>
                <button className="tasksNot__buttonTrash">
                  <img
                    src={Trash}
                    className="tasksNot__iconTrash"
                    alt="Trash"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasksNot.length === 0 && <h3>No open tasks</h3>}

        {tasksComple.length > 0 && (
          <ul className="tasksNot-list">
            {tasksComple.map((task) => (
              <li key={task.id} className="tasksNot__listItem">
                <input
                  onClick={handleToggle(tasksCompletRef, task)}
                  type="checkbox"
                  defaultChecked
                  id="taskNot"
                />
                <label
                  htmlFor="taskNot"
                  className="tasksNot--taskName tasksconcluded--listItem"
                >
                  {task.name}
                </label>
                <button className="tasksNot__buttonTrash">
                  <img
                    src={Trash}
                    className="tasksNot__iconTrash"
                    alt="Trash"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
        {tasksComple.length === 0 && <h3>No tasks complete</h3>}
      </div>
    </section>
  );
}
