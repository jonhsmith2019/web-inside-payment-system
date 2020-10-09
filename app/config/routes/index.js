export const routes = {
  index: '/',
  login: '/login',
  account: {
    list: '/account-list',
    add: '/account/add',
    edit: '/account/:id',
  },
  accountService: {
    list: '/account-service-list',
    add: '/account-service/add',
    edit: '/account-service/:id',
    info: '/account-service-info',
  },
  card: {
    transactionList: '/card-transaction-list',
    transactionSession: '/card-transaction-session',
  },
  momo: {
    transactionList: '/momo-transaction-list',
    transactionSession: '/momo-transaction-session',
  },
};
export default routes;
