import Axios from 'axios';

const API_URL = 'http://localhost:7777/users'  //spring boot back-end url

class ApiService {

    fetchUsers() {  //'http://localhost:7777/users' -> Full list of users
        return Axios.get(API_URL);
    }

    fetchUserByID(id) {  //'http://localhost:7777/users/2' -> Specific user information inquiry
        return Axios.get(API_URL + '/' + id)
    }

    addUser(user) { //POST user information back-end forwarding
        return Axios.post(API_URL, user);
    }

    editUser(user) {    //PUT user revision information transmitted to back-end
        return Axios.put(API_URL + '/' + user.id, user);
    }

    removeUser(id) {    //DELETE pass user id
        return Axios.delete(API_URL + '/' + id);
    }
}

export default new ApiService();