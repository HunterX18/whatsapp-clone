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
            sh '''curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
cd client && npm i && npm run test'''
          }
        }

      }
    }

  }
}