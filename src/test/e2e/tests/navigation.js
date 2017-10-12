/* Test navigation where auth is not required */

module.exports = {
  // make sure we are logged out
  before: function(client) {
    let navbar = client.page.navbar();
    client.element('css selector', navbar.getNavElement('logout'), function (visible) {
      if (visible.status !== -1) { // logout nav item is visible
        let logoutItem = navbar.getNavElement('logout');
        navbar.click(logoutItem);
      }
      return this;
    });
  },
  after: function(client) {
    client.end();
  },
  'Test navigation from index to "Om Gakusei" page': function(client) {
    let navbar = client.page.navbar();
    let about = client.page.about();

    navbar.navigate();

    let navItem = navbar.getNavElement('about');
    navbar.click(navItem);
    about.expect.element('@aboutText').to.be.visible;

  },
  'Test navigation from index to login page: ': function(client) {
    let navbar = client.page.navbar();
    let loginPage = client.page.loginPage();

    navbar.navigate();

    let navItem = navbar.getNavElement('login');
    navbar.click(navItem);
    loginPage.expect.element('@nameInput').to.be.visible;

  }
};