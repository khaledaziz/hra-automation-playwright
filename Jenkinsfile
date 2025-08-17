pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
    }
    
    environment {
        // Customize these as needed
        DOCKER_IMAGE = "playwright-tests"
        TEST_REPORTS = "${WORKSPACE}/test-results"
    }
    
    stages {
        
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the image from your Dockerfile
                    docker.build("${env.DOCKER_IMAGE}")
                }
            }
        }
        
        stage('Run Tests') {
    steps {
        bat 'docker-compose up --abort-on-container-exit --build'
    }
}
}
        
        stage('Capture Results') {
            steps {
                // Archive test artifacts
                //archiveArtifacts artifacts: 'test-results/**/*'
                
                // Publish HTML report (requires HTML Publisher plugin)
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'test-results',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
                
    
            }
        }
    }
    
}