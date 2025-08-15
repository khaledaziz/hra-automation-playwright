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
                    sh """
                    docker run --rm \
                        -v $PWD/${REPORT_DIR}:/app/${REPORT_DIR} \
                        ${IMAGE_NAME}
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
