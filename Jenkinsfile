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
                publishHTML(target: [
                    reportName: 'playwright test results',
                    reportDir: 'test-results',
                    reportFiles: 'index.html'
                ])
            }
        }
    }

    
}