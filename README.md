# Complexity Analyzer App

This is the React frontend for the Complexity Analyzer project. This project is in early testing, and a production version is available if you contact me.

## Description

The React frontend interfaces with the an AWS Function Complexity Analyzer webapp. Input a python function (without the def function():) into the code editor, enter up to 3 arguments (exactly one of which to vary in complexity testing) and a maximum input size. Submit this to the backend and in less than 15 minutes your complexity analysis results will be visibile from the results page.

This project is in early alpha, your results may vary or take a long time to run with functions with higher complexity. You may have to tune the input size parameter to be higher or lower based on the complexity of your function to get a reasonable answer.

This tool is not intended as an oracle that will tell you code complexity automatically, but rather as an aide that will give you the graphs you need to back up your hunches on function complexity.

## Installation, Build, and Testing

This app can be built, installed and run using standard npm commands to start, built and test the application.

```bash
npm start
npm run build
npm run test
```

## Deployment

This app will automatically be deployed to an S3 website hosting bucket with a CloudFront CDN when a PR is merged into the `main` branch. Since invalidating the CloudFront cache and replacing it with the new distribution takes time, it may take a few minutes to see your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
