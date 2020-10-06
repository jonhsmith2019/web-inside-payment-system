export const routes = {
  index: '/',
  login: '/login',
  gmtool: {
    stockConfig: '/stock-config',
    broadcastList: '/broadcast-list',
    addBroadcast: '/broadcast/add',
    editBroadcast: '/broadcast/edit/:id',
    maintain: '/maintain-list',
  },
  tookkiemsoat: {
    logShootFishJackpot: '/log-shoot-fish-jackpot',
    logBoss: '/boss-log',
    logCoin: '/coin-log',
    matchHistory: '/match-history',
    userInfo: '/user-info',
  },
  event: {
    promotion: '/event-promotion-list',
    jackpot: '/jackpot-config-list',
    boss: '/boss-config-list',
    skill: '/skill-list',
  },
  doisoat: {
    statisticsSystem: '/statistics-system',
  },
  management: {
    user: {
      list: '/inside-user-list',
      add: '/user/add',
      edit: '/user/edit/:id',
    },
  },
  account: {
    list: '/account-list',
    add: '/account/add',
    edit: '/account/:id',
  },
};
export default routes;
