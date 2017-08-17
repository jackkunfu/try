function User(infos = {}) {
    this.infos = infos;
}

// 单例模式
function loginUser(infos) {
    if (!window.localStorage.pdApiUserId) {
        window.localStorage.pdApiUserId = new User(infos).id
    }
    return window.localStorage.pdApiUserId
}

(function() {
    // var user
})