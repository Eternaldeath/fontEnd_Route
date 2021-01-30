// 用于到处对象
export default{
    path: '/movie',
    // 按需载入
    component:()=> import('@/views/Movie')
}