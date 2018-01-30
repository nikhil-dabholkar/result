mocha.setup('bdd');
let sRecData = "";
let jRecData = {};
var promiseResolve;
describe('Validate response from Stomp', function() {
    initialite(function() {
        client.subscribe("/fx/prices", (data) => {
            sRecData = data.body;
            jRecData = JSON.stringify(data.body);
            promiseResolve();
        });
        client.send("/fx/prices");
    })
    it('Check if returned value is a string', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                chai.expect(data).to.be.a('string');
                done();
            });
        });
    });
    it('Check if returned value is a valid JSON', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.expect(jReturnedDataString).to.be.an('object');
                done();
            });
        });
    });
    it('Check if returned JSON has all attributes', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.expect(jReturnedDataString).to.have.all.keys('name', 'bestBid', 'bestAsk', 'openBid', 'openAsk', 'lastChangeBid', 'lastChangeAsk');
                done();
            });
        });
    });
    it('Check if "name" is a string', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.expect(jReturnedDataString.name).to.be.a('string');
                done();
            });
        });
    });
    it('Check if "bestBid" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.bestBid, 'Numeric');
                done();
            });
        });
    });
    it('Check if "bestAsk" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.bestAsk, 'Numeric');
                done();
            });
        });
    });
    it('Check if "openBid" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.openBid, 'Numeric');
                done();
            });
        });
    });
    it('Check if "openAsk" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.openAsk, 'Numeric');
                done();
            });
        });
    });
    it('Check if "lastChangeBid" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.lastChangeBid, 'Numeric');
                done();
            });
        });
    });
    it('Check if "lastChangeAsk" is a number', (done) => {
        var promise = new Promise(function(resolve){
            promiseResolve = resolve;
        }).then(() => {
            const resolvingPromise = new Promise( (resolve) => {
                resolve(sRecData);
            });
            resolvingPromise.then( (data) => {
                const jReturnedDataString = JSON.parse(data);
                chai.assert.isNumber(jReturnedDataString.lastChangeAsk, 'Numeric');
                done();
            });
        });
    });
    after('All Tests Completed', (done) => {
        done();
    });
})
mocha.checkLeaks();
mocha.run();


