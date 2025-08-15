pipeline {
    agent any

    environment {
        IMAGE_NAME = "playwright-tests"
        REPORT_DIR = "playwright-report"
    }

    stages {
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    cmd """
                    docker build --no-cache -t my-playwright-tests .
                    """
                }
            }
        }

        stage('Archive Test Report') {
            steps {
                archiveArtifacts artifacts: "${REPORT_DIR}/**", allowEmptyArchive: true
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}
