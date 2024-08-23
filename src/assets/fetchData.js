const token = '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'
export const fetchUserData = async (user = 'BrijMandaliya2013') => {
  let result = null
  try {
    const response = await fetch(`https://api.github.com/users/${user}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    result = await response.json()
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return result
}

export const fetchUserRepo = async (user = 'BrijMandaliya2013') => {
  let result = null
  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    result = await response.json()
  } catch (e) {
    console.error('Error fetching user data:', e)
  }

  return result
}

export const fetchLanguages = async (data) => {
  let result = new Map()
  try {
    for (const value of data) {
      const response = await fetch(value['languages_url'], {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let data = await response.json()
      for (const key in data) {
        if (result.has(key)) {
          result.set(key, result.get(key) + 1)
        } else {
          result.set(key, 1)
        }
      }
    }
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return result
}

export const fetchOrganiztion = async (user = 'BrijMandaliya2013') => {
  let result = null
  try {
    const response = await fetch(`https://api.github.com/users/${user}/orgs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    result = await response.json()
  } catch (e) {
    console.error('Error fetching user data:', e)
  }

  return result
}

export const fetchCommitsPerRepo = async (data) => {
  let commit = new Map()
  let starredData = new Map()
  try {
    for (let i = 0; i < 11; i++) {
      if (data[i]['commits_url'].includes('{/sha}'))
        data[i]['commits_url'] = data[i]['commits_url'].replace('{/sha}', '')
      const response = await fetch(data[i]['commits_url'], {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let commitData = await response.json()
      if (commitData.status != 409) {
        commit.set(data[i]['name'], commitData.length)
      }
    }
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return commit
}

export const fetchStarredPerLanguage = async (data) => {
  let result = new Map()
  try {
    for (const value of data) {
      if (value['stargazers_count'] > 0 && value['language'] != null) {
        if (result.has(value['language'])) {
          result.set(value['language'], result.get(value['language']) + value['stargazers_count'])
        } else {
          result.set(value['language'], value['stargazers_count'])
        }
      }
    }
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return result
}

export const fetchStarredPerRepo = async (data) => {
  data = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
  let starredData = new Map()
  try {
    for (let i = 0; i < 11; i++) {
      if (data[i].stargazers_count > 0) {
        starredData.set(data[i].name, data[i].stargazers_count)
      }
    }
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return starredData
}

export const fetchPRPerRepo = async (data) => {
  let PRData = new Map()
  try {
    for (let value of data) {
      if (value['pulls_url'].includes('{/number}'))
        value['pulls_url'] = value['pulls_url'].replace('{/number}', '')

      const response = await fetch(value['pulls_url'], {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let result = await response.json()
      if (result.length > 0) PRData.set(value.name, result.length)
    }
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
  return PRData
}
