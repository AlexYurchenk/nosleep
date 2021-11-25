export default function List({ tasks, setTasks }) {
  const tasksPars = JSON.parse(tasks);
  return (
    <ul>
      {tasksPars.length >= 1 &&
        tasksPars.map(
          ({ name, startDate, endDate, id, hourSpend, hoursShouldSpend }) => (
            <li key={id}>
              <p>{name} name</p>
              <p>{hoursShouldSpend} hoursShouldSpend</p>
              <p>{startDate} startDate</p>
              <p>{endDate} endDate</p>
              {Number(hourSpend) === 0 ? (
                <input
                  type="number"
                  onBlur={(e) => {
                    if (Number(e.currentTarget.value) > 0)
                      tasksPars.find((e) => e.id === id).hourSpend = Number(
                        e.currentTarget.value
                      );
                    setTasks(tasksPars);
                  }}
                />
              ) : (
                <p>{hourSpend} hourSpend</p>
              )}
            </li>
          )
        )}
    </ul>
  );
}
