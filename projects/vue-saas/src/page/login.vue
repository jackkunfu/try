<template>

  	<div class="login_page fillcontain">
		<!-- <div class="header">
			<div class="left">
				<img src="../assets/img/header-logo.png" alt="">
			</div>
		</div> -->
		<div class="login-top">
			<img src="../assets/img/login-top.png" alt="">
		</div>
	  	<transition name="el-zoom-in-top" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
				<div class="msg-form">
					<div class="manage_tip">
						<p>登录</p>
					</div>
					<el-form :model="loginForm" :rules="rules" ref="loginForm">
						<el-form-item prop="mobile">
							<el-input v-model="loginForm.mobile" placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
						</el-form-item>
						<!-- <el-form-item>
							<el-checkbox class="remember-login"  v-model="loginForm.rememberMe" @click="loginForm.rememberMe = !loginForm.rememberMe">保持登录状态</el-checkbox>
						</el-form-item> -->
					</el-form>
				</div>
		  		<div class="msg-right">
					  <img src="../assets/img/login-pic.png" alt="">
					  <!-- <div class="login-right">
						  <p>忘了登录密码？</p>
						  <span>可使用已注册的手机号码重设密码。</span>
						  <button class="right-btn" @click="showLogin = false">找回密码</button>
					  </div> -->
				</div>
	  		</section>
	  	</transition>
		<transition name="el-zoom-in-bottom" mode="in-out">
	  		<section class="form_contianer fotgetpsw-box" v-show="showLogin == false">
				<div class="msg-form">
					<div class="manage_tip">
						<p>找回密码</p>
					</div>
					<el-form :model="forgetPassword" :rules="rules2" ref="forgetPassword"  class="demo-ruleForm">
						<el-form-item  prop="mobile">
							<el-input type="text" v-model="forgetPassword.mobile"  placeholder="您的注册手机号" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
					<el-form :model="forgetPassword" :rules="rules2" ref="forgetPassword" :inline="true"  class="demo-form-inline code-input">
						<el-form-item  prop="verifyCode">
							<el-input style="width: 151px" v-model="forgetPassword.verifyCode"  placeholder="验证码"></el-input>
							<el-button class="code-btn" style="padding:10px 6px" type="primary" @click="getCode()" ref="codeBtn">获得验证码</el-button>
						</el-form-item>
					</el-form>
					<el-form :model="forgetPassword" :rules="rules2" ref="forgetPassword"   class="demo-ruleForm">
						<el-form-item  prop="newPwd">
							<el-input type="password" placeholder="输入新密码" v-model="forgetPassword.newPwd"  auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item  prop="confirmPwd">
							<el-input type="password"  placeholder="再次输入新密码" v-model="forgetPassword.confirmPwd"  auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="submit_btn" @click="changePsw()">重设密码</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="msg-right">
					  <img src="../assets/img/login-pic.png" alt="">
					  <div class="login-right">
						  <span>使用手机号码和密码以登录系统。</span>
						  <button class="right-btn" @click="showLogin = true">返回登录页</button>
					  </div>
				</div>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	// import {login, getAdminInfo} from '@/api/getData'
	// import api from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    // import store from "../store/";

	export default {
	    data(){
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.forgetPassword.newPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				loginForm: {
					mobile: '',
					password: '',
					rememberMe: true
				},
				forgetPassword: {
					mobile: '',
					verifyCode: '',
					newPwd: '',
					confirmPwd: ''
				},
				rules: {
					mobile: [
			            { required: true, message: '请输入用户名', trigger: 'blur' }
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				rules2: {
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					verifyCode: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					],
					newPwd: [
						{ required: true, message: '请输入新密码', trigger: 'blur' }
					],
					confirmPwd: [
						{ validator: validatePass2, trigger: 'blur' }
					]
				},
				showLogin: true
			}
		},
		mounted(){
			this.$nextTick(() => {
				// this.showLogin = true;
				// if (!this.adminInfo.id) {
	            //     console.log('call method: getAdminData()');
	    		// 	this.getAdminData()
				// }
            })
        },
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData', 'saveUsreInfo']),
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// var res = await tryAwait('get', '/login', this.loginForm);
						// if(res && res.success) {
						// 	// 请求用户信息
						// 	var user = await tryAwait('get','/user/loginUserInfo')
						// 	if(user && user.success){
                        //         if(!user.model.uId){  //  {} == {}   false
                        //             this.$message({
        		        //                 type: 'error',
        		        //                 message: '请允许cookie，详情咨询管理员~'
        				// 			});
                        //             return
                        //         }
                        //         this.$message({
    		            //             type: 'success',
    		            //             message: '登录成功'
    					// 		});
						// 		localStorage.pdSaasUserId = user.model.uId || '';
						// 		localStorage.pdSaasUserRole = user.model.userRole || '';
						// 		localStorage.pdSaasUserMobile = user.model.mobile || '';
						// 		localStorage.pdSaasVendorId = user.model.vendorId || '';
						// 		localStorage.pdSaasVendorLogo = user.model.vendorLogo || '';
                        //         localStorage.pdUserInfo = JSON.stringify(user.model);
                        //         // 调store里的方法存储用户信息到store
                        //         // store.commit('saveUsreInfo', user.model)
						// 		this.$router.push({path:'/'})
						// 	}
						// }else{
						// 	this.$message({
		                //         type: 'error',
                        //         // message: res.msgInfo ? res.msgInfo : '失败'
		                //         message: res.msgInfo ? res.msgInfo : '登录失败'
		                //     });
						// }

						// var opts = JSON.parse(JSON.stringify(this.loginForm));
						// opts._api = 'pd.general.user.login'
						// opts.username = opts.mobile;
						localStorage.removeItem('saas_se');
						var res = await tryAwait('get', '', {
							_api: 'pd.general.user.login',
							username: this.loginForm.mobile,
							password: this.loginForm.password
						}, true);

						if(res && res.success && res.model && res.model.loginId){
							var data = res.model;
							localStorage.saas_loginId = data.loginId;
							localStorage.saas_se = data.sessionId;
							localStorage.saas_mobile = data.mobile;
							localStorage.roleLevel = data._sys_roleLevel;
							
							var user = await tryAwait('get', '', {
								_api: 'pd.b.clerk.profile',
								_v: '3.0'
							}, true);
							if(user && user.success){
								if(user.model){
									this.$message({
										type: 'success',
										message: user.msgInfo || '登录成功',
										offset: 100
									});
									localStorage.saasUser = user.model ? JSON.stringify(user.model) : '';
									this.$router.push({path:'/'});
									setTimeout(()=>{
										if(this.$route.path == '/') history.go(0)
									}, 100);
								}
							}else{
								this.$message({
									type: 'error',
									message: user.msgInfo,
									offset: 100
								});
							}
						}

						

					} else {
						this.$message({
							type: 'error',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},


			// 获取验证码
			async getCode(){
				if(this.forgetPassword.mobile == ''){
					this.$message({
						message: '手机号未填写！',
						type: 'warning'
					});
					return;
				}else if(!(/^1[34578]\d{9}$/.test(this.forgetPassword.mobile))){
					this.$message({
						message: '请输入正确的手机号码！',
						type: 'warning'
					});
					return;
				}
				var t = 61;
				var a = setInterval(()=>{
					t--;
					$(this.$refs.codeBtn.$el).html(t+'s');
					$(this.$refs.codeBtn.$el).attr("disabled",'true');
					if(t==0){
						clearInterval(a);
						$(this.$refs.codeBtn.$el).html('获取验证码');
						$(this.$refs.codeBtn.$el).removeAttr("disabled");
					}
				},1000)
				var mobile = this.forgetPassword.mobile;
				var code = await this.ajax('get', '/sendVerifyCode', {mobile: mobile, sign: 'forget'});
				if(code.success){
					console.log(code);
				}else{
					this.$message({
						message: code.msgInfo,
						type: 'warning'
					});
					return;
				}
			},

			// 确认修改
			async changePsw(){
				if(this.forgetPassword.mobile == ''){
					this.$message({
						message: '手机号未填写！',
						type: 'warning'
					});
					return;
				}else if(!(/^1[34578]\d{9}$/.test(this.forgetPassword.mobile))){
					this.$message({
						message: '请输入正确的手机号码！',
						type: 'warning'
					});
					return;
				}
				if(this.forgetPassword.verifyCode == ''){
					this.$message({
						message: '验证码未填写！',
						type: 'warning'
					});
					return;
				}
				if(this.forgetPassword.newPwd == ''){
					this.$message({
						message: '新密码未填写！',
						type: 'warning'
					});
					return;
				}
				if(this.forgetPassword.confirmPwd == ''){
					this.$message({
						message: '请再次填写新密码！',
						type: 'warning'
					});
					return;
				}

				var reset = await this.ajax('get', '/resetPassword', this.forgetPassword);
				if(reset.success){
					this.$message({
						message: '修改成功！去登录吧~',
						type: success
					});
				}else{
					this.$message({
						message: reset.msgInfo,
						type: error
					});
				}
			}
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('/manage')
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
@import '../style/styleCom.sass';
.header
	background-color: #fff;
	height: 48px;
	line-height: 48px;
	background: #1f2d3d;
	color: #fff;
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	padding: 0 20px;
	.left
		float: left;
		margin-top: 6px;
		img
			height: 24px;
			width: auto;
.login-top
	position: absolute;
	img
		width: 100%;
.login-box
	width: 720px;
	height: 488px;
.login_page
	background-color: #324057;
	.form_contianer
		@include wh(720px,488px);
		@include ctp(720px,488px);
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		box-shadow: 0 4px 30px 0 rgba(72, 110, 162, 0.2);
		.msg-form
			float: left;
			// width: 480px;
			padding: 80px 120px 0 120px;
			.manage_tip
				width: 240px;
				p
					font-size: $font_5;
					font-weight: bold;
					color: $color_4;
					margin-bottom: 40px;
			.submit_btn
				width: 100%;
				font-size: 16px;
			.forget-psw
				color: $color_6;
				cursor: pointer;
			.remember-login
				color: $color_7;

	.msg-right
		float: right;
		position: relative;
		img
			width: 240px;
		.login-right
			position: absolute;
			top: 150px;
			padding: 0 60px;
			text-align: left;
			color: #fff;
			span
				display: block;
				padding: 20px 0;
				font-size: $font_4;
			.right-btn
				width: 100%;
				height: 36px;
				color: #fff;
				border: 1px solid #fff;
				border-radius: 4px;
				background: transparent;

.code-btn
	width: 84px;
	text-align: center;

.code-input
	text-align: left;
	.el-form-item,.el-button
		margin-right: 0;


</style>
