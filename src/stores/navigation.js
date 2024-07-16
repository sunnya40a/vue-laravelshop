import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'navigation',
  state: () => ({
    navigation: [
      {
        title: 'Dashboard',
        open: false,
        icon: 'RiDashboard3Fill',
        link: '/home'
      },
      {
        title: 'Purchase',
        open: false,
        icon: 'RiShoppingCart2Fill',
        subnav: [
          { title: 'Purchase Entry', link: '/pentry' },
          { title: 'Purchase View', link: '/purchase' },
          { title: 'Purchase History', link: '/purchase' }
        ]
      },
      {
        title: 'Category',
        icon: 'RiSwap3Fill',
        open: false,
        link: '/category'
      },
      {
        title: 'Items Entry',
        icon: 'RiFolderAddFill',
        open: false,
        link: '/itemsentry'
      },
      {
        title: 'Table',
        icon: 'RiTableFill',
        open: false,
        link: '/table'
      },
      {
        title: 'Plug Table',
        icon: 'RiTableFill',
        open: false,
        link: '/ptable'
      },
      {
        title: 'Sumenu Test',
        open: false,
        icon: 'ri-home-4-fill',
        subnav: [
          {
            title: '2nd level',
            open: false,
            subnav: [
              { title: 'Transitions', link: '/home' },
              { title: 'Components', link: '/purchase' },
              {
                title: '3rd Level',
                open: false,
                subnav: [
                  { title: 'Transitions', link: '/home' },
                  { title: 'Components', link: '/purchase' },
                  {
                    title: '4th level',
                    open: false,
                    subnav: [
                      { title: 'Transitions', link: '/home' },
                      { title: 'Components', link: '/purchase' },
                      {
                        title: '5th Level',
                        open: false,
                        subnav: [
                          { title: 'Transitions', link: '/home' },
                          { title: 'Components', link: '/purchase' },
                          { title: 'Slots', link: '/table' }
                        ]
                      },
                      { title: 'Slots', link: '/table' }
                    ]
                  }
                ]
              },
              { title: 'Slots', link: '/table' }
            ]
          },
          {
            title: 'SCSS',
            open: false,
            subnav: [{ title: 'Nesting' }, { title: 'Mixins' }]
          },
          { title: 'JavaScript' },
          { title: 'Webpack' }
        ]
      },
      {
        title: 'Logout',
        icon: 'RiLogoutBoxRFill',
        open: false,
        link: '/logout'
      },
      {
        title: 'About',
        icon: 'RiInformation2Fill',
        open: false,
        link: '/about'
      }
    ],
    activemenu: null,
    isExpanded: false
  }),
  getters: {
    getNavigation: (state) => {
      return state.navigation
    },

    getActivemenu: (state) => {
      return state.activemenu
    },
    getIsexpanded: (state) => {
      return state.isExpanded
    }
  },
  actions: {
    // Action functions to modify state
    setActivemenu(menulink) {
      this.activemenu = menulink
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded // Action to toggle the isExpanded state
    },
    setIsExpanded(value) {
      this.isExpanded = value // Action to set the isExpanded state to a specific value
    }
  }
})
