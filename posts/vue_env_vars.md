# Vue Environment Variables
Vue has a slick, built-in way of handling environment variables, however there are a few gotchas and important points to know
before diving in.

Background information . . .

Vue has build modes (think environments). Some of those build modes are defaults, others can be created to meet custom needs. When you create
a new Vue project it will have a few default build modes set up (dependent on the choices you made during setup). You can see these modes in the 'package.json'.
```
Here is a snippet from a generic 'package.json' in a Vue project. 
Notice the 'scripts' section.
. . . 
{
  "name": "generic project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build-test": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": { . . .
```
In the 'scripts' section of the 'package.json', we see some 'key/value pairs', such as "serve": "vue-cli-service serve" 
(where 'serve' is the key and 'vue-cli-service serve' is the value). Since we are using Node Package Manager (NPM) for 
package management, the keys are NPM short cuts for the values. If you have done some of our Vue tutorials, such as 
[Leaflet Example Using Vue and Vue2Leaflet Plugin](https://github.com/usgs-makerspace/makerspace-vue2leaflet-example#testing-area-for-wbeep), 
you may remember that to start the Vue Development Server and view our project on localhost, we ran 'npm run serve'. In this
case we are telling NPM to 'run' the command 'serve' which we have tied to the Vue CLI (Command Line Interface) command, 'vue-cli-service serve'.
Running either 'vue-cli-service serve' or 'npm run serve' will give you the same result, PROVIDED you have Vue CLI installed either in your 
current working directory or as a globally accessible module in your operating system (otherwise you will get the error 'vue-cli-service: command not found
'). The NPM in your project has access to the Vue CLI commands in your project, which is why it can run them without you 
explicitly installing Vue CLI.

The important thing to remember here is that the default scripts you see above are linked by default to certain Vue build
environments, those environments being 'development', 'test', 'production'.
```
    'development' is used by vue-cli-service serve
    'test' is used by vue-cli-service test:unit
    'production' is used by vue-cli-service build and vue-cli-service test:e2e
```
This means that when we run 'npm run serve' Vue will look for any environment variables we have set up in the environment called 'development.


Let's pause here for a second and talk about NODE_ENV. NODE_ENV is a Vue variable that is always active in Vue and it stores information about the Vue environment in which we
are running. If you add 'console.log('node-env ', process.env.NODE_ENV)' to your code, you can see what environment is active.

Looking at the log statement above you will see 'process.env.' prior to the name of the  NODE_ENV variable, this is how 
we connect to environment variables (at least in JavaScript code, in HTML things are a bit different, and we'll talk about that
later).

Let's take a look at one more thing before we move on
to setting up some  variables. As I mentioned earlier, when Vue receives the serve/build command from NPM it will, by default,
use a certain set of environment variables. What variables are used are determined by the 'mode' in which Vue is running.
The 'mode' is basically the same thing as the 'environment' (not exactly, but for our purposes it is close enough). Also,
as mentioned earlier, there are three default modes 'development','production','test'. 

## Running a Vue Project with Vue Environment Variables
::: warning Important
Important! Vue Builds and Vue Build Modes are Different.
:::

It is important to note that modes are NOT the same as builds. By default, Vue has three types of builds, development, 
production and test.  This is very confusing since the names are the same as some of the modes, but rest assured that they are
quite different. When we run 'npm run serve' we are doing a 'development' build using the mode 'development'. As I will 
discuss later we can do a 'development' build with a 'production' mode. 

Without getting into to much detail, 'npm run serve' runs a development build which is a build for local development. The 
code is not fully bundled, minimized, or sent to the 'dist' folder for deployment. Instead the code is optimized to run 
locally using the Vue Development Server, along with Webpack's Hot Module Swap capabilities. 

Running 'npm run build' runs a production build which minimizes and bundles the application to the 'dist' directory, making it
ready for future deployment.

Running 'npm run test' runs a build optimized to run various code tests.

The modes are a totally separate concept from builds. The modes tell Vue which set of environment variables to use. So we
can actually specify both the build and mode by adding '-- mode modeType' to end of our npm run command.
```
Example of add a 'mode' flag
 'npm run serve --mode development'.
``` 

 
You may have realized, from what was said previously, that there is no functional difference between 'npm run serve --mode development'
and 'npm run serve' since the default mode for 'npm run serve' is development. However, if we would like to we can do something 
like 'npm run serve --mode production' which will tell Vue to do a development build (set up for local development) and
but load all the 'production' environment variables. This is very helpful if you want to see the 'production' version of the 
application locally. 

Finally we now have the basic understanding needed to use Vue environment variables effectively. To create variables that
Vue can use we will need to add a file or two to the root directory of our project. The basic file for Vue environment variables
is '.env'. Variables in the '.env' file are loaded in all modes. The values are entered in format 'key=value'. 
```
Notes for Enviorment Variables
1) format is key=value , for example VUE_APP_TITLE=National Integrated Water Availability Assessments
2) ALL VALUES ARE STRINGS! (so there are no booleans or numbers)
3) You can use booleans or numbers, but they will be strings. 
    For example APP_VUE_IS_BORKED=true will work, but true will be a string, not a boolean (same for number values)
4) Don't leave a space between the key and the equals sign or the value and the equals sign
5) You don't need quotes around your strings, and beware of white space at the end
6) You can make comments using the '#' symbol, such as # this is a comment
```
Here is an example file . . .
```
VUE_APP_TITLE=National Integrated Water Availability Assessments
VUE_APP_TIER=DEV

# Controls the feature toggle for having the map zoom level show at the bottom of the page
VUE_APP_ADD_ZOOM_LEVEL_DISPLAY=true

# The URL for the Hydrological Response Unit tiles
VUE_APP_HRU_TILE_URL=http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf?fresh=true

# The URL for the file that gives us the date of the model data
VUE_APP_DATA_DATE_URL=https://wbeep-test-website.s3-us-west-2.amazonaws.com/date/date.txt
```

Now that we have the basic idea, the using the magic of environment variables is fairly straight forward. If we 
want a set of variables available to a particular build we must do three things.
```
Remember to use your variables you must
1) create a .env file with the correct name such as .env.production
2) add your variables to that file (as described above)
3) run the build with the correct mode
    for example 'npm run serve --mode production'
```

To make running our project easier to run (and easier for other developers to understand) we can add custom builds
to our 'package.json'. If you remember from earlier, our generic 'package.json' looked like  . . .
```
. . . 
{
  "name": "generic project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build-test": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": { . . .
```
We can customize this by adding more specific commands to the 'scripts' section.

```
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve --mode development", // this is the standard local dev build (same as "serve": "vue-cli-service serve")
    "serve-prod": "vue-cli-service serve --mode production", // this lets us do a local dev build running the 'production' environment variables
    "build-test": "vue-cli-service build --mode development", // a production build, using the 'development' environment variables (for deployment to our 'test' tier
    "build": "vue-cli-service build --mode production", // a production build, using the 'production' environment variables for deployment to our 'production' tier
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
```
With the above changes added to the 'package.json' file we can run a command such as 'npm run serve-prod'. This NPM shortcut
will run the Vue CLI command 'vue-cli-service serve --mode production' which will build a version of our application to run on
the Vue Development Server that has all our the production variables. In other words this is how to run the production 
version of the application locally.

## Hints on Using Vue Environment Variables
Once you have an understanding of background concepts, actually using the variables is pretty simple. Here are just a few
hints to help you along the way.
```
1) Restart your development server to have new environment variables 
        added to the application (yes, this one will trip you up at some point)
2) Prefix all your variables with 'APP_VUE_' 
        so that webpack knows to embed the varibles in the code
3) Use 'process.env.', in a JavaScript section of the code, to grab the value of the variable
    Generic example - 'process.env.APP_VUE_VARIABLE_NAME'
    Specific example - 'console.log('node-env ', process.env.NODE_ENV)'
4) Use '<%= VUE_APP_VARIABLE_NAME %>' to access the variable vaule in HTML code
    Specific example - '<title><%= VUE_APP_TIER %><%= VUE_APP_TITLE %></title>'
```


```
Summary of helpful Vue environment variable commands

// Get the value of variable in JavaScript code
process.env.VUE_APP_YOUR_VARIABLE_NAME

// Confirm the environment your are in
console.log('node-env, this is the curent environment: ', process.env.NODE_ENV)

// See a list of all the enviorment variables
console.log('A list of all the current environment variables: ',  process.env)

```

## Environment Variable Gotchas
(kinda) Reserved Words

Vue has a couple of built in build modes that do special things one of which is 'test'. In Vue, the mode 'test' is 
used to run Unit Tests with greater efficiency. As such, it seems that we should avoid naming our environment
variable files '.env.test'. 

This may be a tempting choice of names, especially if one of your deployment
tiers is named 'test'. And, if you try, as I did, you will find out painfully that Vue has no problem with
you using 'test' in your environment variable names, but some internet browsers will take issue, mainly Internet 
Explorer and Edge. 

Edge and Internet Explorer will choke on the page load giving a totally unhelpful error message like 
"script 0: unexpected ':'" (Internet Explorer) or "error: expected, script or identifier" (Edge).

## Vue, NODE_ENV, Build Modes, and Explicitly Setting the NODE_ENV in package.json
Here is another issue that may present some confusion. Vue has three default ways of building an application
serve, build, and test, and Vue has three build modes (as mentioned above) 'development', 'production', and 'test'. All these
options, combined with the fact that you can change any of the build mode, by adding more '.env' files of different names
is probably confusing enough, but here is one thing for which to watch. 

The way Vue compresses the JavaScript bundle is controlled by the value of a Vue global variable called NODE_ENV. If the
NODE_ENV has the value of 'production' Vue will compress the JavaScript bundle as much as possible. If the value is 'development',
it will create a much larger bundle which is optimized to use for local development. 

Normally when we run a command like 'npm run build', Vue will actually run the command 'vue-cli-service build' and will see a NODE_ENV with the value of 'production' and
then compress the bundle. HOWEVER, this 'default' behavior in Vue is NOT related to the 'build' part of the
command. So, even though 99 out of 100 times when we run 'npm run build' we want a compressed bundle, what controls
the creation of that bundle is not the 'build' part, it is the '-- mode production' part of the command, which is hidden from
us because it is the 'default' mode of the build command. So, in effect Vue is running the command vue-cli-service build --mode production'.
 
But, if we use a custom mode like '.env.staging' we will change Vue's 
'default' behavior and Vue will run a command that is in effect 'vue-cli-service build --mode staging'. Now, to Vue if the 
'mode' is anything other than 'production' or 'test', it will assume you want to use 'development' and will
change the NODE_ENV variable value to 'development' which when you build the application will result in a 
JavaScript bundle that is way bigger than needed for deployment.

To overcome this gotcha, we can explicitly tell Vue what the NODE_ENV variable should be prior to Vue running the
build command. This is done in the 'package.json'.
```
// Example 1
// package.json - using custom modes with NODE_ENV NOT defined 
// 'npm run build prod' will result in a NODE_ENV of 'development' and a large JS bundle
. . .
  "scripts": {
    "serve": "vue-cli-service serve --mode test_tier",
    "build-prod": "vue-cli-service build --mode staging",
    "lint": "vue-cli-service lint"
  },
 . . .
// Example 2
// package.json - using custom modes with NODE_ENV defined 
// 'npm run build prod' will result in a NODE_ENV of 'production' and a smaller JS bundle
. . .
  "scripts": {
    "serve": "NODE_ENV=development vue-cli-service serve --mode test_tier",
    "build-prod": "NODE_ENV=production vue-cli-service build --mode staging",
    "lint": "vue-cli-service lint"
  },
 . . .
```
