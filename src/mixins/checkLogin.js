/**
 * Created by yh on 2021/5/12
 */
export default {
    methods : {
        $_checkLogin(){
            return new Promise((reslove) => {
                this.$store.dispatch('account/checkLogin').then(() => {
                    if(!this.$_isLogin){
                        this.$confirm('您未登录，请登录!','系统信息',{
                            confirmButtonText: this.$tl('confirm','确认'),
                            type: 'warning'
                        }).then(()=>{
                            this.$toMap('/login');
                        }).catch(() => {
                            this.$toMap('/');
                        });
                    }else{
                        reslove(this.$store.state.account.user)
                    }
                });
            });
        }
    }
}