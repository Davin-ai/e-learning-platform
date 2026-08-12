import Index from "./Pages/Index/Index"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Category from "./Pages/Category/Category"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Courses from "./Pages/Courses/Courses"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Articles from "./Pages/Articles/Articles"
import Contact from "./Pages/Contact/Contact"
import Search from "./Pages/Search/Search"
import AdminPanel from "./Pages/AdminPanel/index"
import Users from "./Pages/AdminPanel/Users/Users"
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses"
import Menu from "./Pages/AdminPanel/Menu/Menu"
import AdminArticles from "./Pages/AdminPanel/AdminArticles/AdminArticles"
import AdminCategory from "./Pages/AdminPanel/Category/AdminCategory"
import AdminContact from "./Pages/AdminPanel/AdminContact/AdminContact"
import Sessions from "./Pages/AdminPanel/Sessions/Sessions"
import Session from "./Pages/Sessions/Session"
import Comments from "./Pages/AdminPanel/Comments/Comments"
import Offs from "./Pages/AdminPanel/Offs/Offs"
import AdminIndex from "./Pages/AdminPanel/Index/AdminIndex"
import UserPanel from './Pages/UserPanel/Index'
import UserPanelIndex from './Pages/UserPanel/Index/Index'
import UserPanelOrders from './Pages/UserPanel/Orders/Orders'
import UserPanelCourses from './Pages/UserPanel/Courses/Courses'
import UserPanelTickets from './Pages/UserPanel/Tickets/SendTickets'
import UserPanelAllTickets from './Pages/UserPanel/Tickets/Tickets'
import UserPanelTicketsAnswer from './Pages/UserPanel/Tickets/TicketAnswer'
import UserPanelEdit from './Pages/UserPanel/EditPanel/EditPanel'
import PAdminPrivate from "./Components/Private/PAdminPrivate"
import AdminTickets from "./Pages/AdminPanel/AdminTickets/AdminTickets"
import AdminDiscounts from "./Pages/AdminPanel/Discounts/Discounts"
import Wallet from "./Pages/UserPanel/Wallet/Wallet"

const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/article/:page', element: <Articles /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: '/search/:value', element: <Search /> },
    { path: '/:courseName/:sessionID', element: <Session /> },

    {
        path: '/p-admin/*', element:
        
            <AdminPanel />
        
        , children: [
            { path: 'users', element: <Users /> },
            { path: 'courses', element: <AdminCourses /> },
            { path: 'menu', element: <Menu /> },
            { path: 'articles', element: <AdminArticles /> },
            { path: 'category', element: <AdminCategory /> },
            { path: 'admin-contact', element: <AdminContact /> },
            { path: 'sessions', element: <Sessions /> },
            { path: 'comments', element: <Comments /> },
            { path: 'offs', element: <Offs /> },
            { path: '', element: <AdminIndex /> },
            { path: 'tickets', element: <AdminTickets /> },
            { path: 'discounts', element: <AdminDiscounts /> },
        ]
    },

     {
        path: '/my-account/*', element: <UserPanel />, children: [
            { path: '', element: <UserPanelIndex /> },
            { path: 'orders', element: <UserPanelOrders /> },
            { path: 'bought', element: <UserPanelCourses /> },
            { path: 'send-tickets', element: <UserPanelTickets /> },
            { path: 'tickets', element: <UserPanelAllTickets /> },
            { path: 'tickets/answer/:id', element: <UserPanelTicketsAnswer /> },
            { path: 'edit-panel', element: <UserPanelEdit /> },
            { path: 'wallet', element: <Wallet /> },
            
        ]
    },

]

export default routes