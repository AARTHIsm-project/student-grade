pipeline {
  agent any
  environment {
    DOCKERHUB = credentials('dockerhub-credentials')
    DOCKER_USER = DOCKERHUB_USR
    DOCKER_PASS = DOCKERHUB_PSW
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build Backend') {
      steps {
        dir('backend') {
          sh "docker build -t ${DOCKER_USER}/student-backend:latest ."
          sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
          sh "docker push ${DOCKER_USER}/student-backend:latest"
        }
      }
    }
    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh "docker build -t ${DOCKER_USER}/student-frontend:latest ."
          sh "docker push ${DOCKER_USER}/student-frontend:latest"
        }
      }
    }
  }
  post { success { echo 'Images built & pushed' } failure { echo 'Build failed' } }
}