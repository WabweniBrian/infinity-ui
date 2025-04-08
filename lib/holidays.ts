// International and Ugandan public holidays
export type Holiday = {
  id: string
  name: string
  date: string // ISO date string (YYYY-MM-DD)
  type: "international" | "local"
  description?: string
}

// Function to get holidays for a specific year
export function getHolidays(year: number): Holiday[] {
  return [
    // International holidays
    {
      id: `new-years-day-${year}`,
      name: "New Year's Day",
      date: `${year}-01-01`,
      type: "international",
      description: "The first day of the year in the Gregorian calendar",
    },
    {
      id: `womens-day-${year}`,
      name: "International Women's Day",
      date: `${year}-03-08`,
      type: "international",
      description: "A global day celebrating the social, economic, cultural, and political achievements of women",
    },
    {
      id: `labor-day-${year}`,
      name: "Labor Day",
      date: `${year}-05-01`,
      type: "international",
      description: "A celebration of laborers and the working classes",
    },
    {
      id: `christmas-${year}`,
      name: "Christmas Day",
      date: `${year}-12-25`,
      type: "international",
      description: "A Christian holiday celebrating the birth of Jesus Christ",
    },
    {
      id: `boxing-day-${year}`,
      name: "Boxing Day",
      date: `${year}-12-26`,
      type: "international",
      description: "The day after Christmas, when traditionally employers would give gifts to their employees",
    },

    // Ugandan holidays
    {
      id: `martyrs-day-${year}`,
      name: "Martyrs' Day",
      date: `${year}-06-03`,
      type: "local",
      description: "Commemorates the execution of 45 Ugandan Christian martyrs",
    },
    {
      id: `heroes-day-${year}`,
      name: "Heroes' Day",
      date: `${year}-06-09`,
      type: "local",
      description: "Honors those who contributed to the well being of Uganda",
    },
    {
      id: `independence-day-${year}`,
      name: "Independence Day",
      date: `${year}-10-09`,
      type: "local",
      description: "Celebrates Uganda's independence from British rule in 1962",
    },
    {
      id: `liberation-day-${year}`,
      name: "Liberation Day",
      date: `${year}-01-26`,
      type: "local",
      description: "Commemorates the date when the National Resistance Army captured Kampala in 1986",
    },
    {
      id: `eid-al-fitr-${year}`,
      name: "Eid al-Fitr",
      // Note: This is approximate as it depends on the Islamic calendar
      date: `${year}-04-10`,
      type: "local",
      description: "Marks the end of Ramadan, the Islamic holy month of fasting",
    },
    {
      id: `eid-al-adha-${year}`,
      name: "Eid al-Adha",
      // Note: This is approximate as it depends on the Islamic calendar
      date: `${year}-06-17`,
      type: "local",
      description: "The 'Feast of Sacrifice', honors the willingness of Ibrahim to sacrifice his son",
    },
  ]
}
