export const peakHoursData = Array.from({ length: 7 }, (_, dayIndex) =>
    Array.from({ length: 24 }, (_, hourIndex) => ({
      day: dayIndex,
      hour: hourIndex,
      value: Math.floor(Math.random() * 100),
    }))
  ).flat();
  
  export const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  
  export const alertsData = [
    {
      id: 1,
      type: 'inactive',
      message: '12 members inactive for 2+ weeks',
      action: 'Send SMS',
    },
    {
      id: 2,
      type: 'expiring',
      message: '8 memberships expiring this week',
      action: 'Send Email',
    },
    {
      id: 3,
      type: 'capacity',
      message: 'Peak capacity reached at 6 PM',
      action: 'View Details',
    },
  ];