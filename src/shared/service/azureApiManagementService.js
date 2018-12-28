const ApiManagementClient = require('azure-arm-apimanagement');

class AzureApiManagementService {
  constructor(subscriptionId, resourceGroup, credentials, apiName) {
    this.resourceGroup = resourceGroup;
    this.apiName = apiName;
    this.client = new ApiManagementClient.ApiManagementClient(
      credentials,
      subscriptionId
    );
  }

  async getProduct(name) {
    const productsList = await this.client.product.listByService(
      this.resourceGroup,
      this.apiName
    );

    return productsList.filter(p => p.displayName === name)[0];
  }

  async createUser(uid, user) {
    return await this.client.user.createOrUpdate(
      this.resourceGroup,
      this.apiName,
      uid,
      user
    );
  }

  async createUserSubscription(userId, productId, subscriptionName) {
    const subscription = {
      userId: userId,
      productId: productId,
      displayName: subscriptionName,
    };

    return await this.client.subscription.createOrUpdate(
      this.resourceGroup,
      this.apiName,
      subscriptionName,
      subscription
    );
  }
}

module.exports = AzureApiManagementService;
