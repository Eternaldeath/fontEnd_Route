// 用于到处对象
export default{
    path: '/cinema',
    // 按需载入
    component:()=> import('@/views/Cinema')
}