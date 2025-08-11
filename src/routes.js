import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import ProcessTransaction from './pages/ProcessTransaction';
import CardDesign from './pages/CardDesign';
import Settings from './pages/Settings';

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/customers',
    component: Customers
  },
  {
    path: '/transactions',
    component: Transactions
  },
  {
    path: '/process',
    component: ProcessTransaction
  },
  {
    path: '/card-design',
    component: CardDesign
  },
  {
    path: '/settings',
    component: Settings
  }
];

export default routes;