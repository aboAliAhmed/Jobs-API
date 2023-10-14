# Encryption or Hashing password

bcrypt is a well-known, well-studied and very popular hashing algorithm called bcrypt.

So this algorithm will first salt then hash our password in order to make it really strong to protect it against bruteforce attacks, all right?

The whole reason why encryption needs to be really strong is Because bruteforce attacks could try to guess a certain passwords if it's not really strong encrypted.

bcrypt will salt our password and that just means that it's gonna add a random string to the password so that two equal passwords do not generate the same hash.

first require('bcryptjs')

```
bcrypt.hash('this.passwod', 12)
```

12 here represents the cost parameter that indicate how much CPU intensive this operation will be

The higher this cost here, the more CPU intensive the process will be and the better the password will be encrypted. We could go even higher, but then it would take way too long.

JWT => Smaller payload, better experience for user

when generate the token you can only send back the token and the frontend decodes it and get the name from it to send back also

### As a BACKEND do not send back the name to but as a user name
