var router=new VueRouter({
    linkActiveClass:"active",
    routes:[
        { path: '/', component:Home},
        { path: '/info', component:Info,
            children:[
                {path:"",component:List},
                {path:"list/:id",component:Con}
            ]
        },
        { path: '/doc', component:Doc,
            children:[
                {path:"",components:{
                    left:leftC,
                    right:rightC
                 }
                }
            ]
        },
        { path: '*', redirect:"/"},
        {path:"/login",component:Login}
    ]
})