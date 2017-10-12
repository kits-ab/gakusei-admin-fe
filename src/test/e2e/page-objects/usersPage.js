module.exports = {
    url: function() {
        return this.api.launchUrl + '/users';
    },

    elements: {
        infoButton: 'button[id=infoBtn]',
        passwordButton: 'button[id=passBtn]',
        roleButton: 'button[id=roleBtn]',
        deleteButton: 'button[id=delBtn]',
        searchButton: 'button[id=searchBtn]',
        searchField: 'input[name=search]',
        searchForm: 'form[id=searchForm]',
        userPanel: 'div[id=userPanel]',
        eventTable: 'table[id=eventTable]',
        eventPanel: 'div[id=eventPanel]',
        progressPanel: 'div[id=progressPanel]',
        progressTable: 'table[id=progressTable]',
        infoModal: 'h4[id=infoModal]',
        passwordModal: 'button[id=passwordModal]',
        roleModal: 'button[id=roleModal]',
    },
};