pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo "Fetching latest code from Git..."
                checkout scm
            }
        }

        stage('Build & Push Backend Image') {
            steps {
                dir('backend') {
                    echo "Building backend Docker image..."
                    bat 'docker build -t aarthidevops/student-backend:latest .'

                    echo "Logging into Docker Hub..."
                    bat 'echo yourdockerhubpassword | docker login'

                    echo "Pushing backend image..."
                    bat 'docker push aarthidevops/student-backend:latest'
                }
            }
        }

        stage('Build & Push Frontend Image') {
            steps {
                dir('frontend') {
                    echo "Building frontend Docker image..."
                    bat 'docker build -t aarthidevops/student-frontend:latest .'

                    echo "Pushing frontend image..."
                    bat 'docker push aarthidevops/student-frontend:latest'
                }
            }
        }
    }

    post {
        success {
            echo " Images built & pushed to Docker Hub."
        }
        failure {
            echo "Build failed."
        }
    }
}
