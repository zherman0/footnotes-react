# FootNotes Web Application based on React,TS, and PatternFly. Uses an API server written in PHP [footnotes-api](zherman0/footnotes-api)

### Limitations

1. No authentication

# SETUP: [Traditional Local](#traditional) | [Containers](#containers) | [Openshift](#openshift)

# Traditional

1. Copy repo to local directory <br/>
   `git clone https://github.com/zherman0/footnotes-react.git`
2. While the UI will start, there will be no data unless you install the API as well [footnotes-api](https://github.com/zherman0/footnotes-api).
3. After installing the API server and database server, run <br/>
   `npm install`<br/>
4. You should only need to update the '.env\*' file to point to your correct host (this should not need to change):
   > REACT_APP_API_SERVER=localhost
5. Start the app<br/>
   `npm start`

## Install Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Use this is you plan to deploy to a static, non nodejs environment such as a PHP host service.
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Containers

1. After completing the instructions for [footnotes api containers](https://github.com/zherman0/footnotes-api/tree/main#containers)
1. Copy repo to local directory <br/>
   `git clone https://github.com/zherman0/footnotes-react.git`
1. Build app docker file (make sure you are back in the footnote-react project)<br/>
   `docker build -t footnotes-app .`
1. Deploy your image to a container<br/>
   `docker run -d --name fn-app -p 3000:3000 footnotes-app`
1. Test the app is running and that there is data at url [http://localhost:3000](http://localhost:3000)

# Openshift

1. After completing the instructions for [footnotes-api openshift](https://github.com/zherman0/footnotes-api/tree/main#openshift)
1. Copy repo to local directory <br/>
   `git clone https://github.com/zherman0/footnotes-react.git`
1. Build app docker file (make sure you are back in the footnote-react project)<br/>
   `docker build -t footnotes-app .`
1. Push image to repo<br/>
   Note: You need a repo to push images to, the quay.io repo is used as merely an option<br/>
   `docker tag footnotes-app quay.io/<username>/footnotes-app`<br/>
   `docker push quay.io/zherman/footnotes-app`
1. Assuming you completed the task from the footnotes-api instructions, you should now have pushed 3 images to your image repo. Now we can begin the openshift configuration.
1. Build/Find an openshift cluster
1. Using the deploy_footnotes.yaml, update the image source paths to reflect where your images are stored, there are 3 of them:
   ```
   containers:
      - name: footnotes-app
        image: quay.io/<username>/footnotes-app
   ```
   ```
    containers:
      - name: footnotes-api
        image: quay.io/<username>/footnotes-api
   ```
   ```
   containers:
      - name: fn-db
        image: quay.io/<username>/footnotes-db
   ```
1. The deploy script assumes you are working in a project called `test1`. Either update all the `namespace:` fields in the deploy file, or simply setup a project called `test1`<br/>
   `oc new-project test1`
1. The deploy script also needs the `<URL>` placeholder replaced for the `value` field in the env variable `REACT_APP_API_SERVER`. The easiest way to get this is to just look at the url for your cluster and copy everything after the `console-openshift-console.apps`<br/>
   ```
   if your url is: https://console-openshift-console.apps.2ae47fbf5aa339f6151d.aws-4.ci.openshift.org
   env:
        - name: REACT_APP_API_SERVER
          value: http://footnotes-api-route-test1.apps.2ae47fbf5aa339f6151d.aws-4.ci.openshift.org
   ```
1. Run the deploy file using either the CLI or the web console yaml import tool<br/>
   `oc apply -f deploy_footnotes.yaml`
1. This script will create the pods (containers), services, and route require to run the application. Please monitor the pod creation and make sure they are all running before continuing.
1. Using either the CLI or web console, get the route url that has been created<br/>
   `oc get route -n <project-name>`<br/>
   `Console: Networking->Routes`
1. Goto the url found in the route and verify the application is running.
