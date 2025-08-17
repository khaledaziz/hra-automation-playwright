pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    
    environment {
        DOCKER_IMAGE = "playwright-tests"
        TEST_REPORTS = "${WORKSPACE}\\test-results"  // Use Windows path separator
        COMPOSE_FILE = "docker-compose.yml"
    }
    
    stages {
        stage('Checkout & Verify') {
            steps {
                checkout scm
                
                // Debug: Print workspace contents
                bat 'dir /w'
                
                // Verify critical files exist
                script {
                    if (!fileExists('Dockerfile')) {
                        error("Dockerfile not found in workspace root! Found files: ${sh(script: 'dir /b', returnStdout: true)}")
                    }
                    if (!fileExists(env.COMPOSE_FILE)) {
                        error("${env.COMPOSE_FILE} not found in workspace root!")
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Use absolute path to Dockerfile
                    def dockerfilePath = "${WORKSPACE}\\Dockerfile"
                    
                    echo "Building Docker image from: ${dockerfilePath}"
                    bat "type ${dockerfilePath}"  // Debug: Show Dockerfile contents
                    
                    try {
                        docker.build("${env.DOCKER_IMAGE}", "--file ${dockerfilePath} .")
                    } catch (Exception e) {
                        bat 'docker images'  // Debug: List existing images
                        error("Docker build failed: ${e.message}")
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat """
                            docker-compose -f ${env.COMPOSE_FILE} build --no-cache
                            docker-compose -f ${env.COMPOSE_FILE} up --abort-on-container-exit
                        """
                    } catch (Exception e) {
                        echo "Tests failed (proceeding to capture results): ${e.message}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('Capture Results') {
            steps {
                bat """
                    if not exist "${env.TEST_REPORTS}" mkdir "${env.TEST_REPORTS}"
                    xcopy /s /y "results\\*" "${env.TEST_REPORTS}\\"
                """
                
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${env.TEST_REPORTS}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
                
                junit allowEmptyResults: true,
                    testResults: "${env.TEST_REPORTS}\\*.xml"
            }
        }
    }
    
    post {
        always {
            bat 'docker-compose down --remove-orphans'
            bat 'docker image prune -f'
            archiveArtifacts artifacts: "${env.TEST_REPORTS}\\**\\*", allowEmptyArchive: true
        }
    }
}