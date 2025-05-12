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
            publishHTML(target: [
                // This must match the 'outputFolder' in playwright.config.js
                reportDir: 'playwright-report',
                // This is usually 'index.html' for Playwright reports
                reportFiles: 'index.html',
                // Title for the link in Jenkins job page
                reportName: 'Playwright HTML Report',
                // Optional: Keep all past reports
                keepAll: true,
                // Optional: Allow missing reports (e.g., if tests didn't run or failed before reporting)
                allowMissing: false, // Set to true if you want the build to pass even if the report is missing
                // Optional: Link to build (useful for per-build reports)
                alwaysLinkToLastBuild: false, 
                includes: '**/*.html', 
                useWrapperFileDirectly: true
            ])
        }
    }
    
}