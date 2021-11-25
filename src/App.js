import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import shortid from "shortid";
import List from "./components/List";
import Chart from "./components/Chart";
function App() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [sprintStartDate, setSprintStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [duration, setDuration] = useState(0);
  const [hours, setHours] = useState(0);
  const reset = () => {
    setHours(0);
    setName("");
  };
  const dateFormate = (e) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return e.toLocaleDateString("en-US", options).split(",")[1];
  };
  const maxDate = new Date(sprintStartDate).setDate(
    sprintStartDate.getDate() + duration
  );
  return (
    <>
      <DatePicker
        selected={sprintStartDate}
        onChange={(date) => setSprintStartDate(date)}
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.currentTarget.value))}
      />
      <br />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const task = {
            id: shortid.generate(),
            name,
            startDate: dateFormate(startDate),
            endDate: dateFormate(endDate),
            hourSpend: 0,
            hoursShouldSpend: hours,
          };
          setTasks((s) => [...s, task]);
          reset();
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.currentTarget.value))}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={sprintStartDate}
          maxDate={maxDate}
        />
        <DatePicker
          minDate={startDate}
          maxDate={maxDate}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <button type="submit">Submit</button>
      </form>
      <List setTasks={setTasks} tasks={JSON.stringify(tasks)} />
      <Chart
        setTasks={setTasks}
        tasksStr={JSON.stringify(tasks)}
        duration={duration}
        startDate={sprintStartDate}
      />
    </>
  );
}

export default App;
