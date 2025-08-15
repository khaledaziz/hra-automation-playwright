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
            echo "Running Docker image ${env.DOCKER_IMAGE} with test results in ${env.TEST_RESULTS}"
            
            // Run container with proper command and debugging
            def container = docker.image("${env.DOCKER_IMAGE}").run(
                "--rm -v ${env.TEST_RESULTS}:/app/test-results -e CI=true -e PLAYWRIGHT_HEADLESS=true",
                "npx playwright test --reporter=html,line"
            )
            
            // Get container logs for debugging
            sh "docker logs ${container.id}"
            
            // Verify files were created
            sh "ls -la ${env.TEST_RESULTS} || true"
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