---
title: How to set up elastic beanstalk worker with SQS queue and Node.js
date: 2022-02-01
---

In case you have a long running process that you want to run later, or in the background, you can use the AWS Elastic Beanstalk Worker. Elastic Beanstalk I believe is just an EC2 server with other cool stuff like load balancers, auto scaling, etc. that come out of the box.

I had a webhook I was using and needed to return a response right away, but needed tasks that ran for minutes at a time to run in the background. I used an SQS queue to push messages, then the worker would run the task.

This goes out to all my front end devs not knowing how the hell to get this set up.

[This](https://medium.com/@harshilsanjayshah/processing-long-running-jobs-using-elastic-beanstalk-worker-environment-sqs-and-nodejs-42dc1f5f287d) blog was a good starting point.

You don't actually have to create an SQS instance, you can just set up a beanstalk worker and a queue will get created for you.

You have to first create an application, then create a beanstalk environment, then a worker I believe. Strange.

## Sending a message to SQS

The basic setup:

```js
// sqsClient.js
import { SQSClient } from "@aws-sdk/client-sqs"
// Set the AWS Region.
const REGION = "us-west-2" //e.g. "us-east-1"
// Create SQS service object.
const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: process.env.YOUR_CUSTOM_NAME,
    secretAccessKey: process.env.YOUR_CUSTOM_NAME,
  },
  region: REGION,
})
export { sqsClient }

// index.js
const params = {
  MessageBody: JSON.stringify({
    jobType: "doStuff",
    userId: createdUser.id,
  }),
  QueueUrl: "the_queue_url",
}

// tell the worker to do something
const data = await sqsClient.send(new SendMessageCommand(params))
```

The `accessKeyId` and `secretAccessKey` were tricky to set up. When you use this code on a server, the AWS env variables are reserved, so you have to set up your own to get around it. Seems pretty stupid to me. I used [Vercel](https://vercel.com/support/articles/how-can-i-use-aws-sdk-environment-variables-on-vercel).

Note that the blog uses like V2 of the AWS SDK. Version 3 I believe is the latest as of writing. That's why I'm using the `@aws-sdk/client-sqs` package and module imports/exports.

## Elastic Beanstalk Worker

Its just a server. I tried to create an express server, but for whatever reason, I couldn't get it to work. So I just used the sample code that AWS had here: [https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.DeployApp.html](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.DeployApp.html).

I'm not sure about that cron file though. That messed me up debugging, so I would get rid of that.

To see it working, create a `console.log`, or use the `log` function that they have there. You could log the body of the request. You don't have to set anything else up between the SQS queue and the worker. The queue will fire off a POST request to http://localhost:80 (I think thats the port) and the worker will run the task.

## Long Running Task running multiple times

This issue killed me. I was trying to run a task that would take 2 minutes. But after it was done, the worker would keep running it! It would run like 5 times or something. The SQS queue kept saying that there was a message "In Flight". The task (or message I guess technically) would never get deleted from the queue.

Turns out that my nginx was timing out. By default nginx will timeout after 60 secs. This [blog](https://dev.to/rizasaputra/understanding-aws-elastic-beanstalk-worker-timeout-42hi) helped me a ton in debugging it. However, the file structure is outdated. You have to use [this](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.html) file structure. [Stackoverflow](https://stackoverflow.com/questions/63672302/aws-beanstalk-nodejs-how-to-override-60s-timeout-of-nginx) article about it.

Hope that helps someone. I could've really used this blog post myself and hope that you utter fewer expletives because of this.
If this did help, tweet at me, I would love to know.
