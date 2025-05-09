pipeline {
    agent any  // run on any available agent (ensure it has Node & browsers)
    

    stages {
        stage('Install Dependencies') {
            steps {
                // Use npm ci for a clean, reproducible install (faster than npm install if lockfile exists)
                bat 'npm ci'
                bat 'npx playwright test --reporter=dot,html'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                // Run tests in headless mode (default). 
                // The --reporter option here outputs both line summary and HTML results.
                bat 'npx playwright test'
            }
        }
    }
    post {
        always { // Or 'success' if you only want reports for successful builds
            echo 'Archiving HTML reports...'
publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', includes: '**/*.html', keepAll: false, reportDir: '', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true]) }
   
}