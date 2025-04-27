import XMLHttpRequest from "xmlhttprequest";

const sendHttpRequest = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 300) {
        reject(`Error ${xhr.status}`);
      } else {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.onerror = () => {
      reject("Error!");
    };

    xhr.send(JSON.stringify(data));
  });
};

async function getUserData(id) {
  try {
    console.log("Loading...");
    const userData = await sendHttpRequest("GET", `https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(userData);
    console.log("Done!");
  } catch (e) {
    console.log(e);
  }
}

// getUserData(1);

async function getAllUsers() {
  const userList = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/users");
  for (let user of userList) {
    console.log(user.name);
  }
}

// getAllUsers();

async function createPost() {
  const post = {
    "title": "Hello XMLHttpRequest",
    "body": "This is a test post.",
    "userId": 1
  };

  const response = await sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
  console.log(response);
}

// createPost();
