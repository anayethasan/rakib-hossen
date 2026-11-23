// Add new projects by pushing to this array. Only `driveId` is needed for link/preview.
// Titles, categories and descriptions are PLACEHOLDERS — edit them.
export const categories = ['All', 'Cinematic Editing', 'Social Media', 'Motion Graphics', 'Color Grading', 'YouTube Content']

const drive = (id) => ({
  driveId: id,
  link: `https://drive.google.com/file/d/${id}/view?usp=drive_link`,
  embed: `https://drive.google.com/file/d/${id}/preview`,
  thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
})

export const projects = [
  { id: 1, title: 'Project 01', category: 'Cinematic Editing', description: 'Project description coming soon.', software: [], ...drive('1DAErjiE4yHGwGZEa6qov6bBvosvaP3sv') },
  { id: 2, title: 'Project 02', category: 'Social Media', description: 'Project description coming soon.', software: [], ...drive('11eVXEDt8zPOr9r4jCApf0yIYr-OP2EOQ') },
]
