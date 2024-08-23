export const chartDATA = (labels, Dataset) => {
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: getRandomColorArray(labels.length),
        data: Dataset
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // 'top', 'left', 'bottom', 'right'
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Chart Title',
        color: 'black',
        font: {
          size: 24
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: true
    },
    animation: {
      duration: 400 // Adjust the duration of the hover animation
    }
  }

  function getRandomColorArray(size) {
    const colors = []

    for (let i = 0; i < size; i++) {
      const color = getRandomColor()
      colors.push(color)
    }

    return colors
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    return color
  }

  return { data, options }
}
