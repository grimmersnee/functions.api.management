# functions.api.management

Azure api management is an api gateway / proxy service / developer portal used to protect api's and on board developers.

https://azure.microsoft.com/en-us/services/api-management/

functions.api.management is an azure functions (v2) app project used to provision developer's via a queue driven function.

## Azure functions

Follow the getting started instructions here to get azure functions working within your development environment:

https://code.visualstudio.com/tutorials/functions-extension/getting-started

### Environment variables

The following environment variables are required.

```
# functions.api.management

export QUEUE_CONNECTIONSTRING=""
export AZURE_SUBSCRIPTION_ID=""
export AZURE_RESOURCE_GROUP=""
export API_MANAGEMENT_NAME=""
export AZURE_ACTIVE_DIRECTORY_DOMAIN_ID=""
export AZURE_ACTIVE_DIRECTORY_CLIENT_ID=""
export AZURE_ACTIVE_DIRECTORY_SECRET=""
```

The provision-developer function is triggered by messages added to the `api-developer-provision` queue.

The expected message format is :

```
{
  id: '123',
  firstName: 'sam',
  lastName: 'grimmer',
  email: 'sam@gmail.com',
  password: '12.....34'
}
```

The function provisions the user within azure api management.

During user provisioning, they are sent an invite email, which instructs the user to login to the developer portal to gain access to iqualify integration information.
