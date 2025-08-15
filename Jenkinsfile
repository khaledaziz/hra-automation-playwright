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
        stage('Prepare Workspace') {
            steps {
                // Create directory for test results
                sh 'mkdir -p ${TEST_REPORTS}'
                
            }
        }
        
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
                    // Run the container with volume mounting for test results
                    docker.image("${env.DOCKER_IMAGE}").run(
                        "--rm -v ${TEST_REPORTS}:/app/test-results -e CI=true"
                    )
                }
            }
        }
        
        stage('Capture Results') {
            steps {
                // Archive test artifacts
                archiveArtifacts artifacts: 'test-results/**/*'
                
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
    
    post {
        always {
            // Clean up workspace
            cleanWs()
            
            // Optional: Docker cleanup
            script {
                try {
                    sh 'docker system prune -f'
                } catch (e) {
                    echo "Docker cleanup failed: ${e}"
                }
            }
        }
    }
}