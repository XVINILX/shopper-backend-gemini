pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh'npm install'
                
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Add test commands here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh'pm2 restart ecosystem.config.js'
            }
        }
    }
}
