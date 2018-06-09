var Nightmare = require("nightmare");
var expect = require("chai").expect;

var BASE_URL = 'https://spacesuitdiver.github.io';

describe('Homepage Test', function() {
    this.timeout(30000);

    it('When user is Ready?, show camera view', function(done) {
       Nightmare({ show: true })
       .goto(BASE_URL + '/meowtch-maker')
       .click('#ready-button')
       .wait(4000)
       .evaluate(function () {
            var view = document.querySelector('.capture-view');
            var isViewVisible = view.style.display !== 'none';

            return isViewVisible;
       })
       .end()
       .then(function(isViewVisible) {
            expect(isViewVisible).to.equal(true);
            done();
       });
    });
});
