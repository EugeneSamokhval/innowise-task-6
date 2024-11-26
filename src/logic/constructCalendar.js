export async function generateYearData(tasksData) {
  try {
    const data = await tasksData

    console.log('query:', data, '\n')
    const yearData = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDay() - 30)
    const getCurrentTimePosition = (currentChosen, baseTime) => {
      if (currentChosen > baseTime) return 0
      else if (currentChosen < baseTime) return 1
      else return -1
    }
    console.log(data)
    for (let i = 0; i < 365; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)

      yearData.push({
        day: day.getDate(),
        tasks:
          data.tasks.length > 0
            ? data.tasks
                .filter(
                  (x) => day.getTime() - 43200000 <= x.day && x.day <= day.getTime() + 43200000,
                )
                .map((task) => ({ ...task }))
            : [],
        date: day.getTime(),
        outdated: getCurrentTimePosition(day, today),
        weekday: day.getDay(),
        month: day.getMonth(),
        id: i,
      })
    }
    console.log(yearData)
    return yearData
  } catch (e) {
    console.log('Error during calendar creation: ', e)
  }
}
