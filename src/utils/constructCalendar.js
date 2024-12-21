function getCurrentTimePosition(currentChosen, baseTime) {
  if (currentChosen > baseTime) return 0
  else if (currentChosen < baseTime) return 1
  else return -1
}

function generateDaysData(startDate, tasks, today, dayCount = 60) {
  const daysData = []

  for (let i = 0; i < dayCount; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)

    daysData.push({
      day: day.getDate(),
      tasks:
        tasks.length > 0
          ? tasks
              .filter((x) => day.getTime() - 43200000 <= x.day && x.day <= day.getTime() + 43200000)
              .map((task) => ({ ...task }))
          : [],
      date: day.getTime(),
      outdated: getCurrentTimePosition(day, today),
      weekday: day.getDay(),
      month: day.getMonth(),
      id: i,
    })
  }

  return daysData
}

export async function generateMonthData(tasksData) {
  try {
    const data = await tasksData

    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDay() - 5)

    const yearData = generateDaysData(startDate, data.tasks, today, 60)

    return yearData
  } catch (e) {
    console.log(e)
  }
}
export async function addMonth(currentCalendarData, tasksData) {
  const data = await tasksData
  const today = new Date()

  const startDate = new Date(currentCalendarData.at(-1).date)

  const newDaysData = generateDaysData(startDate, data.tasks, today, 60)
  return newDaysData
}
