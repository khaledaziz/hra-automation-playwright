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
        
        stage('Build and Run Playwright Tests') {
            steps {
                // First, build the Docker image using the Dockerfile in the current directory.
                // This creates a new image tagged 'my-playwright-tests'.
                bat 'docker build -t my-playwright-tests .'

                // Next, run the tests inside a container from the newly built image.
                // --rm: Automatically remove the container when it exits.
                // -v /tmp:/dev/shm: Mount a volume for shared memory, which is often needed by Chromium.
                // -e BASE_URL: Pass the environment variable to the container.
                // my-playwright-tests: The name of the image we just built.
                // npx playwright test: The command to run inside the container.
                bat 'docker run --rm -v /tmp:/dev/shm my-playwright-tests npx playwright test --reporter=junit --output=junit-report.xml'
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