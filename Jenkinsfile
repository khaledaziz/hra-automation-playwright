pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    
    environment {
        // Customize these as needed
        DOCKER_IMAGE = "playwright-tests"
        TEST_REPORTS = "${WORKSPACE}/test-results"
        COMPOSE_FILE = "docker-compose.yml"
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
                bat 'if exist test-results rmdir /s /q test-results'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        docker.build("${env.DOCKER_IMAGE}")
                    } catch (Exception e) {
                        error("Failed to build Docker image: ${e.message}")
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat "docker-compose -f ${env.COMPOSE_FILE} up --abort-on-container-exit --build"
                    } catch (Exception e) {
                        echo "Test execution failed: ${e.message}"
                        // Continue to capture results even if tests fail
                    }
                }
            }
        }
        
        stage('Capture Results') {
            steps {
                script {
                    // Verify test results directory exists
                    bat "if not exist \"${env.TEST_REPORTS}\" mkdir \"${env.TEST_REPORTS}\""
                    
                    // Archive test artifacts
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    
                    // Publish HTML report
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
            post {
                always {
                    // Clean up containers
                    bat 'docker-compose down --remove-orphans'
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Clean up dangling images
                bat 'docker image prune -f'
            }
        }
        failure {
            emailext (
                subject: 'FAILED: Job ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}',
                body: 'Check console output at ${env.BUILD_URL}',
                to: 'team@example.com'
            )
        }
    }
}