module.exports = {
  'Test navigation from index to "Om Gakusei" page': function(client) {
    let navbar = client.page.navbar();
    let about = client.page.about();

    navbar.navigate();

    let navItem = navbar.getNavElement('about');
    navbar.click(navItem);
    about.expect.element('@aboutText').to.be.visible;

    client.end();

  }
};