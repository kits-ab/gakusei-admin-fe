module.exports = {
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    aboutNavItem: 'a[href="/about"]',
    logoutNavItem: 'a[href="/log-out"]',
  },
  commands: [
    {
      getNavElement(item = 'about') {
        return this.elements[`${item}NavItem`].selector;
      }
    }
  ]
};

