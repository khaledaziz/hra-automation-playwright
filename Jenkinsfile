// A Jenkins declarative pipeline
pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    
    environment {
        // We will mount a directory on the host to persist the reports
        PLAYWRIGHT_REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile
                bat 'docker build -t playwright-tests .'
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                // Run the tests inside the container.
                // Critical changes here to generate and persist the HTML report.
                bat """
                    npx playwright test --reporter=list,html
                """
            }
        }
    }
    
    post {
        // This section runs after the stages, regardless of their outcome.
        // It's the perfect place to clean up and publish reports.
        always {
            // First, make sure the HTML report is published for easy viewing.
            // The 'publishHTML' plugin needs the 'playwright-report' folder to be present on the Jenkins host.
            // The volume mount in the previous stage ensures this.
            publishHTML(target: [
                allowMissing: false, // Set to false to fail the build if the report is not found
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: "${env.PLAYWRIGHT_REPORT_DIR}",
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            // Then, archive the entire report directory as an artifact.
            // This allows you to download and view the full report later.
            archiveArtifacts artifacts: "${env.PLAYWRIGHT_REPORT_DIR}/**", allowEmptyArchive: false
            
            // Clean up the Docker images and containers to free up space.
            bat 'docker image prune -f'
            // Since we use --rm, the container is automatically removed.
            // The 'docker-compose down' command is not needed here as we are not using docker-compose.
        }
    }
}
