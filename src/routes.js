import loadable from '@loadable/component';

const routes = [
    {
        id: 'dashboard',
        icon: 'dashboard',
        title: 'Dashboard',
        path: '/',
        component: loadable(() => import('./pages/Dashboard'))
    },
    {
        id: 'spot',
        title: 'Spot',
        path: '/spot',
        component: loadable(() => import('./pages/Spot/Spot'))
    },
    {
        id: 'spotdetail',
        title: 'Spot Detail',
        path: '/spot-detail/:id',
        component: loadable(() => import('./pages/Spot/SpotDetail'))
    },
    {
        id: 'addspot',
        title: 'Add Spot',
        path: '/add-spot',
        component: loadable(() => import('./pages/Spot/AddSpot'))
    },
    {
        id: 'editspot',
        title: 'Edit Spot',
        path: '/edit-spot/:id',
        component: loadable(() => import('./pages/Spot/EditSpot'))
    },
    {
        id: 'categories',
        title: 'Categories',
        path: '/categories',
        component: loadable(() => import('./pages/Category/Category'))
    },
    {
        id: 'categorydetail',
        title: 'Category Detail',
        path: '/category-detail/:id',
        component: loadable(() => import('./pages/Category/CategoryDetail'))
    },
];

export default routes;
