export const FIELDSETS = [
  {
    title: 'numberOfQuestions',
    type: 'input',
    legend: 'Number of Questions',
    options: [
      { value: 5, label: 'Min number' },
      { value: 15, label: 'Max number' }
    ]
  },
  {
    title: 'category',
    type: 'select',
    legend: 'Category',
    options: [{ value: 'any', label: 'Any category' }]
  },
  {
    title: 'difficulty',
    type: 'select',
    legend: 'Difficulty',
    options: [{ value: 'any', label: 'Any difficulty' }]
  },
  {
    title: 'type',
    type: 'select',
    legend: 'Type',
    options: [{ value: 'any', label: 'Any type' }]
  },
  {
    title: 'time',
    type: 'select',
    legend: 'Time',
    options: [
      { value: '1m', label: '1 minute' },
      { value: '2m', label: '2 minutes' },
      { value: '5m', label: '5 minutes' }
    ]
  }
]
