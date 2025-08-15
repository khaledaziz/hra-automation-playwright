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
        
        stage('Run Playwright Tests') {
    steps {
        script {
            // Debug: Print what we're about to run
            docker.image("${env.DOCKER_IMAGE}").run(
                        "--rm -v ${env.TEST_RESULTS}:C:\\app\\test-results -e CI=true",
                        "npx playwright test --reporter=html,line"
                    )
                    
                    // Verify files were created
                    bat "dir /s ${env.TEST_RESULTS}"
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