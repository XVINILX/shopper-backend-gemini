pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh'npm install --global yarn'
                sh'yarn'
                
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
