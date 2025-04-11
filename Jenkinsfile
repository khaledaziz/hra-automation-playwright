pipeline {
    agent any  // run on any available agent (ensure it has Node & browsers)
    

    stages {
        stage('Install Dependencies') {
            steps {
                // Use npm ci for a clean, reproducible install (faster than npm install if lockfile exists)
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                // Run tests in headless mode (default). 
                // The --reporter option here outputs both line summary and HTML results.
                bat 'npx playwright test --reporter=dot,html'
            }
        }
        stage('Publish Reports') {
            steps {
                // Archive the Playwright HTML report so we can view it later
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                // Optionally, publish HTML report to Jenkins (if HTML Publisher plugin is installed)
                // publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, 
                //    keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            }
        }
    }

    
}