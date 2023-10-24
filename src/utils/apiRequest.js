
/**
 * 
 * @param {string} path The path to the API call
 * @param {string} method The method of the API call, can be GET or PATCH
 * @param {string} param The id or parameter of the API call. If there is no param you will get all.
 * @param {JSON} requestBody The request body of the API call.
 * @returns The response from the server.
 */


export const apiRequest = async (path, method, param, requestBody) => {
  if (method === 'GET') {
    if (param === "") {
      const res = await fetch(process.env.REACT_APP_HOST + '/' + path, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(requestBody)
      });
      const data = await res.json()
      return data
    }
    else {
      const res = await fetch(process.env.REACT_APP_HOST + '/' + path + '/' + param, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(requestBody)
      });
      const data = await res.json()
      return data
    }
  } else if (method === 'PUT') {
    const res = await fetch(`${process.env.REACT_APP_HOST}/${path}/${param}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      },
      body: JSON.stringify(requestBody)
    }).then(res => res.json()).then(value => console.log("Response: ", value))
    return res.json()
  } else if (method === 'POST') {
    const res = await fetch(`${process.env.REACT_APP_HOST}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      },
      body: JSON.stringify(requestBody)
    }).then(res => res.json()).then(value => console.log("Response: ", value))
    return res
  } else if (method === 'DELETE') {
    const res = await fetch(`${process.env.REACT_APP_HOST}/${path}/${param}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      },
      body: JSON.stringify(requestBody)
  }).then(res => res.json()).then(value => console.log("Response: ", value))

}
}
