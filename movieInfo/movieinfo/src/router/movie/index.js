// 用于到处对象
export default{
    path: '/movie',
    // 按需载入
    component:()=> import('@/views/Movie'),
    children:[
        {
            path:'city',
            component:()=>import('@/components/City')
        },
        {
            path:'nowPlaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path:'comingsoon',
            component:()=>import('@/components/ComingSoon')
        },
        {
            path:'search',
            component:()=>import('@/components/Search')
        },
        {
            path:'',
            redirect:'/movie/nowPlaying'
        }
    ]
}