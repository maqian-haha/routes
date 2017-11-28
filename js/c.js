var Home=Vue.component("Home",{
    template:`
    <div class="home">
       <Nav></Nav>
       <div class="homeImg">
          <img src="img/haha.jpg" alt="">
       </div>
    </div>
    `,
})
var Nav=Vue.component("Nav",{
    template:`
    <ul class="nav">
        <router-link v-for="(item,key) in NavData" :key="key" tag="li" :to="item.url" exact>{{item.title}}</router-link>
       <router-link to="/login" v-if="!islogin" tag="li">login</router-link>
       
       <span v-if="islogin"  @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
    </ul>
    `,
    data(){
        return{
            NavData:[
                {title:"首页",url:"/"},
                {title:"公司简介",url:"/info"},
                {title:"说明文档",url:"/doc"}
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow;
        },
        logout(){
            this.del("login");
           this.islogin=false;
            router.push("/");
        }
    }

});
var Info=Vue.component("Info",{
    template:`
    <div class="info">
        <Nav></Nav>
        <transition name="opacity" mode="out-in">
           <router-view></router-view>
        </transition>
    </div>
    `,
})
var List=Vue.component("List",{
    template:`
    <ul class="mui-table-view">
       <li class="mui-table-view-cell mui-media">
            <router-link to="info/list/1">         
            <img class="mui-media-object mui-pull-left" src="img/haha.jpg">
            <div class="mui-media-body">
                幸福
                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>      
       </router-link>     
       </li>
       <li class="mui-table-view-cell mui-media">
            <router-link to="info/list/2">         
            <img class="mui-media-object mui-pull-left" src="img/haha.jpg">
            <div class="mui-media-body">
                幸福
                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>      
       </router-link>     
       </li>
       <li class="mui-table-view-cell mui-media">
            <router-link to="info/list/3">         
            <img class="mui-media-object mui-pull-left" src="img/haha.jpg">
            <div class="mui-media-body">
                幸福
                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>      
       </router-link>     
        </li>
   </ul>
    `,
    beforeRouteEnter(to,from,next){
        //console.log(1);
        next();
    },
    beforeRouteLeave(to,from,next){
        //console.log(2);
        next();
    }
})
var Con=Vue.component("Con",{
    template:`
    <div class="Con" style="margin-top:50px">
       <h1>{{data[$route.params.id-1].title}}</h1>
     
       <p>{{data[$route.params.id-1].con}}</p>
    </div>
    `,
    data(){
        return{
            data:[
                {title:"111",con:"111的内容"},
                {title:"222",con:"222的内容"},
                {title:"333",con:"333的内容"}
            ]
        }
    }

})
var Doc=Vue.component("Doc",{
    template:`
    <div class="doc">
         <Nav></Nav>
         <div class="DoCon">
           <router-view name="left" class="left"></router-view>
           <router-view name="right" class="right"></router-view>
         </div>
    </div>
    `,
    beforeRouteEnter(to,from,next){
        console.log("10");
        next(function(vm){

            if(!vm.get("login","name")){
                console.log(3);
                router.push("/login");
            }
        })
    }
})
var leftC=Vue.component("leftC",{
    template:`
    <ul class="leftC">
        <router-link to="#one" tag="li">安装</router-link>
        <router-link to="#two" tag="li">基础</router-link>
        <router-link to="#three" tag="li">进阶</router-link> 
        <router-link to="#four" tag="li">API文档</router-link>      
    </ul>
     `,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            var vm = this
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ start: document.querySelector(".rightC").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ start: document.querySelector("#"+hash).offsetTop-50}, 500)
                .onUpdate(function () {
                    document.querySelector(".rightC").scrollTop = this.start.toFixed(0);
                })
                .start()
            animate()
        }
    }
})
var rightC=Vue.component("rightC",{
    template:`
    <div class="rightC">     
      <div id="one">
          <h1>安装</h1>
          <div>
               <strong>直接下载</strong>
               <pre style="font-size: 14px">
https://unpkg.com/vue-router/dist/vue-router.js
Unpkg.com 提供了基于 NPM 的 CDN 链接。上面的链接会
一直指向在 NPM 发布的最新版本。你也可以像 

https://unpkg.com/vue-router@2.0.0/dist/vue-router.js 

这样指定 版本号 或者 Tag。
在 Vue 后面加载 vue-router，它会自动安装的：

&lt;script src="/path/to/vue.js"&gt;&lt;/script&gt;
&lt;script src="/path/to/vue-router.js"&gt;&lt;/script&gt;

              </pre>
               <strong>NPM</strong>
               <pre style="font-size: 14px">
npm install vue-router
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
如果使用全局的 script 标签，则无须如此（手动安装）。
                </pre>             
          </div>      
      </div>     
      <div id="two">
          <h1>基础</h1>
          <div>
             <pre>
教程中的案例代码将使用 ES2015 来编写。

用 Vue.js + vue-router 创建单页应用，是非常简单的。
使用 Vue.js ，我们已经可以通过组合组件来组成应用程
序，当你要把 vue-router 添加进来，我们需要做的是，
将组件(components)映射到路由(routes)，然后告诉 
vue-router 在哪里渲染它们。下面是个基本例子：

所有的例子都将使用完整版的 Vue 以解析模板。
更多细节请移步这里。
             </pre>
             <strong></strong>
          </div>
      </div>
      <div id="three">
          <h1>进阶</h1>
          <div>
               <strong>直接下载</strong>
               <pre style="font-size: 14px">
https://unpkg.com/vue-router/dist/vue-router.js
Unpkg.com 提供了基于 NPM 的 CDN 链接。上面的链接会
一直指向在 NPM 发布的最新版本。你也可以像 

https://unpkg.com/vue-router@2.0.0/dist/vue-router.js 

这样指定 版本号 或者 Tag。
在 Vue 后面加载 vue-router，它会自动安装的：

&lt;script src="/path/to/vue.js"&gt;&lt;/script&gt;
&lt;script src="/path/to/vue-router.js"&gt;&lt;/script&gt;

              </pre>
               <strong>NPM</strong>
               <pre style="font-size: 14px">
npm install vue-router
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
如果使用全局的 script 标签，则无须如此（手动安装）。
                </pre>             
          </div>      
      </div>     
      <div id="four">
          <h1>API文档</h1>
          <div>
             <pre>
教程中的案例代码将使用 ES2015 来编写。

用 Vue.js + vue-router 创建单页应用，是非常简单的。
使用 Vue.js ，我们已经可以通过组合组件来组成应用程
序，当你要把 vue-router 添加进来，我们需要做的是，
将组件(components)映射到路由(routes)，然后告诉 
vue-router 在哪里渲染它们。下面是个基本例子：

所有的例子都将使用完整版的 Vue 以解析模板。
更多细节请移步这里。
             </pre>
             <strong></strong>
          </div>
      </div>     
    </div>
     `,
})
var Login=Vue.component("Login",{
    template:`
<div class="login">
<header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div></div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/");
        }

    }


})
