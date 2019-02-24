const user = {
    state: {
        // 登录状态为未登录
        logined: false,
        // 用户信息
        LoginedUser: {
            ChinaName:'',
            avatar: ''
        }
    },
    mutations: {
        // 改变状态方法--登录
        LOGIN(state){
            state.logined= true
            let user = JSON.parse(sessionStorage.getItem('user'));
            state.LoginedUser.ChinaName = user.ChinaName;
            state.LoginedUser.avatar = user.avatar;
        }
    },
    getters: {},
    actions: {
        login({commit}){
            commit("LOGIN")
        }
    },
}
export default user
