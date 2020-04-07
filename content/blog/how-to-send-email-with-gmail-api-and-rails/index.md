---
title: How To Send Email with Gmail API and Rails
date: 2018-12-31
---

Turns out that if you want to send an email in Rails, the Gmail API is like the last thing you should use.

Very clunky.

I would’ve just used Action Mailer, but getting the id of the email and thread after I sent the email was extremely important to my application later on.

This [SO](https://stackoverflow.com/questions/24460422/how-to-send-a-message-successfully-using-the-new-gmail-rest-api) post helped a ton.

There are a few important things to get this to work:
1. The formatting is EXTREMELY important (if you just copy and paste what I have it won’t work).
2. The message NEEDS to be in [RFC 2822 specification](https://tools.ietf.org/html/rfc2822#appendix-A), like exactly.
3. Then needs to be base64 encoded.
4. Then that base64 encoding needs to be in a format that is “web-safe”.

To test that it's working, I copy and pasted the sample message in [this link](https://tools.ietf.org/html/rfc2822#appendix-A.1.1).

Very important to note that if you try to adjust it by tabbing, it will mess up the format and fail, so don’t do that. And even the newline between the headers and the body is actually important as well.
Other SO posts that were helpful:

[https://stackoverflow.com/questions/49138836/400-error-recipient-address-required-javascript](https://stackoverflow.com/questions/49138836/400-error-recipient-address-required-javascript)
[https://stackoverflow.com/questions/41187663/why-do-i-keep-getting-a-400-invalid-to-header-response-when-using-the-google-g](https://stackoverflow.com/questions/41187663/why-do-i-keep-getting-a-400-invalid-to-header-response-when-using-the-google-g)
[https://stackoverflow.com/questions/25494664/creating-a-gmail-draft-with-recipients-through-gmail-api](https://stackoverflow.com/questions/25494664/creating-a-gmail-draft-with-recipients-through-gmail-api)
[https://stackoverflow.com/questions/25396463/how-to-send-message-using-gmail-api-with-ruby-google-api-client/25458220#25458220](https://stackoverflow.com/questions/25396463/how-to-send-message-using-gmail-api-with-ruby-google-api-client/25458220#25458220)
[https://www.twilio.com/blog/2014/12/sms-alerts-for-urgent-emails-with-twilio-and-the-gmail-api.html](https://www.twilio.com/blog/2014/12/sms-alerts-for-urgent-emails-with-twilio-and-the-gmail-api.html)

```ruby
def send_email
    msg = "From: John Doe <jdoe@machine.example>
    To: Mary Smith <m.adrian.horning@gmail.com>
    Subject: Hey hey
    Date: Fri, 21 Nov 1997 09:55:06 -0600
    This is a message just to say hello."
    msg = Base64.urlsafe_encode64(msg).gsub('+', '-').gsub('/', '_')
    client = Google::APIClient.new
    client.authorization.access_token = User.first.fresh_token
    service = client.discovered_api('gmail')
    result = client.execute(
        api_method:service.users.messages.to_h['gmail.users.messages.send'],  parameters: { userId: 'me' },
        body_object: {
            raw: msg
        },
    )
    puts result.body
end
```