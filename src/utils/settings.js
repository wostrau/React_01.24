export const SETTINGS = [
  {
    id: 's1',
    title: 'amount',
    type: 'input',
    legend: 'Amount of questions',
    options: [
      { value: 5, label: 'Min number' },
      { value: 15, label: 'Max number' }
    ]
  },
  {
    id: 's2',
    title: 'category',
    type: 'select',
    legend: 'Category',
    options: [{ value: 'any', label: 'Any category' }]
  },
  {
    id: 's3',
    title: 'difficulty',
    type: 'select',
    legend: 'Difficulty',
    options: [
      { value: 'any', label: 'Any difficulty' },
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' }
    ]
  },
  {
    id: 's4',
    title: 'type',
    type: 'select',
    legend: 'Type',
    options: [
      { value: 'any', label: 'Any type' },
      { value: 'multiple', label: 'Multiple Choice' },
      { value: 'boolean', label: 'True / False' }
    ]
  },
  {
    id: 's5',
    title: 'time',
    type: 'select',
    legend: 'Time',
    options: [
      { value: 60000, label: '1 minute' },
      { value: 120000, label: '2 minutes' },
      { value: 300000, label: '5 minutes' }
    ]
  }
]
