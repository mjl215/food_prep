const setHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
      
  const config = {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
  }

  return config
}

export default setHeader;