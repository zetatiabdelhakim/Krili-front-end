function addUserToLocalStorage(obj) {
  localStorage.setItem("user", JSON.stringify(obj));
}

function updateUserInLocalStorage(obj) {
  if (localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(obj));
  }
  return readUserFromLocalStorage();
}

function deleteUserFromLocalStorage() {
  localStorage.removeItem("user");
}
function readUserFromLocalStorage() {
  var objStr = localStorage.getItem("user");
  if (objStr) {
    return JSON.parse(objStr);
  } else {
    return null;
  }
}

export {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
};
