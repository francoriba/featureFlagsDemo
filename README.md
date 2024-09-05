# featrureFlagsDemo
Repo for small demo of feature flags with Split

Deployment steps:

* Clone this repo
* Register on [split](https://www.split.io/)
* Setup some feature flags in prod or staging, use segments or whatever you wish.
* Inside the app directory create a .env file with two env variable:
  *    SPLIT_API_KEY = <Your API key obtained from settings in Split>
  *    FEATURE_FLAG_ID = <Name of the feature flag you've created>
* Go inside the /deployment directory and use:
    * ```docker-compose up --build -d``` (or just ```docker-compose up -d``` after first build) to deploy the api inside a docker container
    * ```docker-compose down``` to stop the container
