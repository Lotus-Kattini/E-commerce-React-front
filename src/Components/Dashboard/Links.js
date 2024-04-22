import { faPlus, faUsers, faPenToSquare,faSitemap,faCartShopping} from '@fortawesome/free-solid-svg-icons'
export const Links=[
    {
        name:'Users',
        path:'users',
        icon:faUsers,
        role:'1995'
    },
    {
        name:'Add User',
        path:'/dashboard/user/add',
        icon:faPlus,
        role:'1995'
    },
    {
        name:'Categories',
        path:'/dashboard/categories',
        icon:faSitemap,
        role:['1995','1999']
    },
    {
        name:'Add category',
        path:'/dashboard/category/add',
        icon:faPlus,
        role:['1995','1996']
    },
    {
        name:'Products',
        path:'/dashboard/products',
        icon:faCartShopping,
        role:['1995','1996']
    },
    {
        name:'Add Product',
        path:'/dashboard/product/add',
        icon:faPlus,
        role:['1995','1996']
    },
    {
        name:'Writer',
        path:'/dashboard/writer',
        icon:faPenToSquare,
        role:['1995','1996']
    }
]
