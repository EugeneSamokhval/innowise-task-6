export async function generateYearData(tasksData) {
  const data = await tasksData

  console.log('query:', data, '\n')
  const yearData = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDay() - 30)
  // Loop through each day for the next year
  const getCurrentTimePosition = (currentChosen, baseTime) => {
    if (currentChosen > baseTime) return 0
    else if (currentChosen < baseTime) return 1
    else return -1
  }
  for (let i = 0; i < 365; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i) // Increment by i days

    yearData.push({
      day: day.getDate(),
      tasks:
        data.tasks.length > 0 ? data.tasks.fileter((x) => x.day.getDate() === day.getDate()) : [],
      outdated: getCurrentTimePosition(day, today), // Mark as outdated for the first day only
      weekday: day.getDay(),
      month: day.getMonth(),
      id: i,
    })
  }
  console.log(yearData)
  return yearData
}
