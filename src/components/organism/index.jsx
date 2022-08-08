import InputTask from "../atoms/inputTask";
import TasksNot from "../atoms/tasksNot";
import "./tasks.scss";
export default function Todo() {
  return (
    <div className="container">
      <div className="tasksContainer">
        <span className="tasksContainer--typografy">React + Firebase</span>
        <span className="tasksContainer--typografy">TODO List</span>
      </div>
      <InputTask />
      <TasksNot />
    </div>
  );
}
