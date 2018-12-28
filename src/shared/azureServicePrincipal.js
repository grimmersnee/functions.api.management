const MsRestAzure = require('ms-rest-azure');

class AzureServicePrincipal {
  constructor(clientId, secret, domain) {
    this.clientId = clientId;
    this.secret = secret;
    this.domain = domain;
  }

  async login() {
    return await MsRestAzure.loginWithServicePrincipalSecret(
      this.clientId,
      this.secret,
      this.domain
    );
  }
}

module.exports = AzureServicePrincipal;
