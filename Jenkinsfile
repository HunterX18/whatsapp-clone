pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/HunterX18/whatsapp-clone', branch: 'main')
      }
    }

    stage('Log') {
      parallel {
        stage('Log') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Tests') {
          steps {
            sh 'cd client && npm i && npm run test'
          }
        }

      }
    }

    stage('') {
      steps {
        sh 'docker build -f client/Dockerfile .'
      }
    }

  }
  tools {
    nodejs 'NodeJS 21.5.0'
  }
}