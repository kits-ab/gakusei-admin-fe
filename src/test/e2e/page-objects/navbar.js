module.exports = {
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    aboutNavItem: 'a[href="/about"]'
  },
  commands: [
    {
      getNavElement(item = 'about') {
        return this.elements[`${item}NavItem`].selector;
      }
    }
  ]
};

