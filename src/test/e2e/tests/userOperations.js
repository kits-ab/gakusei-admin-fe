
let username = 'e2etestusers';

module.exports = {
    
    beforeEach: function(client, done) {
        let loginPage = client.page.loginPage();
        loginPage.navigate();
        loginPage
            .waitForElementVisible('body')
            .setValue('@nameInput', 'admin')
            .setValue('@pwdInput', 'gakusei')
            .click('@loginButton')
            .click('@loginButton');

        setTimeout(function(){
            done();
        }, 5000);
    },

    'Tables show as expected': function(client) {
        let usersPage = client.page.usersPage();
        usersPage.navigate();
        usersPage
            .waitForElementVisible('body')
            .assert.visible('@searchForm')
            .click('@searchButton')
            .waitForElementVisible('@infoButton')
            .assert.visible('@infoButton')
            .click('@infoButton')
            .waitForElementVisible('@eventPanel')
            .click('@eventPanel')
            .assert.visible('@eventTable')
            .click('@progressPanel')
            .assert.visible('@progressTable');

        client.end();
    },

    'Role modal shows as expected': function(client) {
        let usersPage = client.page.usersPage();
        usersPage.navigate();
        usersPage
            .waitForElementVisible('body')
            .assert.visible('@searchForm')
            .click('@searchButton')
            .waitForElementVisible('@roleButton')
            .click('@roleButton')
            .assert.visible('@roleModal')
            .click('@roleModal');
        
        client.pause(500);

        usersPage.assert.elementNotPresent('@roleModal');

        client.end();
    },

    'Password modal shows as expected': function(client) {
        let usersPage = client.page.usersPage();
        usersPage.navigate();
        usersPage
            .waitForElementVisible('body')
            .assert.visible('@searchForm')
            .click('@searchButton')
            .waitForElementVisible('@passwordButton')
            .click('@passwordButton')
            .assert.visible('@passwordModal')
            .click('body');
        
        client.pause(500);

        usersPage.assert.elementNotPresent('@passwordModal');

        client.end();
    },
};