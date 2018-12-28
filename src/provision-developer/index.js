const Joi = require('joi');

const AzureServicePrincipal = require('../shared/azureServicePrincipal');
const AzureApiManagementService = require('../shared/service/azureApiManagementService');
const DeveloperSchema = require('../shared/schema/provisionDeveloper');
const Config = require('../shared/config');

module.exports = async function(context, queueMessage) {
  context.log(`queue message : ${queueMessage}`);

  const queueMessageObject = Joi.validate(queueMessage, DeveloperSchema, {
    abortEarly: false,
  });

  if (queueMessageObject.error) {
    context.log.error(queueMessageObject.error.message);
    return context.done(queueMessageObject.error);
  }

  const validatedQueueMessageObject = queueMessageObject.value;

  const azureServicePrincipal = new AzureServicePrincipal(
    Config.azureActiveDirectoryClientId,
    Config.azureActiveDirectorySecret,
    Config.azureActiveDirectoryDomainId
  );

  const credentials = await azureServicePrincipal.login();

  const apiManagementService = new AzureApiManagementService(
    Config.azureSubscriptionId,
    Config.azureResourceGroup,
    credentials,
    Config.apiManagementName
  );

  const user = {
    email: validatedQueueMessageObject.email,
    firstName: validatedQueueMessageObject.firstName,
    lastName: validatedQueueMessageObject.lastName,
    password: validatedQueueMessageObject.password,
    confirmation: 'invite',
  };

  try {
    const userContract = await apiManagementService.createUser(
      validatedQueueMessageObject.id,
      user
    );

    const product = await apiManagementService.getProduct(
      Config.starterProductName
    );

    const subscriptionContract = await apiManagementService.createUserSubscription(
      `${Config.starterProductName}-${validatedQueueMessageObject.email}`,
      userContract.id,
      product.id
    );

    context.log(
      `User ${JSON.stringify(
        user
      )} provisioned for subscription : ${JSON.stringify(subscriptionContract)}`
    );
  } catch (error) {
    context.log.error(error.message);
    return context.done(queueMessageObject.error);
  }

  return context.done();
};
