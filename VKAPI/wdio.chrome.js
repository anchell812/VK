const {config} = require('./wdio.conf')

exports.config = {
    ...config,
    
    ...{
    capabilities: [{

        maxInstances: 5,
     
        browserName: 'chrome',
        acceptInsecureCerts: true

    }],

    services: ['chromedriver']
}
}