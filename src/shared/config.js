class Config {
  static get azureSubscriptionId() {
    return process.env.AZURE_SUBSCRIPTION_ID;
  }

  static get azureResourceGroup() {
    return process.env.AZURE_RESOURCE_GROUP;
  }

  static get apiManagementName() {
    return process.env.API_MANAGEMENT_NAME;
  }

  static get azureActiveDirectoryDomainId() {
    return process.env.AZURE_ACTIVE_DIRECTORY_DOMAIN_ID;
  }

  static get azureActiveDirectoryClientId() {
    return process.env.AZURE_ACTIVE_DIRECTORY_CLIENT_ID;
  }

  static get azureActiveDirectorySecret() {
    return process.env.AZURE_ACTIVE_DIRECTORY_SECRET;
  }

  static get starterProductName() {
    return 'Starter';
  }
}

module.exports = Config;
